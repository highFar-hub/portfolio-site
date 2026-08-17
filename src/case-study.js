const studies = {
  1: { title:'既成态', type:'VR SCIENCE INTERACTION', format:'VR 科普交互体验', role:'全流程设计 / 开发', cover:'./img/1.webp', film:true, deck:'以可探索的虚拟叙事，将抽象科学知识转换为可以被身体理解的场域。', thoughtTitle:'让知识<br>可以走进去', thought:'不是把信息放进头显，而是让观众通过移动、选择与反馈走进信息的内部。每一段路径都是一次由身体完成的理解。', tech:['Unity XR Interaction Toolkit 与空间定位','交互脚本与状态导览设计','沉浸式 3D 场景、灯光与节奏控制','VR 测试、性能优化与用户流程迭代'], roles:['概念与叙事架构','交互逻辑设计','Unity 场景搭建','视觉与动态整合'] },
  2: { title:'星洄', type:'AI GESTURE + VOICE', format:'大屏实时互动装置', role:'全栈技术实现 / 交互开发', cover:'./img/2.webp', film:true, deck:'以手势、语音与生成式反馈构成一条可被身体启动的星际回路。', thoughtTitle:'让输入<br>成为回响', thought:'我将多套既有工具与服务组织为一条可控的实时链路：观众的动作或声音不是孤立事件，而会在明确的条件、状态与时间节点下，持续推动下一层画面生成。', tech:['MediaPipe 手势调用：摄像头输入、手部关键点识别与稳定性处理','固定点位抓取：以手势进入目标区域，再由动作条件触发星体／界面反馈','天气系统 API：获取实时环境数据，并转换为画面与叙事的动态参数','讯飞语音转文字：将语音实时转为文本，接入语言大模型生成回应','LLM × 文本反馈 × ComfyUI：将语言回应转为提示词与 AI 图像，回写至大屏'], roles:['独立完成整体技术方案与实时交互开发','独立完成 MediaPipe 手势识别、点位抓取与动作触发逻辑','独立完成天气 API、语音转写、语言大模型与 ComfyUI 的服务串联','负责现成插件／工具的条件编排、状态机设计与现场稳定性调试'] },
  3: { title:'脉合五境', type:'AIGC + EEG INTERACTION', format:'脑电反馈 × 双屏生成式互动', role:'交互技术 / 实时系统整合', cover:'./img/3.webp', film:true, deck:'以黄河“几字弯”在内蒙古孕育的五处文化转折为线索，让手势、脑电与生成图像共同推动一段双屏叙事。', thoughtTitle:'让黄河<br>以身体回响', thought:'作品将黄河几字弯中的五个文化转折拆为五段可进入的观看。大屏承载叙事动画，小屏持续显现意识的波动；观众用手势推进片段，也以脑电状态改变生成图像的情绪参数，让地域记忆从被观看的故事变成可参与的过程。', tech:['MediaPipe 手势输入：识别动作，推进五境叙事','五境视频状态机：Timer + Switch 编排 15+ 段视频的等待、触发与过场','EEG 实时反馈：脑电启动体验，并转为粒子视觉','五档脑电映射：信号等级驱动实时画面与生成参数','EEG × ComfyUI × 双屏：大屏播放五境，小屏呈现反馈与生成结果'], roles:['独立完成手势交互、视频状态机与五境流程的实时逻辑编排','独立完成 Timer／Switch 条件系统，控制 15+ 段视频的等待、触发与切换','独立完成 EEG 启动、数据读取、五档映射与粒子反馈的交互实现','独立完成 ComfyUI 生成参数与文本提示的脑电联动、双屏内容同步及现场调试'] },
  4: { title:'洄声', type:'AR INTERACTION', format:'AR 空间声音交互', role:'AR 体验设计 / 3D 制作', cover:'./img/4.webp', film:true, deck:'让声音离开耳边，在真实空间留下可追随、可触发、可回望的增强现实轨迹。', thoughtTitle:'声音留下<br>一条轨迹', thought:'以 AR 把不可见的声音变成可走近的空间事件。观众在现实与虚拟之间移动，也重新决定聆听的方向。', tech:['AR 平面识别与空间锚点','3D 声音可视化与触发逻辑','手机端交互界面与导览节奏','场景建模、材质与实机测试'], roles:['AR 交互设计','空间叙事与导览','3D 模型与视觉','实机测试与优化'] },
  5: { title:'小型实验室', type:'MINI INTERACTIONS / 3D STUDIES', format:'互动与三维练习档案', role:'持续研究 / 个人实验', cover:'./img/5.webp', film:false, deck:'一个持续累积的练习现场：小型互动、三维形体与未完成的视觉测试。', thoughtTitle:'让系统始终<br>保持开放', thought:'这里不追求每件事都完整，而是保留正在发生的尝试。技术、形式与直觉在可反复修改的实验中慢慢长出方向。', tech:['TouchDesigner 实时视觉测试','Unity / Unreal 空间原型','Python、C# 与互动脚本练习','建模、材质与渲染研究'], roles:['创意编程练习','3D 形体研究','视觉测试记录','工具与流程实验'] },
};

