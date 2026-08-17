const rail = document.querySelector('[data-rail]');
const railSection = document.querySelector('.project-rail');
const railStatement = document.querySelector('.statement');
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('#hero-title');

if (heroTitle) {
  heroTitle.innerHTML = '<span data-scatter-line>HELLO</span><span data-scatter-line>WORLD</span><em data-scatter-line>INTERESSTING PEOPLE TO FOLLOW</em>';
}

if (hero) {
  hero.querySelector('.hero-figure')?.remove();
  hero.insertAdjacentHTML('afterbegin', '<a-waves class="hero-waves" aria-hidden="true"><svg class="js-svg"></svg></a-waves>');
}

if (rail && railSection) {
  const scrollRail = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const atStart = rail.scrollLeft <= 0 && event.deltaY < 0;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 && event.deltaY > 0;
    if (atStart || atEnd) return;
    event.preventDefault();
    rail.scrollBy({ left: event.deltaY * 1.25, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('portfolio:rail-scroll', { detail: { delta: event.deltaY } }));
  };
  railSection.addEventListener('wheel', scrollRail, { passive: false });
  railStatement?.addEventListener('wheel', scrollRail, { passive: false });
}

class AWaves extends HTMLElement {
  connectedCallback() {
    this.svg = this.querySelector('.js-svg');
    this.paths = [];
    this.lines = [];
    // Increase this single value to make the hero wireframe react more strongly to the cursor.
    this.pointerInfluence = 1.85;
    this.mouse = { x: -300, y: 0, sx: -300, sy: 0, lx: -300, ly: 0, vs: 0, a: 0 };
    this.onResize = this.setLines.bind(this);
    this.onPointerMove = (event) => this.setMouse(event.clientX, event.clientY);
    this.setLines();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    requestAnimationFrame((time) => this.tick(time));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointerMove);
  }

  setMouse(x, y) {
    const box = this.getBoundingClientRect();
    this.mouse.x = x - box.left;
    this.mouse.y = y - box.top;
  }

  setLines() {
    const box = this.getBoundingClientRect();
    this.width = Math.max(1, box.width);
    this.height = Math.max(1, box.height);
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.replaceChildren();
    this.paths = [];
    this.lines = [];
    const xGap = 9;
    const yGap = 24;
    const lineCount = Math.ceil((this.width + 100) / xGap);
    const pointCount = Math.ceil((this.height + 80) / yGap);
    const startX = (this.width - xGap * lineCount) / 2;
    const startY = (this.height - yGap * pointCount) / 2;

    for (let line = 0; line <= lineCount; line += 1) {
      const points = [];
      for (let point = 0; point <= pointCount; point += 1) {
        points.push({ x: startX + xGap * line, y: startY + yGap * point, ox: 0, oy: 0 });
      }
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.svg.appendChild(path);
      this.paths.push(path);
      this.lines.push(points);
    }
  }

  draw(time) {
    const { mouse } = this;
    mouse.sx += (mouse.x - mouse.sx) * 0.075;
    mouse.sy += (mouse.y - mouse.sy) * 0.075;
    const velocityX = mouse.x - mouse.lx;
    const velocityY = mouse.y - mouse.ly;
    mouse.vs += (Math.hypot(velocityX, velocityY) - mouse.vs) * 0.1;
    mouse.vs = Math.min(mouse.vs, 90);
    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.a = Math.atan2(velocityY, velocityX);
    this.style.setProperty('--x', `${mouse.sx}px`);
    this.style.setProperty('--y', `${mouse.sy}px`);

    this.lines.forEach((points, lineIndex) => {
      const output = points.map((point, pointIndex) => {
        const flow = Math.sin(point.x * 0.018 + time * 0.00065) + Math.cos(point.y * 0.015 - time * 0.00045);
        const turbulence = Math.sin((point.x + point.y) * 0.009 + time * 0.0011 + lineIndex * 0.19);
        const dx = point.x - mouse.sx;
        const dy = point.y - mouse.sy;
        const distance = Math.hypot(dx, dy);
        const range = (360 + mouse.vs * 2.4) * this.pointerInfluence;
        const force = distance < range ? (1 - distance / range) ** 2 : 0;
        const targetX = Math.cos(flow + turbulence) * 24 + Math.cos(mouse.a) * force * mouse.vs * 2.75 * this.pointerInfluence;
        const targetY = Math.sin(flow * 1.5) * 18 + Math.sin(mouse.a) * force * mouse.vs * 1.8 * this.pointerInfluence;
        point.ox += (targetX - point.ox) * 0.095;
        point.oy += (targetY - point.oy) * 0.095;
        return `${point.x + point.ox} ${point.y + point.oy}`;
      });
      this.paths[lineIndex].setAttribute('d', `M ${output.join(' L ')}`);
    });
  }

  tick(time) { this.draw(time); requestAnimationFrame((next) => this.tick(next)); }
}

customElements.define('a-waves', AWaves);

