/* Adapted from dososo/infinite-image-gallery (MIT): DOM + CSS + GSAP, no WebGL. */
(() => {
  const clamp = (min, max, value) => Math.max(min, Math.min(max, value));
  const fibonacci = (count) => Array.from({ length:count }, (_, i) => {
    const y = 1 - (i / Math.max(1, count - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * 2.399963;
    return { x:Math.cos(angle) * radius, y, z:Math.sin(angle) * radius };
  });

  function mount(root) {
    if (!root || root.dataset.ready) return;
    root.dataset.ready = 'true';
    const gsap = window.gsap;
    if (!gsap) { root.textContent = 'GALLERY LIBRARY NOT LOADED'; return; }
    const vortex = document.createElement('canvas'); vortex.className = 'infinite-lab__vortex';
    const viewport = document.createElement('div'); viewport.className = 'infinite-lab__viewport';
    const world = document.createElement('div'); world.className = 'infinite-lab__world';
    const hint = document.createElement('p'); hint.className = 'infinite-lab__hint'; hint.textContent = 'CLICK TO UNFOLD THE ARCHIVE';
    viewport.append(world); root.append(vortex, viewport, hint);
    startVortex(vortex, root);

    const formats = [[300,190],[190,280],[250,250],[320,180],[210,300],[280,220],[180,260],[300,210],[235,235],[270,170]];
    const count = 56, cols = 8, rows = 7;
    let viewW = 1, viewH = 1, worldW = 1, worldH = 1;
    let camX = 0, camY = 0, targetX = 0, targetY = 0, velocityX = 0, velocityY = 0;
    let dragging = false, entering = false, revealed = false, settleUntil = 0, lastX = 0, lastY = 0, zoom = .72, spin = 0;
    const spheres = fibonacci(count); const tiles = [];

    for (let index = 0; index < count; index += 1) {
      const [w, h] = formats[index % formats.length];
      const tile = document.createElement('figure'); tile.className = 'infinite-lab__tile'; tile.style.width = `${w}px`; tile.style.height = `${h}px`;
      const image = document.createElement('img'); image.src = `./img/5/${(index % 14) + 1}.webp`; image.alt = `实验室图像 ${(index % 14) + 1}`; image.draggable = false;
      tile.append(image); world.append(tile);
      const tileData = { el:tile, image, x:0, y:0, w, h, sphere:spheres[index] };
      image.addEventListener('load', () => {
        const ratio = image.naturalWidth / image.naturalHeight || 1;
        tileData.w = clamp(145, 360, 242 * Math.sqrt(ratio));
        tileData.h = clamp(135, 360, 242 / Math.sqrt(ratio));
        tile.style.width = `${tileData.w}px`; tile.style.height = `${tileData.h}px`;
      }, { once:true });
      tiles.push(tileData);
    }

    const layout = () => {
      const bounds = root.getBoundingClientRect(); viewW = bounds.width; viewH = bounds.height;
      worldW = Math.max(viewW * 2.05, cols * 278); worldH = Math.max(viewH * 2.08, rows * 276);
      tiles.forEach((tile, index) => {
        const col = index % cols; const row = Math.floor(index / cols);
        const jitterX = Math.sin(index * 18.17) * 72 + Math.cos(index * 3.31) * 34;
        const jitterY = Math.cos(index * 14.23) * 68 + Math.sin(index * 5.71) * 32;
        tile.x = col * (worldW / cols) + (row % 2) * 72 + jitterX;
        tile.y = row * (worldH / rows) + jitterY;
      });
      camX = targetX = viewW * .5 - worldW * .5; camY = targetY = viewH * .5 - worldH * .5;
      renderFlat(true);
    };
    const recycle = (tile) => {
      while (tile.x + camX < -tile.w) tile.x += worldW;
      while (tile.x + camX > viewW) tile.x -= worldW;
      while (tile.y + camY < -tile.h) tile.y += worldH;
      while (tile.y + camY > viewH) tile.y -= worldH;
    };
    const renderFlat = (instant = false) => {
      tiles.forEach((tile) => { recycle(tile); gsap.set(tile.el, { x:tile.x + camX, y:tile.y + camY, scale:1, opacity:1, zIndex:'' }); });
      if (!instant) gsap.set(world, { x:0, y:0 });
    };
    const renderSphere = () => {
      spin += .003;
      const amount = clamp(0, 1, 1.75 - zoom);
      const radius = Math.min(viewW, viewH) * (.19 + amount * .31);
      const focal = Math.min(viewW, viewH) * 1.8;
      tiles.forEach((tile) => {
        const sx = tile.sphere.x * Math.cos(spin) - tile.sphere.z * Math.sin(spin);
        const sz = tile.sphere.x * Math.sin(spin) + tile.sphere.z * Math.cos(spin);
        const perspective = focal / (focal - sz * radius);
        gsap.set(tile.el, { x:viewW / 2 + sx * radius * perspective - tile.w / 2, y:viewH / 2 + tile.sphere.y * radius * perspective - tile.h / 2, scale:.55 * perspective, opacity:.25 + (sz + 1) * .36, zIndex:Math.round((sz + 1) * 100) });
      });
    };
    const tick = () => {
      root.classList.toggle('is-flat', revealed && !entering && zoom >= 1.72);
      if (entering) { requestAnimationFrame(tick); return; }
      if (zoom >= 1.72) {
        if (dragging || performance.now() < settleUntil) { requestAnimationFrame(tick); return; }
        if (!dragging) { camX += velocityX; camY += velocityY; velocityX *= .88; velocityY *= .88; }
        renderFlat();
      } else renderSphere();
      requestAnimationFrame(tick);
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true; entering = true; zoom = 2;
      tiles.forEach((tile) => {
        recycle(tile); gsap.killTweensOf(tile.el);
        gsap.to(tile.el, { x:tile.x + camX, y:tile.y + camY, scale:1, opacity:1, duration:1.45, ease:'elastic.out(.78,.48)', overwrite:'auto' });
      });
      gsap.to(hint, { opacity:0, duration:.32 });
      window.setTimeout(() => { entering = false; renderFlat(); }, 1500);
    };
    const onDown = (event) => {
      event.preventDefault();
      lastX = event.clientX; lastY = event.clientY;
      if (!revealed) { root.setPointerCapture?.(event.pointerId); return; }
      dragging = true; settleUntil = 0; velocityX = velocityY = 0;
      root.setPointerCapture?.(event.pointerId);
    };
    const onMove = (event) => {
      if (!dragging || zoom < 1.72) return;
      event.preventDefault();
      const dx = event.clientX - lastX, dy = event.clientY - lastY;
      camX += dx * .78; camY += dy * .78; targetX = camX; targetY = camY;
      tiles.forEach((tile) => {
        recycle(tile); gsap.killTweensOf(tile.el);
        gsap.to(tile.el, { x:tile.x + camX, y:tile.y + camY, duration:.72, ease:'power4.out', overwrite:'auto' });
      });
      velocityX = dx * .11; velocityY = dy * .11; lastX = event.clientX; lastY = event.clientY;
    };
    const onUp = (event) => {
      if (!revealed) { if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 12) reveal(); return; }
      if (!dragging) return;
      dragging = false; settleUntil = performance.now() + 720;
    };
    // Start on the whole surface, then track on window: a pointer that begins
    // on empty paper keeps moving the archive even after it crosses a card.
    root.addEventListener('pointerdown', onDown, true);
    window.addEventListener('pointermove', onMove, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('pointercancel', onUp, true);
    root.addEventListener('dragstart', (event) => event.preventDefault());
    root.addEventListener('contextmenu', (event) => event.preventDefault());
    // This is a one-way opening gesture: the archive may be opened once, but
    // scrolling must never collapse the expanded layout back into the sphere.
    root.addEventListener('wheel', (event) => { event.preventDefault(); }, { passive:false });
    addEventListener('resize', layout, { passive:true }); layout();
    tiles.forEach((tile) => {
      gsap.set(tile.el, { x:viewW / 2 - tile.w / 2, y:viewH / 2 - tile.h / 2, scale:.18, rotation:Math.sin(tile.x) * 20, opacity:0 });
      tile.el.addEventListener('pointerenter', () => { if (!entering && zoom >= 1.72) gsap.to(tile.image, { scale:1.06, duration:.32, ease:'back.out(2)' }); });
      tile.el.addEventListener('pointerleave', () => gsap.to(tile.image, { scale:1, duration:.5, ease:'elastic.out(1,.45)' }));
    });
    renderSphere();
    gsap.to(tiles.map((tile) => tile.el), { opacity:1, duration:.7, stagger:{ amount:.28, from:'random' }, ease:'power2.out' });
    requestAnimationFrame(tick);
  }
  window.LabGallery = { mount };

  function startVortex(canvas, root) {
    const ctx = canvas.getContext('2d'); let width = 1; let height = 1; let dpr = 1;
    const resize = () => { const r = root.getBoundingClientRect(); width = r.width; height = r.height; dpr = Math.min(devicePixelRatio || 1, 1.5); canvas.width = width * dpr; canvas.height = height * dpr; };
    const draw = (time) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, width, height);
      ctx.save(); ctx.translate(width * .72, height * .70); ctx.scale(.64, .64); ctx.rotate(-.78);
      for (let i = 0; i < 52; i += 1) { const p = i / 52; const rx = width * (.69 - p * .61); const ry = height * (.25 - p * .215); ctx.globalAlpha = (1 - p) * .36; ctx.strokeStyle = i % 9 === 0 ? '#ec633d' : '#11110f'; ctx.lineWidth = .7; ctx.beginPath(); ctx.ellipse(0, height * (-.34 + p * .62), Math.max(2, rx), Math.max(1, ry), 0, 0, Math.PI * 2); ctx.stroke(); }
      for (let i = 0; i < 360; i += 1) { const spread = (i * .7548776662) % 1; const row = (i * .569840291) % 1; const a = i * 2.399963 + time * (.000035 + (i % 5) * .000006); const rx = width * (.12 + spread * .54); const ry = height * (.035 + spread * .17); const x = Math.cos(a) * rx; const y = height * (-.29 + row * .57) + Math.sin(a) * ry; ctx.globalAlpha = .16 + spread * .55; ctx.fillStyle = i % 17 === 0 ? '#ec633d' : '#11110f'; const size = i % 11 === 0 ? 2.5 : 1.8; ctx.fillRect(x, y, size, size); }
      ctx.restore(); requestAnimationFrame(draw);
    };
    addEventListener('resize', resize, { passive:true }); resize(); requestAnimationFrame(draw);
  }
})();