const requestedProject = new URLSearchParams(location.search).get('project');
const id = String(Number.parseInt(requestedProject, 10));
const projectId = studies[id] ? id : '1';
const project = studies[projectId];
const nextId = String(Number(projectId) === 5 ? 1 : Number(projectId) + 1);
document.title = `H/F — ${project.title} / Case Study`;
document.querySelector('#case-index').textContent = `${projectId.padStart(2,'0')} / 05`;
document.querySelector('#case-back').href = `./index.html#project-${projectId.padStart(2,'0')}`;
document.querySelector('#case-kicker').textContent = project.type;
document.querySelector('#case-title').textContent = project.title;
document.querySelector('#case-deck').textContent = project.deck;
document.querySelector('#case-format').textContent = project.format;
document.querySelector('#case-role').textContent = project.role;
document.querySelector('#case-thought-title').innerHTML = project.thoughtTitle;
document.querySelector('#case-thought').textContent = project.thought;
document.querySelector('#case-tech').innerHTML = project.tech.map(item => `<li>${item}</li>`).join('');
document.querySelector('#case-responsibilities').innerHTML = project.roles.map(item => `<li>${item}</li>`).join('');

// Technical capabilities lead every case study; narrative follows once the system is clear.
const caseHero = document.querySelector('.case-hero');
const systemSection = document.querySelector('.case-system');
const roleSection = document.querySelector('.case-role');
const thoughtSection = document.querySelector('.case-statement');
const gallerySection = document.querySelector('.case-gallery');
if (caseHero && systemSection && roleSection && thoughtSection && gallerySection) {
  caseHero.after(systemSection);
  systemSection.after(roleSection);
  roleSection.after(thoughtSection);
  thoughtSection.after(gallerySection);

  systemSection.querySelector('.section-label').textContent = '01 / 技术能力 / TECHNICAL CAPABILITIES';
  systemSection.querySelector('h2').innerHTML = '技术<br>能力';
  roleSection.querySelector('.section-label').textContent = '02 / 负责内容 / CONTRIBUTION';
  thoughtSection.querySelector('.section-label').textContent = '03 / 创作思路 / CREATIVE THOUGHT';
  gallerySection.querySelector('.section-label').textContent = '04 / 视觉预览 / PROCESS FRAMES';
}