const portfolioProjects = [
  {
    number: '01', title: '既成态', en: 'VR SCIENCE INTERACTION',
    rail: 'VR 科普交互作品',
    description: '以沉浸式叙事重组抽象的科学知识，让观众在虚拟环境中通过探索、选择与反馈进入信息本身。',
    descriptionEn: 'An immersive VR experience that turns scientific knowledge into a navigable, embodied story.',
    video: '1'
  },
  {
    number: '02', title: '星洄', en: 'AI GESTURE + VOICE',
    rail: 'AI 文本反馈 / 大屏手势与语音交互',
    description: '让手势、语音与 AI 文本反馈形成一条实时回路；每一次靠近都成为一段可被看见的星际回应。',
    descriptionEn: 'A large-screen system where gesture, voice and generative language return as a living constellation.',
    video: '2'
  },
  {
    number: '03', title: '脉合五境', en: 'AIGC + EEG INTERACTION',
    rail: 'AIGC 生成 / 脑电大屏互动',
    description: '将脑电信号转译为生成式景观，在五种感知状态之间建立身体、情绪与图像的共振。',
    descriptionEn: 'EEG data and AIGC imagery meet in five responsive states of mind, body and atmosphere.',
    video: '3'
  },
  {
    number: '04', title: '洄声', en: 'AR INTERACTION',
    rail: 'AR 交互作品',
    description: '声音不再停留在耳边，而是在现实空间里留下可追随、可触发、可回望的增强现实轨迹。',
    descriptionEn: 'An AR interaction that lets sound leave visible, revisitable traces in the physical world.',
    video: '4'
  },
  {
    number: '05', title: '小型实验', en: 'MINI INTERACTIONS / 3D STUDIES',
    rail: '小型交互作品 / 练手三维作品',
    description: '持续累积的交互练习、三维形体与视觉测试；它们未必完整，却始终保持在生长状态。',
    descriptionEn: 'A growing archive of small interactions, 3D studies and visual tests in active development.'
  },
];

if (rail) {
  rail.innerHTML = portfolioProjects.map((project) => `
    <a class="rail-item" href="#project-${project.number}">
      <span>${project.number}</span><strong>${project.title}</strong><small>${project.en}<br>${project.rail}</small>
    </a>`).join('');
}

if (railSection) {
  railSection.insertAdjacentHTML('beforebegin', `
    <section class="about-scroll" id="intro" aria-labelledby="about-scroll-title">
      <div class="about-scroll__identity">
        <p class="about-scroll__label"><span>WHO I AM</span><small>我是誰</small></p>
      </div>
      <div class="pager-code-field" aria-hidden="true"><pre>using UnityEngine;
using System.Collections;

public class SpatialField : MonoBehaviour {
  public Transform body;
  public float response = 0.24f;
  Vector3 signal;

  void Update() {
    signal = Input.mousePosition;
    body.Rotate(Vector3.up * Time.deltaTime);
    RenderField(signal, response);
  }

  void RenderField(Vector3 input, float gain) {
    // INTERACTION / SPACE / MOTION
    Shader.SetGlobalVector("_Input", input);
  }
}

// C# / UNITY / SPATIAL SYSTEM
// C# / UNITY / SPATIAL SYSTEM
// C# / UNITY / SPATIAL SYSTEM</pre><pre>using UnityEngine;
using System.Collections.Generic;

public class GestureReceiver : MonoBehaviour {
  public Camera fieldCamera;
  public float smoothing = 0.12f;
  Vector2 cursor;

  void LateUpdate() {
    cursor = Vector2.Lerp(cursor, Input.mousePosition, smoothing);
    fieldCamera.transform.LookAt(cursor);
    BroadcastMessage("OnSpatialInput", cursor);
  }

  // INPUT / GESTURE / RESPONSE
  // INPUT / GESTURE / RESPONSE
}</pre><pre>using UnityEngine;

public class RealtimeMaterial : MonoBehaviour {
  public Material surface;
  public float intensity = 1.0f;

  void OnSpatialInput(Vector2 point) {
    surface.SetVector("_Pointer", point);
    surface.SetFloat("_Intensity", intensity);
  }

  void OnRenderImage() {
    // AI + XR + NEW MEDIA
  }
}

// REALTIME / UNITY / C#</pre></div>
      <figure class="pager-unity-field" aria-hidden="true"><div class="pager-unity-halftone"><img src="./img/unity.png" alt=""><video muted loop playsinline preload="metadata"><source src="./video/show.mp4" type="video/mp4"></video></div></figure>
      <div class="pager-stage" aria-labelledby="about-scroll-title">
        <p class="pager-stage__eyebrow" id="about-scroll-title">IDENTITY RECEIVER / PRESS TO REFRESH</p>
        <div class="identity-pager" id="identity-pager">
          <img src="./public/assets/pager.png" alt="Interactive identity pager">
          <div class="identity-pager__lcd" id="identity-pager-lcd" aria-live="polite">
            <span class="identity-pager__status">NEW MESSAGE <i></i></span>
            <strong id="identity-pager-title">我是<br>空間體驗構建者</strong>
            <small id="identity-pager-subtitle">I AM A SPATIAL EXPERIENCE BUILDER</small>
            <div class="identity-pager__tools" id="identity-pager-tools" aria-label="Tools used">
              <span><img src="./img/ue.webp" alt=""></span>
              <span><img src="./img/unity.webp" alt=""></span>
            </div>
          </div>
          <button class="identity-pager__button identity-pager__button--prev" type="button" aria-label="Show previous identity"></button>
          <button class="identity-pager__button identity-pager__button--next" type="button" aria-label="Show next identity"></button>
        </div>
        <p class="pager-stage__hint"><span>←</span> PRESS THE ARROWS TO RECEIVE A NEW SELF <span>→</span></p>
      </div>
    </section>`);
}

