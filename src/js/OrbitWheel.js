/**
 * OrbitWheel - Creates an animated orbit with moons and spokes
 */
export class OrbitWheel {
  constructor(container, options = {}) {
    this.config = {
      a: options.a || 140,
      b: options.b || 18,
      speed: options.speed || 0.6,
      planetR: options.planetR || 16,
      moonBaseR: options.moonBaseR || 7,
      moonCount: options.moonCount || 8,
      startAngle: options.startAngle || 0,
    };

    this.container = container;
    this.t = this.config.startAngle;
    this.lastTime = performance.now();
    this.spinBoost = 0;
    this.spinBoostDecay = 0;

    this.createSVG();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createSVG() {
    const { a, b, planetR, moonCount } = this.config;
    const ns = "http://www.w3.org/2000/svg";

    this.svg = document.createElementNS(ns, "svg");
    this.svg.setAttribute("viewBox", "-200 -200 400 400");
    this.svg.setAttribute("aria-label", "Orbit animation");

    // Back orbit path
    this.orbitBack = document.createElementNS(ns, "path");
    this.orbitBack.classList.add("orbit-back");
    this.svg.appendChild(this.orbitBack);

    // Spokes
    this.spokes = [];
    for (let i = 0; i < moonCount / 2; i++) {
      const spoke = document.createElementNS(ns, "line");
      spoke.classList.add("spoke");
      this.spokes.push(spoke);
      this.svg.appendChild(spoke);
    }

    // Back moons
    this.moons = [];
    for (let i = 0; i < moonCount; i++) {
      const moonBack = document.createElementNS(ns, "circle");
      moonBack.classList.add("moon");
      this.svg.appendChild(moonBack);
      this.moons.push({
        back: moonBack,
        front: null,
        offset: (i * Math.PI * 2) / moonCount,
      });
    }

    // Planet
    this.planet = document.createElementNS(ns, "circle");
    this.planet.classList.add("planet");
    this.planet.setAttribute("r", planetR);
    this.planet.setAttribute("cx", 0);
    this.planet.setAttribute("cy", 0);
    this.svg.appendChild(this.planet);

    // Front orbit path
    this.orbitFront = document.createElementNS(ns, "path");
    this.orbitFront.classList.add("orbit-front");
    this.svg.appendChild(this.orbitFront);

    // Front moons
    for (let i = 0; i < moonCount; i++) {
      const moonFront = document.createElementNS(ns, "circle");
      moonFront.classList.add("moon");
      this.moons[i].front = moonFront;
      this.svg.appendChild(moonFront);
    }

    // Set orbit paths
    this.orbitFront.setAttribute("d", this.arcPath(0, Math.PI));
    this.orbitBack.setAttribute("d", this.arcPath(Math.PI, Math.PI * 2));

    this.container.appendChild(this.svg);
  }

  pt(t) {
    return {
      x: this.config.a * Math.cos(t),
      y: this.config.b * Math.sin(t),
    };
  }

  arcPath(t0, t1) {
    const { a, b } = this.config;
    const p0 = this.pt(t0);
    const p1 = this.pt(t1);
    let delta = t1 - t0;
    while (delta < 0) delta += Math.PI * 2;
    while (delta >= Math.PI * 2) delta -= Math.PI * 2;
    const largeArc = delta > Math.PI ? 1 : 0;
    return `M ${p0.x.toFixed(3)} ${p0.y.toFixed(
      3
    )} A ${a} ${b} 0 ${largeArc} 1 ${p1.x.toFixed(3)} ${p1.y.toFixed(3)}`;
  }

  triggerSpin(duration = 700) {
    this.spinBoost = 15;
    this.spinBoostDecay = this.spinBoost / (duration / 16);
  }

  addScrollRotation(delta) {
    this.t += delta * 0.003;
  }

  animate(now) {
    const { a, b, speed, moonBaseR } = this.config;
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    let currentSpeed = speed;
    if (this.spinBoost > 0) {
      currentSpeed += this.spinBoost;
      this.spinBoost = Math.max(0, this.spinBoost - this.spinBoostDecay);
    }

    this.t += currentSpeed * dt;

    const positions = [];

    // Update moons
    for (let i = 0; i < this.moons.length; i++) {
      const moon = this.moons[i];
      const angle = this.t + moon.offset;
      const x = a * Math.cos(angle);
      const y = b * Math.sin(angle);
      positions[i] = { x, y };

      const depth = (y + b) / (2 * b);
      const scale = 0.45 + depth * 0.75;
      const r = moonBaseR * scale;
      const behind = y < 0;

      [moon.back, moon.front].forEach((el) => {
        el.setAttribute("cx", x);
        el.setAttribute("cy", y);
        el.setAttribute("r", r);
      });

      moon.back.style.display = behind ? "block" : "none";
      moon.front.style.display = behind ? "none" : "block";
    }

    // Update spokes
    const halfCount = this.moons.length / 2;
    for (let i = 0; i < this.spokes.length; i++) {
      const p1 = positions[i];
      const p2 = positions[i + halfCount];
      this.spokes[i].setAttribute("x1", p1.x);
      this.spokes[i].setAttribute("y1", p1.y);
      this.spokes[i].setAttribute("x2", p2.x);
      this.spokes[i].setAttribute("y2", p2.y);
    }

    requestAnimationFrame(this.animate);
  }
}