if (projectId === '1' && systemSection && roleSection) {
  document.querySelector('#case-tech').innerHTML = [
    'Unity + SteamVR Plugin：控制器输入、VR Rig 与手模反馈',
    '直接抓取与远距召回：射线选取、拖拽与握持状态',
    '实体控制交互：按钮、拉杆与可抓取开关的物理操作',
    'NPC 状态系统：区域触发、分段解说与场景推进',
    '植物扫描系统：探针聚焦、计时判定、信息 UI 与腕部 HUD',
  ].map((item) => `<li>${item}</li>`).join('');

  const vrModule = document.createElement('div');
  vrModule.className = 'vr-module';
  vrModule.innerHTML = `
    <div class="vr-module__heading">
      <p class="section-label">02 / 交互模块 / INTERACTION MODULES</p>
      <h2>身体即<br>界面</h2>
      <p>从抓取、实体开关到扫描与移动设置，所有输入都以手部与身体姿态组织。</p>
    </div>
    <div class="vr-module__index" aria-label="既成态交互演示索引">
      <button type="button" data-video="./video/01-jichengtai/Grab.webm"><b>01</b><span>抓取与远距召回</span><small>DIRECT + DISTANCE GRAB</small></button>
      <button type="button" data-video="./video/01-jichengtai/Button.webm"><b>02</b><span>按钮、拉杆与握持操作</span><small>PHYSICAL CONTROLS</small></button>
      <button type="button" data-video="./video/01-jichengtai/Blackboard.webm"><b>03</b><span>黑板涂鸦与图鉴收集</span><small>DRAWING + COLLECTION</small></button>
      <button type="button" data-video="./video/01-jichengtai/Scan.webm"><b>04</b><span>植物扫描与腕部任务 HUD</span><small>SCAN + WRIST HUD</small></button>
      <button type="button" data-video="./video/01-jichengtai/Switch to mobile.webm"><b>05</b><span>移动与转向方式切换</span><small>LOCOMOTION SETTINGS</small></button>
      <button type="button" data-video="./video/01-jichengtai/Shader.webm"><b>06</b><span>机器人全息材质 Shader</span><small>HOLOGRAM DIRECTIONAL SHADER</small></button>
      <button type="button" data-video="./video/01-jichengtai/Script.webm"><b>07</b><span>核心交互 C# 脚本结构</span><small>INTERACTION SCRIPT OVERVIEW</small></button>
    </div>
    <div class="vr-hover-preview" aria-hidden="true"><div class="vr-preview-stack"><i></i><i></i><i></i><i></i><video muted loop playsinline preload="none"></video></div><p>HOVER TO PREVIEW</p></div>
  `;
  vrModule.querySelector('.vr-module__heading').remove();
  systemSection.append(vrModule);

  const preview = vrModule.querySelector('.vr-hover-preview');
  const previewVideo = preview.querySelector('video');
  const index = vrModule.querySelector('.vr-module__index');
  let selectedSource = '';
  let switchTimer;
  const movePreview = (event) => {
    const bounds = vrModule.getBoundingClientRect();
    const x = Math.min(bounds.width - preview.offsetWidth - 16, Math.max(16, event.clientX - bounds.left + 24));
    const y = Math.min(bounds.height - preview.offsetHeight - 16, Math.max(16, event.clientY - bounds.top + 24));
    preview.style.setProperty('--preview-x', `${x}px`);
    preview.style.setProperty('--preview-y', `${y}px`);
    const tiltX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const tiltY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    preview.style.setProperty('--tilt-x', tiltX.toFixed(3));
    preview.style.setProperty('--tilt-y', tiltY.toFixed(3));
    const previewStack = preview.querySelector('.vr-preview-stack');
    previewStack.style.transform = `perspective(850px) rotateX(${-tiltY * 5}deg) rotateY(${tiltX * 7}deg)`;
    previewStack.querySelectorAll('i').forEach((shadow, index) => {
      const layers = [
        { x: 54, y: -26, rotate: -6 },
        { x: 37, y: -17, rotate: -4 },
        { x: 21, y: -9, rotate: -2 },
        { x: 8, y: -3, rotate: -1 },
      ];
      const layer = layers[index];
      shadow.style.transform = `translate(${layer.x + tiltX * 18}px, ${layer.y - tiltY * 13}px) rotate(${layer.rotate + tiltX * 2}deg)`;
    });
  };
  const openPreview = (button, event) => {
    const source = button.dataset.video;
    movePreview(event);
    preview.querySelector('p').textContent = button.querySelector('small').textContent;
    preview.classList.add('is-visible');
    if (selectedSource === source) {
      previewVideo.play().catch(() => {});
      return;
    }
    preview.classList.add('is-switching');
    clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => {
      previewVideo.src = source;
      selectedSource = source;
      previewVideo.play().catch(() => {});
      preview.classList.remove('is-switching');
    }, 150);
  };
  index.querySelectorAll('button').forEach((button) => {
    button.addEventListener('pointerenter', (event) => openPreview(button, event));
    button.addEventListener('pointermove', movePreview);
    button.addEventListener('focus', () => {
      openPreview(button, { clientX: innerWidth / 2, clientY: innerHeight / 2 });
    });
  });
  vrModule.addEventListener('pointerleave', () => {
    preview.classList.remove('is-visible');
    previewVideo.pause();
  });

  roleSection.querySelector('#case-responsibilities').innerHTML = [
    '独立完成项目策划、世界观设定与交互叙事设计',
    '独立完成 Unity + SteamVR 的 VR 交互开发与状态逻辑',
    '独立完成手部抓取、实体开关、扫描与腕部 HUD 系统',
    '独立完成实验室与森林场景、模型、材质与实时视觉整合',
  ].map((item) => `<li>${item}</li>`).join('');
  const roleTitle = roleSection.querySelector('.role-layout h2');
  roleTitle.classList.add('role-title-flip');
  roleTitle.innerHTML = ['我','的','<br>','负','责','内','容'].map((char, index) => char === '<br>' ? char : `<span style="--flip-delay:${index * 70}ms">${char}</span>`).join('');
  roleTitle.insertAdjacentHTML('afterend', '<p class="role-all">全流程独立完成<br><small>CONCEPT · 3D · INTERACTION · UNITY DEVELOPMENT</small></p>');

  thoughtSection.classList.add('case-statement--featured');
  thoughtSection.insertAdjacentHTML('beforeend', `
    <div class="case-story-film" data-story-film>
      <img class="story-film__cover" src="./img/vr show.webp" alt="既成态全流程演示封面">
      <p class="story-film__label">全流程展示 / FULL WALKTHROUGH</p>
      <video muted playsinline preload="none" data-src="https://projectvideo-1352974734.cos.ap-beijing.myqcloud.com/vr%20show.mp4"></video>
      <button class="story-film__open" type="button" aria-label="播放完整作品演示"><img src="./img/play.svg" alt=""><small>PLAY FULL WALKTHROUGH</small></button>
    </div>
  `);
  const storyFilm = thoughtSection.querySelector('[data-story-film]');
  const storyVideo = storyFilm.querySelector('video');
  storyFilm.querySelector('.story-film__open').addEventListener('click', () => {
    if (!storyVideo.src) storyVideo.src = storyVideo.dataset.src;
    storyFilm.classList.add('is-open');
    storyVideo.controls = true;
    storyVideo.play().catch(() => {});
  });

  if (false) {
  const shaderModule = document.createElement('section');
  shaderModule.className = 'case-section hologram-module';
  shaderModule.innerHTML = `
    <div class="hologram-module__copy"><p class="section-label">03 / NPC 材质实验 / HOLOGRAM SHADER STUDY</p><h2>全息<br>导师</h2><p>基于 Unity URP 的 <code>Hologram_Directional</code>：以扫描线、噪波抖动与菲涅尔边缘构建会“呼吸”的机器人投影。</p></div>
    <div class="hologram-lab"><canvas id="hologram-canvas" aria-label="可调节的全息球体材质预览"></canvas><div class="hologram-panel"><label>扫描方向<select data-control="direction"><option value="vertical">垂直</option><option value="horizontal">水平</option></select></label><label>顶点抖动 <input data-control="glitch" type="range" min="0" max="10" step=".1" value="3"></label><label>扫描速度 <input data-control="speed" type="range" min=".1" max="3" step=".1" value=".7"></label><label>菲涅尔强度 <input data-control="fresnel" type="range" min=".1" max="3" step=".1" value="1.4"></label><label>不透明度 <input data-control="opacity" type="range" min=".2" max="1" step=".05" value=".8"></label></div></div>
  `;
  vrModule.after(shaderModule);

  class HologramSphere {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.controls = { direction:'vertical', glitch:3, speed:.7, fresnel:1.4, opacity:.8 };
      this.resize = this.resize.bind(this);
      this.draw = this.draw.bind(this);
      shaderModule.querySelectorAll('[data-control]').forEach((control) => control.addEventListener('input', () => {
        this.controls[control.dataset.control] = control.type === 'range' ? Number(control.value) : control.value;
      }));
      this.resize();
      addEventListener('resize', this.resize, { passive:true });
      requestAnimationFrame(this.draw);
    }
    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = Math.max(1, rect.width); this.height = Math.max(1, rect.height);
      this.dpr = Math.min(devicePixelRatio || 1, 2);
      this.canvas.width = this.width * this.dpr; this.canvas.height = this.height * this.dpr;
    }
    draw(time) {
      const ctx = this.ctx; const { width:w, height:h, dpr } = this;
      const { direction, glitch, speed, fresnel, opacity } = this.controls;
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
      const radius = Math.min(w,h) * .34; const cx = w*.48; const cy = h*.5;
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.clip();
      const glow = ctx.createRadialGradient(cx-radius*.2,cy-radius*.35,4,cx,cy,radius);
      glow.addColorStop(0,`rgba(225,251,255,${opacity*.55})`); glow.addColorStop(.48,`rgba(30,160,255,${opacity*.16})`); glow.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=glow; ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
      const tick = time*.001*speed;
      ctx.globalCompositeOperation='screen';
      ctx.strokeStyle=`rgba(110,231,255,${opacity*.78})`; ctx.lineWidth=1;
      for(let i=-10;i<=10;i++){ const jitter=Math.sin(i*5.1+Math.floor(tick*8))*glitch*.75; ctx.beginPath(); if(direction==='vertical'){ ctx.moveTo(cx+i*radius*.14+jitter,cy-radius);ctx.lineTo(cx+i*radius*.14+jitter,cy+radius); }else{ ctx.moveTo(cx-radius,cy+i*radius*.14+jitter);ctx.lineTo(cx+radius,cy+i*radius*.14+jitter); }ctx.stroke(); }
      for(let y=-radius;y<radius;y+=6){ const shift=Math.sin(y*.16+tick*8)*glitch*1.4; ctx.fillStyle=`rgba(174,249,255,${.08+opacity*.12})`; ctx.fillRect(cx-radius,cy+y+shift,radius*2,1); }
      for(let i=0;i<150;i++){ const px=cx+(((i*73)%211)/211-.5)*radius*2; const py=cy+(((i*109)%233)/233-.5)*radius*2; if((px-cx)**2+(py-cy)**2<radius**2){ const n=Math.sin(i*17+tick*11); if(n>.35){ctx.fillStyle=`rgba(255,255,255,${opacity*.38})`;ctx.fillRect(px,py,1.5,1.5);} } }
      ctx.restore();
      ctx.strokeStyle=`rgba(181,247,255,${Math.min(.95,opacity*.42*fresnel)})`; ctx.lineWidth=Math.max(1.2,fresnel*2.2); ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='rgba(236,99,61,.9)'; ctx.fillRect(cx-radius*.12,cy-radius-15,radius*.24,2);
      requestAnimationFrame(this.draw);
    }
  }
  new HologramSphere(shaderModule.querySelector('#hologram-canvas'));
  }
}