const projectList = document.querySelector('.project-list');
if (projectList) {
  projectList.innerHTML = portfolioProjects.map((project, index) => `
    <article class="project project--${project.number}" id="project-${project.number}">
      <div class="project-number">${project.number}</div>
      <div class="project-main">
        <p class="project-type">${project.en}</p>
        <h2>${project.title}</h2>
        <p class="project-summary"><span>${project.description}</span><em>${project.descriptionEn}</em></p>
        <a class="text-link" href="#contact">查看项目 / VIEW CASE STUDY</a>
      </div>
      <div class="project-field ${project.video ? 'project-field--film' : 'project-field--still'}" aria-label="${project.title} project visual">
        <div class="project-halftone"><img src="./img/${index + 1}.webp" alt=""></div>
        ${project.video ? '<div class="project-stripes" aria-hidden="true"><canvas></canvas></div>' : ''}
        <span>PROCESS LOG</span><b>${String(13 + index).padStart(2, '0')}.2026</b>
        ${project.video ? '<button class="project-launch" type="button" aria-label="Reveal project image"><img src="./img/play.svg" alt=""></button>' : ''}
        ${project.video ? `<a class="project-watch" href="./film.html?project=${project.video}" aria-label="觀看 ${project.title} 的影片"><span>觀看影片</span><b>WATCH FILM</b><i>↗</i></a>` : ''}
      </div>
    </article>`).join('');

  projectList.querySelectorAll('.project .text-link').forEach((link, index) => {
    link.href = `./case-study.html?project=${Number(portfolioProjects[index].number)}`;
  });
}

class LabInfiniteGallery {
  constructor(root) {
    this.root = root;
    this.canvas = root.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.images = Array.from({ length: 10 }, (_, index) => {
      const image = new Image();
      image.src = `./img/5/${index + 1}.webp`;
      return image;
    });
    this.pointer = { x: 0, y: 0 };
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
    root.addEventListener('pointermove', (event) => {
      const bounds = root.getBoundingClientRect();
      this.pointer.x = (event.clientX - bounds.left) / bounds.width - .5;
      this.pointer.y = (event.clientY - bounds.top) / bounds.height - .5;
    }, { passive: true });
    window.addEventListener('resize', this.resize, { passive: true });
    this.resize();
    requestAnimationFrame(this.draw);
  }

  resize() {
    const bounds = this.root.getBoundingClientRect();
    this.width = Math.max(1, bounds.width);
    this.height = Math.max(1, bounds.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
  }

  drawImageCover(image, x, y, width, height) {
    if (!image.complete || !image.naturalWidth) {
      this.ctx.fillStyle = '#d8d5cc';
      this.ctx.fillRect(x, y, width, height);
      return;
    }
    const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
    const sx = (image.naturalWidth - sourceSize) / 2;
    const sy = (image.naturalHeight - sourceSize) / 2;
    this.ctx.drawImage(image, sx, sy, sourceSize, sourceSize, x, y, width, height);
  }

  draw(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const horizonX = w * (.5 + this.pointer.x * .035);
    const horizonY = h * (.46 + this.pointer.y * .035);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#10100f';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(245,242,234,.22)';
    ctx.lineWidth = 1;
    for (let line = 0; line < 13; line += 1) {
      const depth = line / 12;
      const y = horizonY + depth * depth * h * .58;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let line = -6; line <= 6; line += 1) {
      const endX = horizonX + line * w * .18;
      ctx.beginPath(); ctx.moveTo(horizonX, horizonY); ctx.lineTo(endX, h); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(236,99,61,.7)';
    ctx.beginPath(); ctx.moveTo(horizonX, 0); ctx.lineTo(horizonX, h); ctx.stroke();

    const progress = this.reducedMotion ? .18 : (time * .000035) % 1;
    const cards = Array.from({ length: 34 }, (_, index) => {
      const depth = (index / 34 + progress) % 1;
      return { index, depth, side: index % 2 ? -1 : 1 };
    }).sort((a, b) => a.depth - b.depth);

    cards.forEach(({ index, depth, side }) => {
      if (depth < .035) return;
      const scale = .14 + depth * depth * .78;
      const cardSize = Math.min(w, h) * scale;
      const x = horizonX + side * (w * (.04 + depth * .37)) - cardSize / 2;
      const y = horizonY + depth * depth * h * .18 - cardSize / 2;
      ctx.save();
      ctx.translate(x + cardSize / 2, y + cardSize / 2);
      ctx.rotate(side * (.11 - depth * .07));
      ctx.translate(-cardSize / 2, -cardSize / 2);
      ctx.fillStyle = '#f5f2ea';
      ctx.fillRect(-4, -4, cardSize + 8, cardSize + 8);
      this.drawImageCover(this.images[index % this.images.length], 0, 0, cardSize, cardSize);
      ctx.strokeStyle = depth > .72 ? '#ec633d' : 'rgba(16,16,15,.72)';
      ctx.lineWidth = Math.max(1, cardSize * .012);
      ctx.strokeRect(0, 0, cardSize, cardSize);
      ctx.restore();
    });

    ctx.fillStyle = 'rgba(16,16,15,.28)';
    ctx.fillRect(0, 0, w, h);
    if (!this.reducedMotion) requestAnimationFrame(this.draw);
  }
}

document.querySelectorAll('[data-lab-gallery]').forEach((gallery) => new LabInfiniteGallery(gallery));

class ProjectStripeField {
  constructor(canvas, index) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.field = canvas.closest('.project-field');
    this.index = index;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.stripes = [];
    this.pointer = { x: 0, y: 0, active: false, down: false };
    this.gravity = .521;
    this.damping = .985;
    this.iterations = 12;
    this.armed = false;
    this.frame = 0;
    this.lastInteraction = 0;
    this.minMotionUntil = 0;
    this.quietFrames = 0;
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    this.resize();
    new ResizeObserver(this.resize).observe(canvas.parentElement);
    this.bindPointer();
  }

  resize() {
    const { width, height } = this.canvas.parentElement.getBoundingClientRect();
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.segmentLength = Math.max(10, Math.min(this.height * .021, 21));
    this.stripeCount = this.width < 220 ? 22 : this.width < 420 ? 30 : 36;
    this.spacing = this.width / (this.stripeCount + 1);
    this.lineWidth = Math.max(1, Math.min(this.spacing * .88, 210));
    const fieldStyle = getComputedStyle(this.field);
    this.curtainColor = this.field.closest('.project').matches('.project--01, .project--03') ? '#fff' : '#000';
    this.railColor = fieldStyle.getPropertyValue('--curtain-rail').trim() || '#484842';
    this.createStripes();
    this.draw();
  }

  createStripes() {
    this.stripes = [];
    for (let stripeIndex = 0; stripeIndex < this.stripeCount; stripeIndex += 1) {
      const x = this.spacing * (stripeIndex + 1);
      const stripeHeight = this.height * (.92 + Math.random() * .06);
      const pointsCount = Math.max(2, Math.round(stripeHeight / this.segmentLength) + 1);
      const stripe = [];
      for (let pointIndex = 0; pointIndex < pointsCount; pointIndex += 1) {
        const y = pointIndex * this.segmentLength;
        stripe.push({ x, y, oldX: x, oldY: y, pinned: pointIndex === 0 });
      }
      this.stripes.push(stripe);
    }
  }

  bindPointer() {
    const stripeField = this.canvas.parentElement;
    const setPointer = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = event.clientX - rect.left;
      this.pointer.y = event.clientY - rect.top;
      this.pointer.active = true;
    };
    stripeField.addEventListener('pointermove', (event) => {
      if (!this.armed) return;
      setPointer(event);
      this.requestMotion();
    });
    stripeField.addEventListener('pointerdown', (event) => {
      if (!this.armed) return;
      setPointer(event);
      this.pointer.down = true;
      stripeField.setPointerCapture(event.pointerId);
      this.requestMotion();
    });
    const release = (event) => {
      if (!this.armed) return;
      this.pointer.down = false;
      if (stripeField.hasPointerCapture(event.pointerId)) stripeField.releasePointerCapture(event.pointerId);
    };
    stripeField.addEventListener('pointerup', release);
    stripeField.addEventListener('pointercancel', release);
    stripeField.addEventListener('pointerleave', () => { if (!this.pointer.down) this.pointer.active = false; });
  }

