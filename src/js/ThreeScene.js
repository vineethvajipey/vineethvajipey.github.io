/**
 * ThreeScene - 3D model with tilted axis rotation
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ThreeScene {
  constructor(containerId = 'threeContainer') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.pivot = null;
    this.animationId = null;

    this.init();
    this.loadModel();
    this.animate();
    this.handleResize();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6600, 0.8);
    pointLight.position.set(-3, 2, 4);
    this.scene.add(pointLight);
  }

  loadModel() {
    const loader = new GLTFLoader();

    loader.load(
      '/models/Zombie.glb',
      (gltf) => {
        this.model = gltf.scene;

        // Calculate bounding box to find center and size
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Scale to fit nicely in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        this.model.scale.setScalar(scale);

        // Recalculate center after scaling
        box.setFromObject(this.model);
        box.getCenter(center);

        // Offset model so its center is at origin
        this.model.position.set(-center.x, -center.y, -center.z);

        // Create pivot group at origin - this is what we rotate
        this.pivot = new THREE.Group();
        this.pivot.add(this.model);

        // Tilt the rotation axis (like a globe)
        this.pivot.rotation.x = Math.PI * 0.15;

        this.scene.add(this.pivot);
      },
      (progress) => {
        // Loading progress
      },
      (error) => {
        console.error('Error loading model:', error);
        this.createFallbackGeometry();
      }
    );
  }

  createFallbackGeometry() {
    const geometry = new THREE.TorusGeometry(1.5, 0.5, 32, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x222222,
    });
    this.model = new THREE.Mesh(geometry, material);

    this.pivot = new THREE.Group();
    this.pivot.add(this.model);
    this.pivot.rotation.x = Math.PI * 0.3;
    this.scene.add(this.pivot);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.pivot) {
      // Rotate the pivot (which contains the centered model)
      this.pivot.rotation.y += 0.008;
    }

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    window.addEventListener('resize', () => {
      if (!this.container) return;

      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