if ((projectId === '2' || projectId === '3' || projectId === '4') && systemSection) {
  const techList = document.querySelector('#case-tech');
  systemSection.classList.add('has-xinghui-preview');
  const previewConfig = projectId === '2'
    ? {
        videos: [
          './video/02-xinghui/mediapipe.webm',
          './video/02-xinghui/Point Capture.webm',
          './video/02-xinghui/API.webm',
          './video/02-xinghui/Text Feedback.webm',
          './video/02-xinghui/Image Generation.webm',
        ],
        labels: [
          'HAND LANDMARK DETECTION',
          'POINT CAPTURE + GESTURE TRIGGER',
          'LIVE ENVIRONMENTAL INPUT',
          'SPEECH TO TEXT + TEXT FEEDBACK',
          'LLM TO IMAGE GENERATION',
        ],
      }
    : projectId === '3'
    ? {
        // Five 脉合五境 clips: video/03-maihe-wujing/1.webm … 5.webm.
        videos: [1, 2, 3, 4, 5].map((index) => `./video/03-maihe-wujing/${index}.webm`),
        labels: [
          'GESTURE INPUT',
          'FIVE-REALM VIDEO STATE MACHINE',
          'EEG PARTICLE FEEDBACK',
          'FIVE-LEVEL EEG MAPPING',
          'COMFYUI + DUAL-SCREEN OUTPUT',
        ],
      }
    : {
        // Four 洄声 clips: video/04-huisheng/1.webm … 4.webm.
        videos: [1, 2, 3, 4].map((index) => `./video/04-huisheng/${index}.webm`),
        labels: [
          'AR PLANE DETECTION + SPATIAL ANCHORS',
          '3D SOUND VISUALIZATION + TRIGGERS',
          'MOBILE INTERFACE + GUIDED RHYTHM',
          'MODELING, MATERIALS + DEVICE TESTING',
        ],
      };
  const { videos, labels: previewLabels } = previewConfig;
  techList.classList.add('xinghui-tech');
  techList.querySelectorAll('li').forEach((item, index) => { item.dataset.video = videos[index]; });
  systemSection.insertAdjacentHTML('beforeend', '<div class="vr-hover-preview xinghui-hover-preview" aria-hidden="true"><div class="vr-preview-stack"><i></i><i></i><i></i><i></i><video muted loop playsinline preload="none"></video></div><p>HOVER TO PREVIEW</p></div>');

  const preview = systemSection.querySelector('.xinghui-hover-preview');
  const previewVideo = preview.querySelector('video');
  let selectedSource = '';
  let switchTimer;
  const movePreview = (event) => {
    const bounds = systemSection.getBoundingClientRect();
    const x = Math.min(bounds.width - preview.offsetWidth - 16, Math.max(16, event.clientX - bounds.left + 24));
    const y = Math.min(bounds.height - preview.offsetHeight - 16, Math.max(16, event.clientY - bounds.top + 24));
    preview.style.setProperty('--preview-x', `${x}px`);
    preview.style.setProperty('--preview-y', `${y}px`);
    const tiltX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const tiltY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    const stack = preview.querySelector('.vr-preview-stack');
    stack.style.transform = `perspective(850px) rotateX(${-tiltY * 5}deg) rotateY(${tiltX * 7}deg)`;
    stack.querySelectorAll('i').forEach((shadow, shadowIndex) => {
      const layers = [
        { x: 54, y: -26, rotate: -6 },
        { x: 37, y: -17, rotate: -4 },
        { x: 21, y: -9, rotate: -2 },
        { x: 8, y: -3, rotate: -1 },
      ];
      const layer = layers[shadowIndex];
      shadow.style.transform = `translate(${layer.x + tiltX * 18}px, ${layer.y - tiltY * 13}px) rotate(${layer.rotate + tiltX * 2}deg)`;
    });
  };
  const openPreview = (item, event, index) => {
    const source = item.dataset.video;
    movePreview(event);
    preview.querySelector('p').textContent = previewLabels[index];
    preview.classList.add('is-visible');
    if (selectedSource === source) { previewVideo.play().catch(() => {}); return; }
    preview.classList.add('is-switching');
    clearTimeout(switchTimer);
    switchTimer = window.setTimeout(() => {
      previewVideo.src = source;
      selectedSource = source;
      previewVideo.play().catch(() => {});
      preview.classList.remove('is-switching');
    }, 150);
  };
  techList.querySelectorAll('li').forEach((item, index) => {
    item.addEventListener('pointerenter', (event) => openPreview(item, event, index));
    item.addEventListener('pointermove', movePreview);
  });
  techList.addEventListener('pointerleave', () => { preview.classList.remove('is-visible'); previewVideo.pause(); });
}