  activate() {
    if (this.armed) return;
    this.armed = true;
    this.field.classList.add('is-armed');
    const centerX = this.width * .5;
    const centerY = this.height * .45;
    this.stripes.forEach((stripe) => stripe.forEach((point) => {
      if (point.pinned) return;
      const distance = Math.hypot(point.x - centerX, point.y - centerY);
      if (distance > 105) return;
      const force = (1 - distance / 105) * 82;
      const direction = point.x < centerX ? -1 : 1;
      point.x += direction * force;
      point.oldX -= direction * force * .45;
    }));
    this.requestMotion();
  }

  requestMotion() {
    this.lastInteraction = performance.now();
    this.minMotionUntil = this.lastInteraction + 4200;
    this.quietFrames = 0;
    if (!this.frame && !this.reducedMotion) this.frame = requestAnimationFrame(this.tick);
  }

  motionEnergy() {
    let energy = 0;
    let count = 0;
    this.stripes.forEach((stripe) => stripe.forEach((point) => {
      if (point.pinned) return;
      energy += Math.hypot(point.x - point.oldX, point.y - point.oldY);
      count += 1;
    }));
    return count ? energy / count : 0;
  }

  updatePoint(point) {
    if (point.pinned) return;
    const vx = (point.x - point.oldX) * this.damping;
    const vy = (point.y - point.oldY) * this.damping;
    point.oldX = point.x;
    point.oldY = point.y;
    point.x += vx;
    point.y += vy + this.gravity;
    if (!this.pointer.active) return;
    const dx = point.x - this.pointer.x;
    const dy = point.y - this.pointer.y;
    const distance = Math.hypot(dx, dy);
    const radius = this.pointer.down ? 120 : 60;
    const strength = this.pointer.down ? 15 : 12;
    if (distance > 0 && distance < radius) {
      const force = (1 - distance / radius) * strength;
      point.x += (dx / distance) * force;
      point.y += (dy / distance) * force;
    }
  }