const filmLink = document.querySelector('#case-film');
if (project.film) filmLink.href = `./film.html?project=${projectId}`; else filmLink.classList.add('is-hidden');

const gallery = document.querySelector('#coverflow');
const frameLabels = ['概念草图 / CONCEPT','叙事结构 / NARRATIVE','系统测试 / SYSTEM','交互状态 / INTERACTION','空间画面 / SPATIAL','现场记录 / ON SITE','视觉迭代 / VISUAL','动作研究 / MOTION','界面细节 / INTERFACE','模型测试 / MODEL','过程记录 / PROCESS','版本归档 / ARCHIVE'];
const frameDescriptions = ['从问题与叙事关系出发，确认作品最初的体验方向。','梳理信息、角色与体验节奏之间的关系。','把输入、反馈与输出拆解成可测试的实时系统。','记录观众进入系统后的触发、停留与反馈状态。','在真实展示环境中校准空间、画面与观看距离。','观察装置、身体与环境之间的即时关系。','保留画面在不同参数下的视觉变化。','测试动态反馈如何回应观众动作。','校准界面信息在实际体验中的可读性。','记录建模、材质与实时渲染的取舍。','保留迭代中的版本、失败样本与下一步假设。','汇总完成版本与后续可继续发展的线索。'];
const dots = document.querySelector('#gallery-dots');
const galleryCaption = document.querySelector('#gallery-caption');
// Project 05 uses the provided DOM + CSS + GSAP infinite-gallery implementation.
const useLabCorridor = true;
if (useLabCorridor && projectId === '5') {
  document.body.classList.add('case-page--lab');
  gallerySection.classList.add('case-gallery--lab');
  gallery.innerHTML = '<div class="infinite-lab" data-lab-gallery></div>';
  dots.innerHTML = '';
  galleryCaption.textContent = '';
  window.LabGallery?.mount(gallery.querySelector('[data-lab-gallery]'));
} else {
// One dedicated 12-frame sequence per project. Add images as img/{projectId}/1.webp … 12.webp.
  gallery.innerHTML = frameLabels.map((label, index) => `<button class="cover-card" type="button" data-card="${index}" aria-label="查看 ${label}"><img src="./img/${projectId}/${index + 1}.webp" alt="${project.title} ${label}"></button>`).join('');
  dots.innerHTML = frameLabels.map((label, index) => `<span data-dot="${index}" aria-label="第 ${index + 1} 张：${label}"></span>`).join('');
  let activeCard = 0;
  function updateCoverflow() {
    gallery.querySelectorAll('.cover-card').forEach((card, index) => {
      if (index === activeCard) {
        card.dataset.stack = 'center';
        card.style.setProperty('--stack-index', '0');
      } else if (index > activeCard) {
        card.dataset.stack = 'right';
        card.style.setProperty('--stack-index', String(index - activeCard - 1));
      } else {
        card.dataset.stack = 'left';
        card.style.setProperty('--stack-index', String(activeCard - index - 1));
      }
      card.querySelector('img').style.objectPosition = `${30 + index * 12}% ${35 + index * 9}%`;
    });
    dots.querySelectorAll('[data-dot]').forEach((dot, index) => dot.classList.toggle('is-active', index === activeCard));
    galleryCaption.textContent = `${String(activeCard + 1).padStart(2,'0')} / ${String(frameLabels.length).padStart(2,'0')} — ${frameDescriptions[activeCard]}`;
  }
  updateCoverflow();
  document.querySelector('#coverflow-prev').addEventListener('click', () => { if (activeCard === 0) return; activeCard -= 1; updateCoverflow(); });
  document.querySelector('#coverflow-next').addEventListener('click', () => { if (activeCard === frameLabels.length - 1) return; activeCard += 1; updateCoverflow(); });
  let touchStartX = 0;
gallery.addEventListener('pointerdown', event => { touchStartX = event.clientX; });
gallery.addEventListener('pointerup', event => { touchStartX = 0; });
}
const next = studies[nextId];