  solveConstraint(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy) || 1;
    const difference = this.segmentLength - distance;
    const percent = difference / distance / 2;
    const offsetX = dx * percent;
    const offsetY = dy * percent;
    if (!a.pinned) { a.x -= offsetX; a.y -= offsetY; }
    if (!b.pinned) { b.x += offsetX; b.y += offsetY; }
  }

  update() {
    this.stripes.forEach((stripe) => {
      stripe.forEach((point) => this.updatePoint(point));
      for (let iteration = 0; iteration < this.iterations; iteration += 1) {
        for (let pointIndex = 0; pointIndex < stripe.length - 1; pointIndex += 1) {
          this.solveConstraint(stripe[pointIndex], stripe[pointIndex + 1]);
        }
      }
    });
  }

  drawStripeTexture(stripe) {
    const ctx = this.context;
    const dotRadius = Math.max(1, Math.min(this.lineWidth * .25, this.lineWidth / 2));
    const dotSpacing = Math.max(dotRadius * 2.5, this.lineWidth * 1.2);
    const stripeLength = (stripe.length - 1) * this.segmentLength;
    ctx.beginPath();
    for (let distance = 0; distance <= stripeLength - dotRadius; distance += dotSpacing) {
      const segmentIndex = Math.min(Math.floor(distance / this.segmentLength), stripe.length - 2);
      const progress = (distance - segmentIndex * this.segmentLength) / this.segmentLength;
      const a = stripe[segmentIndex];
      const b = stripe[segmentIndex + 1];
      const x = a.x + (b.x - a.x) * progress;
      const y = a.y + (b.y - a.y) * progress;
      ctx.moveTo(x + dotRadius, y);
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  draw() {
    const ctx = this.context;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'square';
    ctx.strokeStyle = this.curtainColor;
    ctx.fillStyle = this.curtainColor;
    this.stripes.forEach((stripe) => {
      ctx.beginPath();
      stripe.forEach((point, pointIndex) => pointIndex ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
      ctx.stroke();
      ctx.save();
      ctx.fillStyle = '#000';
      ctx.globalCompositeOperation = 'destination-out';
      this.drawStripeTexture(stripe);
      ctx.restore();
    });
    const first = this.stripes[0];
    const last = this.stripes[this.stripes.length - 1];
    if (first && last) {
      ctx.fillStyle = this.railColor;
      ctx.fillRect(first[0].x - this.lineWidth / 2, 0, last[0].x - first[0].x + this.lineWidth, this.lineWidth);
    }
  }

  tick(time) {
    this.frame = 0;
    if (!this.reducedMotion) this.update();
    const energy = this.motionEnergy();
    if (this.pointer.active || energy > .55) this.quietFrames = 0;
    else this.quietFrames += 1;
    this.draw();
    if (!this.reducedMotion && (this.pointer.active || time < this.minMotionUntil || this.quietFrames < 36)) {
      this.frame = requestAnimationFrame(this.tick);
    }
  }
}

const projectStripeFields = new Map();
document.querySelectorAll('.project-stripes canvas').forEach((canvas, index) => {
  const stripeField = new ProjectStripeField(canvas, index);
  projectStripeFields.set(canvas.closest('.project-field'), stripeField);
});

document.querySelectorAll('.project-launch').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const field = button.closest('.project-field');
    projectStripeFields.get(field)?.activate();
  });
});

document.querySelectorAll('.project-field').forEach((field) => {
  const videoLink = field.querySelector('.project-watch');
  if (!videoLink) return;
  let pointerStart = null;
  let dragged = false;
  field.addEventListener('pointerdown', (event) => {
    if (!field.classList.contains('is-armed') || event.target.closest('.project-launch')) return;
    pointerStart = { x: event.clientX, y: event.clientY };
    dragged = false;
  });
  field.addEventListener('pointermove', (event) => {
    if (!pointerStart) return;
    if (Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 10) dragged = true;
  });
  field.addEventListener('click', (event) => {
    if (!field.classList.contains('is-armed') || event.target.closest('.project-launch') || dragged) return;
    window.location.href = videoLink.href;
  });
  field.addEventListener('pointerup', () => { pointerStart = null; });
});

function setupScatterTitle(title, section) {
  const characters = [];
  title.querySelectorAll('[data-scatter-line]').forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach((character, index) => {
      const glyph = document.createElement('span');
      glyph.className = 'scatter-char';
      glyph.textContent = character === ' ' ? '\u00a0' : character;
      glyph.dataset.index = String(characters.length + index);
      line.appendChild(glyph);
      characters.push(glyph);
    });
  });

  let requested = false;
  const update = () => {
    requested = false;
    const rect = section.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.7)));
    characters.forEach((glyph, index) => {
      const seed = index * 43.17;
      const delay = Math.min(1, Math.max(0, (progress - index / characters.length * 0.22) / 0.78));
      const strength = delay * delay;
      const x = Math.sin(seed) * (110 + (index % 7) * 25) * strength;
      const y = (-130 - (index % 5) * 45 + Math.cos(seed * .7) * 55) * strength;
      const rotation = Math.sin(seed * .4) * 280 * strength;
      glyph.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      glyph.style.opacity = String(1 - strength * 1.1);
    });
  };
  window.addEventListener('scroll', () => {
    if (!requested) { requested = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

if (heroTitle && hero) setupScatterTitle(heroTitle, hero);

const statement = document.querySelector('.statement');
if (statement) {
  statement.insertAdjacentHTML('afterbegin', '<canvas class="statement-vortex" aria-hidden="true"></canvas>');
}

const statementTitle = statement?.querySelector('p');
if (statementTitle) {
  const lines = statementTitle.innerText.split('\n');
  let characterIndex = 0;
  statementTitle.innerHTML = lines.map((line) => {
    const letters = [...line].map((letter) => {
      const delay = characterIndex * 0.035;
      characterIndex += 1;
      return `<span class="flip-char" style="--flip-delay:${delay}s">${letter === ' ' ? '&nbsp;' : letter}</span>`;
    }).join('');
    return `<span class="flip-line">${letters}</span>`;
  }).join('');
}

const railHeading = document.querySelector('.rail-heading');
if (railHeading) {
  railHeading.innerHTML = `
    <div class="rail-heading__label"><span>SELECTED WORK</span><small>PROJECT INDEX / 05</small></div>
    <div class="rail-heading__signal">
      <p><b>小心地滑</b><small>STEP WITH CARE</small></p>
      <img src="./img/donw.svg" alt="" aria-hidden="true">
      <p><b>小心的滑</b><small>SCROLL WITH CARE</small></p>
    </div>
    <div class="rail-heading__label rail-heading__label--end"><span>SCROLL TO EXPLORE</span><small>HORIZONTAL MODE</small></div>`;
}

class StatementVortex {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.rotation = 0;
    this.rotationVelocity = 0;
    this.tiltX = 0;
    this.tiltY = 0;
    this.tiltVelocity = 0;
    this.onRailScroll = (event) => {
      const delta = Math.max(-3.1, Math.min(3.1, event.detail.delta * 0.007));
      this.rotationVelocity += delta;
      this.tiltVelocity += delta * 1.65;
    };
    this.onWheel = (event) => {
      const delta = Math.max(-5, Math.min(5, event.deltaY * 0.025));
      this.rotationVelocity += delta;
      this.tiltVelocity += delta * 1.85;
    };
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('portfolio:rail-scroll', this.onRailScroll);
    this.canvas.parentElement.addEventListener('wheel', this.onWheel, { passive:true });
    requestAnimationFrame(this.render);
  }

  resize() {
    const parent = this.canvas.parentElement.getBoundingClientRect();
    this.width = Math.max(1, parent.width * 1.18);
    this.height = Math.max(1, parent.height * 1.12);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.discs = Array.from({ length: 74 }, (_, index) => ({ p: index / 74 }));
    this.dots = Array.from({ length: 5200 }, () => ({
      disc: Math.floor(Math.random() * 74),
      angle: Math.random() * Math.PI * 2,
      speed: 0.00022 + Math.random() * 0.00052,
      phase: Math.random(),
      color: Math.random() > 0.94 ? '#ff3700' : Math.random() > 0.48 ? '#000000' : '#434342',
    }));
  }

  discAt(progress) {
    const easedX = 1 - (1 - progress) ** 3;
    const easedY = 1 - Math.exp(-6 * progress);
    return {
      x: this.width * .52,
      y: this.height * (.08 + progress * .82),
      rx: this.width * .5 * (1 - easedX * .88),
      ry: this.height * .22 * (1 - easedY * .86),
      alpha: Math.max(0, Math.min(1, (1 - progress * .94) * 0.52)),
    };
  }

  render(time) {
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    const offset = (time * .000028) % 1;
    this.rotationVelocity *= .93;
    this.rotation += this.rotationVelocity;
    this.tiltVelocity *= .9;
    this.tiltX += (this.tiltVelocity - this.tiltX) * .08;
    this.tiltY += ((-this.tiltVelocity * .58) - this.tiltY) * .08;
    this.canvas.style.setProperty('--vortex-rotate', `${this.rotation}deg`);
    this.canvas.style.setProperty('--vortex-tilt-x', `${this.tiltX}deg`);
    this.canvas.style.setProperty('--vortex-tilt-y', `${this.tiltY}deg`);
    this.canvas.style.transform = `perspective(900px) rotate(-30deg) rotate(${this.rotation}deg) rotateX(${this.tiltX}deg) rotateY(${this.tiltY}deg)`;

    this.discs.forEach((item, index) => {
      const disc = this.discAt((item.p + offset) % 1);
      ctx.globalAlpha = disc.alpha;
      ctx.strokeStyle = index % 7 === 0 ? '#20201e' : '#85857d';
      ctx.lineWidth = index % 8 === 0 ? .85 : .55;
      ctx.beginPath();
      ctx.ellipse(disc.x, disc.y, disc.rx, Math.max(1, disc.ry), 0, 0, Math.PI * 2);
      ctx.stroke();
    });

    this.dots.forEach((dot) => {
      const disc = this.discAt((dot.disc / 74 + offset) % 1);
      dot.angle += dot.speed * 16;
      const x = disc.x + Math.cos(dot.angle) * disc.rx;
      const y = disc.y + Math.sin(dot.angle) * disc.ry;
      ctx.globalAlpha = disc.alpha * (.62 + dot.phase * .38);
      ctx.fillStyle = dot.color;
      ctx.fillRect(x, y, dot.color === '#ed542b' ? 2.2 : 1.35, dot.color === '#ed542b' ? 2.2 : 1.35);
    });
    requestAnimationFrame(this.render);
  }
}

const siteLoader = document.querySelector('.site-loader');
const dismissSiteLoader = () => siteLoader?.classList.add('is-ready');
// Do not wait for large background media: it can remain loading after the page is usable.
window.setTimeout(dismissSiteLoader, 720);
window.addEventListener('load', dismissSiteLoader, { once: true });

const statementVortex = document.querySelector('.statement-vortex');
if (statementVortex) new StatementVortex(statementVortex);

const identityPager = document.querySelector('#identity-pager');
if (identityPager) {
  const pagerSection = identityPager.closest('.about-scroll');
  const pagerBackdropVideo = pagerSection?.querySelector('.pager-unity-halftone video');
  const activatePagerBackdrop = () => {
    if (!pagerBackdropVideo || pagerSection?.classList.contains('is-pager-video-active')) return;
    const revealVideo = () => {
      pagerSection?.classList.add('is-pager-video-active');
      pagerBackdropVideo.play().catch(() => pagerSection?.classList.remove('is-pager-video-active'));
    };
    if (pagerBackdropVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      revealVideo();
    } else {
      pagerBackdropVideo.addEventListener('canplay', revealVideo, { once:true });
      pagerBackdropVideo.load();
    }
  };
  const messages = [
    ['我是\\n空間體驗構建者', 'I AM A SPATIAL EXPERIENCE BUILDER', [['ue.webp', 'UE'], ['unity.webp', 'UNITY']]],
    ['我是\\n技術型設計師', 'I AM A TECHNICAL DESIGNER', [['ps.webp', 'PS'], ['ai.webp', 'AI']]],
    ['我是\\n新媒體敘事者', 'I AM A NEW MEDIA STORYTELLER', [['ae.webp', 'AE'], ['pr.webp', 'PR']]],
    ['我是\\n互動原型創作者', 'I AM AN INTERACTION PROTOTYPER', [['c.webp', 'C#'], ['python.webp', 'PY']]],
    ['我是\\n即時視覺系統創作者', 'I AM A REALTIME VISUAL SYSTEM MAKER', [['td.webp', 'TD'], ['td2.webp', 'TD']]],
    ['我是\\n三維創作者', 'I AM A 3D GENERALIST', [['maya.webp', 'MAYA'], ['blender.webp', 'BLENDER']]],
  ];
  const lcd = identityPager.querySelector('#identity-pager-lcd');
  const title = identityPager.querySelector('#identity-pager-title');
  const subtitle = identityPager.querySelector('#identity-pager-subtitle');
  const tools = identityPager.querySelector('#identity-pager-tools');
  let messageIndex = 0;
  let messageTimer;
  const nextButton = identityPager.querySelector('.identity-pager__button--next');
  identityPager.classList.add('is-arriving');
  nextButton.classList.add('is-alert');
  window.setTimeout(() => identityPager.classList.remove('is-arriving'), 620);
  const renderMessage = (index) => {
    const [cn, en, toolset] = messages[index];
    clearTimeout(messageTimer);
    identityPager.classList.remove('is-refreshing');
    void identityPager.offsetWidth;
    identityPager.classList.add('is-refreshing');
    lcd.classList.add('is-flashing');
    messageTimer = window.setTimeout(() => {
      title.innerHTML = cn.replace('\\n', '<br>');
      subtitle.textContent = en;
      tools.innerHTML = toolset.map(([file, label]) => `<span><img src="./img/${file}" alt="${label}"></span>`).join('');
      lcd.classList.remove('is-flashing');
    }, 105);
  };
  nextButton.addEventListener('click', () => {
    activatePagerBackdrop();
    nextButton.classList.remove('is-alert');
    messageIndex = (messageIndex + 1) % messages.length;
    renderMessage(messageIndex);
  });
  identityPager.querySelector('.identity-pager__button--prev').addEventListener('click', () => {
    activatePagerBackdrop();
    messageIndex = (messageIndex - 1 + messages.length) % messages.length;
    renderMessage(messageIndex);
  });
}

const typeMessages = [
  'TRACKING GESTURE / IDLE',
  'SPATIAL FIELD / LISTENING',
  'INPUT LAYER / CALIBRATING',
  'NOISE STUDY / RUNNING',
  'XR MEMORY / SYNCHRONIZED',
  'SIGNAL ROUTINE / STABLE',
];

const heroTypeSets = [
  ['.role', ['TECHNICAL DESIGNER\nNEW MEDIA / SPATIAL SYSTEMS', 'CREATIVE TECHNOLOGIST\nINTERACTION / REALTIME MEDIA', 'DESIGNER + DEVELOPER\nSPATIAL COMPUTING / XR']],
  ['.eyebrow', ['I DESIGN INTELLIGENT SPACES', 'I BUILD RESPONSIVE FIELDS', 'I PROTOTYPE NEW SENSES']],
  ['.intro', ['Exploring AI gesture interaction,\nXR systems and spatial media.', 'Working across body, signal\nand computational material.', 'Turning presence into motion,\nspace into an interface.']],
  ['.description', ['I make experiential systems where code, motion and perception become one responsive material.', 'I design full-stack interactive works from concept, visual language and 3D space to real-time behaviour.', 'I use computation as a material for stories people can enter, affect and remember.']],
  ['.hero-copy .text-link', ['VIEW SELECTED WORK', 'ENTER THE WORK INDEX', 'OPEN PROJECT ARCHIVE']],
];

const telemetryMarkup = `
  <aside class="telemetry-panel" aria-label="Live system readout">
    <p class="telemetry-static">SYSTEM / H-F.01</p>
    <p class="telemetry-type" data-typewriter></p>
    <p>CURSOR X / <b data-cursor-x>0000</b></p>
    <p>CURSOR Y / <b data-cursor-y>0000</b></p>
    <p>VELOCITY / <b data-velocity>00.00</b></p>
  </aside>`;

if (hero) {
  hero.insertAdjacentHTML('beforeend', telemetryMarkup);
}

document.querySelectorAll('.project-field').forEach((field, index) => {
  field.insertAdjacentHTML('beforeend', `
    <div class="project-readout">
      <span>NODE / 0${index + 1}</span>
      <span>STATE / <b data-random-value>${String(38 + index * 7).padStart(3, '0')}</b></span>
      <span>FRAME / <b data-frame-value>0000</b></span>
      <span class="project-message" data-typewriter></span>
    </div>`);
});

document.querySelectorAll('.rail-item').forEach((item, index) => {
  item.insertAdjacentHTML('beforeend', `<i class="rail-meta">SLOT / 0${index + 1} &nbsp;·&nbsp; LIVE INDEX</i>`);
});

function startTypewriter(element, messages) {
  let messageIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  const tick = () => {
    const message = messages[messageIndex];
    element.textContent = message.slice(0, characterIndex);
    if (!deleting && characterIndex < message.length) {
      characterIndex += 1;
      window.setTimeout(tick, 48 + Math.random() * 45);
      return;
    }
    if (!deleting) {
      deleting = true;
      window.setTimeout(tick, 1250);
      return;
    }
    if (characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(tick, 18 + Math.random() * 28);
      return;
    }
    deleting = false;
    messageIndex = (messageIndex + 1) % messages.length;
    window.setTimeout(tick, 280);
  };
  tick();
}

heroTypeSets.forEach(([selector, messages]) => {
  const element = document.querySelector(selector);
  if (!element) return;
  element.dataset.typewriter = '';
  element.style.whiteSpace = 'pre-line';
  element.dataset.typeMessages = JSON.stringify(messages);
});

document.querySelectorAll('[data-typewriter]').forEach((element, index) => {
  const customMessages = element.dataset.typeMessages ? JSON.parse(element.dataset.typeMessages) : null;
  const messages = customMessages || [...typeMessages.slice(index), ...typeMessages.slice(0, index)];
  startTypewriter(element, messages);
});

let mouseX = 0;
let mouseY = 0;
let mouseSpeed = 0;
let previousX = 0;
let previousY = 0;

window.addEventListener('pointermove', (event) => {
  mouseSpeed = Math.min(99.99, Math.hypot(event.clientX - previousX, event.clientY - previousY));
  mouseX = event.clientX;
  mouseY = event.clientY;
  previousX = mouseX;
  previousY = mouseY;
});

function updateReadouts(time) {
  document.querySelectorAll('[data-cursor-x]').forEach((node) => { node.textContent = String(Math.round(mouseX)).padStart(4, '0'); });
  document.querySelectorAll('[data-cursor-y]').forEach((node) => { node.textContent = String(Math.round(mouseY)).padStart(4, '0'); });
  document.querySelectorAll('[data-velocity]').forEach((node) => { node.textContent = mouseSpeed.toFixed(2); });
  document.querySelectorAll('[data-frame-value]').forEach((node, index) => { node.textContent = String(Math.floor(time / 23 + index * 311) % 9999).padStart(4, '0'); });
  if (Math.floor(time) % 210 < 18) {
    document.querySelectorAll('[data-random-value]').forEach((node, index) => { node.textContent = String(Math.floor(22 + Math.random() * 77 + index * 3)).padStart(3, '0'); });
  }
  mouseSpeed *= 0.94;
  requestAnimationFrame(updateReadouts);
}

requestAnimationFrame(updateReadouts);

// Contact closer: adapted directly from the supplied Suz Sirunyan clip-path
// reference. A two-sided particle ribbon is used as the clipping path.
const contactStage = document.querySelector('[data-contact-stage]');
if (contactStage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const contactReveal = contactStage.querySelector('.contact-reveal');
  const cursor = contactStage.querySelector('.contact-cursor');
  const particles = [];
  const mouse = { x:0, y:0, smoothX:0, smoothY:0, diff:0, smoothDiff:0, angle:0, active:false };

  const setMouse = (event, reset = false) => {
    const bounds = contactStage.getBoundingClientRect();
    mouse.x = event.clientX - bounds.left;
    mouse.y = event.clientY - bounds.top;
    if (reset) { mouse.smoothX = mouse.x; mouse.smoothY = mouse.y; }
    contactStage.style.setProperty('--cut-x', `${mouse.x}px`);
    contactStage.style.setProperty('--cut-y', `${mouse.y}px`);
  };

  const easeInOut = (value) => value < .5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
  const particlePoint = (particle, direction) => ({
    x: particle.x + particle.offsetX * direction * particle.progress,
    y: particle.y + particle.offsetY * direction * particle.progress,
  });
  const addParticle = (now) => {
    if (!mouse.active || mouse.diff < .01) return;
    const perpendicular = mouse.angle + Math.PI / 2;
    const distance = Math.max(contactStage.clientWidth * .0075, mouse.smoothDiff);
    particles.push({
      x:mouse.smoothX,
      y:mouse.smoothY,
      offsetX:distance * Math.cos(perpendicular),
      offsetY:distance * Math.sin(perpendicular),
      born:now,
      progress:0,
    });
    if (particles.length > 210) particles.shift();
  };
  const drawPath = () => {
    if (particles.length < 2) { contactReveal.style.clipPath = 'inset(100%)'; return; }
    let path = '';
    particles.forEach((particle, index) => {
      const p1 = particlePoint(particle, -1);
      const next = particlePoint(particles[index + 1] || particles[particles.length - 1], -1);
      path += index === 0
        ? `M ${p1.x} ${p1.y} `
        : `Q ${p1.x} ${p1.y} ${(p1.x + next.x) / 2} ${(p1.y + next.y) / 2} `;
    });
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const p1 = particlePoint(particles[index], 1);
      const previous = particlePoint(particles[index - 1] || particles[0], 1);
      path += `Q ${p1.x} ${p1.y} ${(p1.x + previous.x) / 2} ${(p1.y + previous.y) / 2} `;
    }
    const clip = `path('${path}Z')`;
    contactReveal.style.clipPath = clip;
    contactReveal.style.webkitClipPath = clip;
  };
  contactStage.addEventListener('pointerenter', (event) => {
    mouse.active = true;
    contactStage.classList.add('is-revealing');
    setMouse(event, true);
  });
  contactStage.addEventListener('pointermove', setMouse);
  contactStage.addEventListener('pointerleave', () => {
    mouse.active = false;
    contactStage.classList.remove('is-revealing');
  });

  const renderPaperCut = (now) => {
    mouse.smoothX += (mouse.x - mouse.smoothX) * .1;
    mouse.smoothY += (mouse.y - mouse.smoothY) * .1;
    const dx = mouse.x - mouse.smoothX;
    const dy = mouse.y - mouse.smoothY;
    mouse.diff = Math.hypot(dx, dy);
    mouse.smoothDiff += (mouse.diff - mouse.smoothDiff) * .1;
    if (mouse.diff > .1) mouse.angle = Math.atan2(dy, dx);
    addParticle(now);
    particles.forEach((particle) => {
      const age = now - particle.born;
      if (age < 2000) particle.progress = easeInOut(age / 2000);
      else if (age < 3000) particle.progress = 1;
      else particle.progress = Math.max(0, 1 - Math.pow(Math.min(1, (age - 3000) / 4000), 4));
    });
    while (particles.length && now - particles[0].born > 7000) particles.shift();
    cursor.style.transform = `translate3d(${mouse.smoothX}px,${mouse.smoothY}px,0) translate(-50%,-50%)`;
    drawPath();
    requestAnimationFrame(renderPaperCut);
  };
  requestAnimationFrame(renderPaperCut);
}