function startLabCorridor(root) {
  if (!root) return;
  const canvas = root.querySelector('canvas');
  const THREE = window.THREE;
  if (!canvas) return;
  if (!THREE) {
    startLabCanvasFallback(root);
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor('#10100f', 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#10100f', 4, 30);
  const camera = new THREE.PerspectiveCamera(62, 1, .1, 100);
  const pointer = new THREE.Vector2();
  const tunnelWidth = 4.8;
  const tunnelHeight = 3.1;
  const segments = 240;
  const loop = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, 0.2, 0), new THREE.Vector3(-5, 2.6, -9),
    new THREE.Vector3(5, -1.6, -12), new THREE.Vector3(12, .7, -4),
    new THREE.Vector3(8, 2.4, 7), new THREE.Vector3(-2, -2.2, 11),
    new THREE.Vector3(-11, .4, 7), new THREE.Vector3(-14, 2, -2),
  ], true, 'catmullrom', .18);
  const frames = loop.computeFrenetFrames(segments, true);
  const sampleFrame = (t) => {
    const index = Math.round((((t % 1) + 1) % 1) * segments) % segments;
    return { point:loop.getPointAt(((t % 1) + 1) % 1), tangent:frames.tangents[index], normal:frames.normals[index], binormal:frames.binormals[index] };
  };

  const tunnelPoints = [];
  const orangePoints = [];
  for (let i = 0; i < segments; i += 1) {
    const a = sampleFrame(i / segments);
    const b = sampleFrame((i + 1) / segments);
    const cornersA = [-1, 1].flatMap((vertical) => [-1, 1].map((horizontal) => a.point.clone().addScaledVector(a.binormal, horizontal * tunnelWidth).addScaledVector(a.normal, vertical * tunnelHeight)));
    const cornersB = [-1, 1].flatMap((vertical) => [-1, 1].map((horizontal) => b.point.clone().addScaledVector(b.binormal, horizontal * tunnelWidth).addScaledVector(b.normal, vertical * tunnelHeight)));
    cornersA.forEach((corner, index) => tunnelPoints.push(corner, cornersB[index]));
    if (i % 7 === 0) {
      [[0, 1], [1, 3], [3, 2], [2, 0]].forEach(([from, to]) => tunnelPoints.push(cornersA[from], cornersA[to]));
    }
    if (i % 31 === 0) orangePoints.push(cornersA[0], cornersA[1], cornersA[1], cornersA[3], cornersA[3], cornersA[2], cornersA[2], cornersA[0]);
  }
  const makeLines = (points, color, opacity) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent:true, opacity, depthWrite:false });
    return new THREE.LineSegments(geometry, material);
  };
  scene.add(makeLines(tunnelPoints, '#f5f2ea', .3));
  scene.add(makeLines(orangePoints, '#ec633d', .64));

  const loader = new THREE.TextureLoader();
  const paper = new THREE.MeshBasicMaterial({ color:'#eeece3', side:THREE.DoubleSide });
  const panelGeometry = new THREE.PlaneGeometry(1.58, 1.58);
  const frameGeometry = new THREE.EdgesGeometry(panelGeometry);
  for (let i = 0; i < 46; i += 1) {
    const t = (i / 46 + .028 + ((i * 17) % 11) * .0012) % 1;
    const side = i % 3 === 0 ? -1 : 1;
    const level = ((i * 7) % 10) / 10 - .45;
    const frame = sampleFrame(t);
    const material = new THREE.MeshBasicMaterial({ color:'#e8e5dc', side:THREE.DoubleSide });
    loader.load(
      `./img/5/${(i % 10) + 1}.webp`,
      (texture) => { texture.colorSpace = THREE.SRGBColorSpace; material.map = texture; material.needsUpdate = true; },
      undefined,
      () => { material.map = null; material.color.set('#e8e5dc'); material.needsUpdate = true; },
    );
    const panel = new THREE.Mesh(panelGeometry, material);
    const inward = frame.binormal.clone().multiplyScalar(-side);
    const basis = new THREE.Matrix4().makeBasis(frame.tangent.clone().multiplyScalar(side), frame.normal, inward);
    panel.quaternion.setFromRotationMatrix(basis);
    panel.position.copy(frame.point).addScaledVector(frame.binormal, side * (tunnelWidth - .09)).addScaledVector(frame.normal, level * 3.65);
    panel.rotation.z += ((i % 5) - 2) * .035;
    const scale = .72 + (i % 4) * .11;
    panel.scale.set(scale, .76 + ((i * 3) % 4) * .1, 1);
    scene.add(panel);
    const border = new THREE.LineSegments(frameGeometry, i % 8 === 0 ? new THREE.LineBasicMaterial({ color:'#ec633d' }) : paper);
    border.position.copy(panel.position);
    border.quaternion.copy(panel.quaternion);
    border.scale.copy(panel.scale).multiplyScalar(1.03);
    scene.add(border);
  }

  let width = 1;
  let height = 1;
  let progress = .035;
  let previous = performance.now();
  const resize = () => {
    const bounds = root.getBoundingClientRect();
    width = Math.max(1, bounds.width); height = Math.max(1, bounds.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const render = (now) => {
    const delta = Math.min(.05, (now - previous) / 1000); previous = now;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) progress = (progress + delta * .018) % 1;
    const current = sampleFrame(progress);
    const future = sampleFrame((progress + .011) % 1);
    camera.position.copy(current.point).addScaledVector(current.normal, pointer.y * .16).addScaledVector(current.binormal, pointer.x * .22);
    camera.up.copy(current.normal);
    const target = future.point.clone().addScaledVector(current.binormal, pointer.x * .75).addScaledVector(current.normal, pointer.y * .48);
    camera.lookAt(target);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  root.addEventListener('pointermove', (event) => {
    const bounds = root.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width - .5;
    pointer.y = .5 - (event.clientY - bounds.top) / bounds.height;
  }, { passive:true });
  addEventListener('resize', resize, { passive:true });
  resize();
  requestAnimationFrame(render);
}

// A self-contained fallback keeps the laboratory visible when the optional Three.js CDN is unavailable.
function startLabCanvasFallback(root) {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const images = Array.from({ length:10 }, (_, index) => {
    const image = new Image();
    image.src = `./img/5/${index + 1}.webp`;
    return image;
  });
  const pointer = { x:0, y:0 };
  let width = 1; let height = 1; let dpr = 1;
  const resize = () => {
    const rect = root.getBoundingClientRect();
    width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  };
  const drawImageCover = (image, x, y, w, h) => {
    if (!image.complete || !image.naturalWidth) { ctx.fillStyle = '#e8e5dc'; ctx.fillRect(x, y, w, h); return; }
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = w / h;
    let sx = 0; let sy = 0; let sw = image.naturalWidth; let sh = image.naturalHeight;
    if (sourceRatio > targetRatio) { sw = sh * targetRatio; sx = (image.naturalWidth - sw) * .5; } else { sh = sw / targetRatio; sy = (image.naturalHeight - sh) * .5; }
    ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
  };
  const render = (time) => {
    const progress = (time * .000035) % 1;
    const cx = width * (.5 + pointer.x * .035);
    const cy = height * (.49 + pointer.y * .03);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#10100f'; ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (let ring = 0; ring < 26; ring += 1) {
      const z = ((ring / 26 + progress) % 1);
      const depth = Math.pow(z, 1.75);
      const bend = Math.sin((z + progress) * Math.PI * 2) * width * .11;
      const rw = width * (.035 + depth * .78); const rh = height * (.035 + depth * .71);
      ctx.strokeStyle = ring % 8 === 0 ? 'rgba(236,99,61,.63)' : `rgba(245,242,234,${.13 + depth * .15})`;
      ctx.strokeRect(cx + bend - rw / 2, cy - rh / 2, rw, rh);
    }
    for (let edge = -1; edge <= 1; edge += 2) {
      ctx.beginPath();
      for (let step = 0; step <= 42; step += 1) {
        const z = step / 42; const depth = Math.pow(z, 1.75);
        const bend = Math.sin((z + progress) * Math.PI * 2) * width * .11;
        const x = cx + bend + edge * width * (.035 + depth * .39);
        const y = cy + edge * height * (.035 + depth * .36);
        if (step === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(245,242,234,.3)'; ctx.stroke();
    }
    const cards = Array.from({ length:44 }, (_, index) => ({ index, z:(index / 44 + progress) % 1 })).sort((a, b) => a.z - b.z);
    cards.forEach(({ index, z }) => {
      if (z < .05) return;
      const depth = Math.pow(z, 1.78); const side = index % 3 === 0 ? -1 : 1;
      const bend = Math.sin((z + progress) * Math.PI * 2) * width * .11;
      const cardW = Math.max(24, width * (.026 + depth * .16)); const cardH = cardW * (1 + (index % 3) * .12);
      const x = cx + bend + side * width * (.06 + depth * .31) - cardW * .5;
      const y = cy + Math.sin(index * 2.1) * height * (.08 + depth * .2) - cardH * .5;
      ctx.save(); ctx.translate(x + cardW / 2, y + cardH / 2); ctx.rotate(side * (.11 - depth * .08) + Math.sin(index * 4) * .025); ctx.translate(-cardW / 2, -cardH / 2);
      ctx.fillStyle = '#f5f2ea'; ctx.fillRect(-4, -4, cardW + 8, cardH + 8);
      drawImageCover(images[index % images.length], 0, 0, cardW, cardH);
      ctx.strokeStyle = index % 9 === 0 ? '#ec633d' : '#10100f'; ctx.lineWidth = Math.max(1, cardW * .012); ctx.strokeRect(0, 0, cardW, cardH);
      ctx.restore();
    });
    requestAnimationFrame(render);
  };
  root.addEventListener('pointermove', (event) => { const rect = root.getBoundingClientRect(); pointer.x = (event.clientX - rect.left) / rect.width - .5; pointer.y = (event.clientY - rect.top) / rect.height - .5; }, { passive:true });
  addEventListener('resize', resize, { passive:true });
  resize(); requestAnimationFrame(render);
}

const nextLink = document.querySelector('#case-next');
nextLink.href = `./case-study.html?project=${nextId}`;
nextLink.querySelector('strong').textContent = next.title;
window.addEventListener('scroll', () => document.documentElement.style.setProperty('--case-progress', String(Math.min(1,scrollY / Math.max(1,document.body.scrollHeight - innerHeight)))), { passive:true });

class BirdField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.birds = [];
    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.resize();
    addEventListener('resize', this.resize, { passive:true });
    requestAnimationFrame(this.render);
  }
  resize() {
    const bounds = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, bounds.width);
    this.height = Math.max(1, bounds.height);
    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.birds = Array.from({ length:52 }, (_, index) => this.makeBird(index, true));
  }
  makeBird(index, randomX = false) {
    return { x: randomX ? Math.random() * this.width : -40 - Math.random() * 220, y: this.height * (.1 + Math.random() * .65), size:2.2 + Math.random() * 4.5, speed:.22 + Math.random() * .55, flap:Math.random() * Math.PI * 2, flapSpeed:.07 + Math.random() * .12, drift:Math.random() * 5000, turn:Math.random() * 5000, orange:index % 5 === 0, opacity:.4 + Math.random() * .48 };
  }
  drawBird(bird, time) {
    const ctx = this.ctx;
    const wing = Math.sin(bird.flap) * bird.size * .95;
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(Math.sin(time * .00012 + bird.turn) * .28);
    ctx.strokeStyle = bird.orange ? `rgba(236,99,61,${bird.opacity})` : `rgba(17,17,15,${bird.opacity})`;
    ctx.lineWidth = bird.orange ? 1.35 : 1.1;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-bird.size, wing);
    ctx.lineTo(0, 0);
    ctx.lineTo(bird.size, wing);
    ctx.stroke();
    ctx.restore();
  }
  render(time) {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    ctx.clearRect(0,0,this.width,this.height);
    this.birds.forEach((bird, index) => {
      bird.flap += bird.flapSpeed;
      bird.x += bird.speed;
      bird.y += Math.sin(time * .0006 + bird.drift) * .22;
      if (bird.x > this.width + 40) this.birds[index] = this.makeBird(index);
      this.drawBird(this.birds[index], time);
    });
    requestAnimationFrame(this.render);
  }
}
const birdCanvas = document.querySelector('#case-birds');
if (birdCanvas) new BirdField(birdCanvas);
