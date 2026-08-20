const films = {
  1: { title:'既成态', subtitle:'VR SCIENCE INTERACTION / PROJECT FILM 01', source:'https://pub-3e8e8a8073094e69a19dcfcc4e000ea1.r2.dev/1.mp4' },
  2: { title:'星洄', subtitle:'AI GESTURE + VOICE / PROJECT FILM 02', source:'https://pub-3e8e8a8073094e69a19dcfcc4e000ea1.r2.dev/2.mp4' },
  3: { title:'脉合五境', subtitle:'AIGC + EEG INTERACTION / PROJECT FILM 03', source:'https://pub-3e8e8a8073094e69a19dcfcc4e000ea1.r2.dev/3.mp4' },
  4: { title:'洄声', subtitle:'AR INTERACTION / PROJECT FILM 04', source:'https://pub-3e8e8a8073094e69a19dcfcc4e000ea1.r2.dev/4.mp4' },
};
const requestedProject = new URLSearchParams(location.search).get('project');
const projectId = films[requestedProject] ? requestedProject : '1';
const film = films[projectId];
const player = document.querySelector('#film-player');
const loading = document.querySelector('#film-loading');
document.title = `H/F — ${film.title} / Project Film`;
document.querySelector('#film-title').textContent = film.title;
document.querySelector('#film-subtitle').textContent = film.subtitle;
document.querySelector('#film-index').textContent = `${projectId.padStart(2,'0')} / 04`;
document.querySelector('#film-back').href = `./index.html#project-${projectId.padStart(2,'0')}`;
document.querySelector('#film-case').href = `./case-study.html?project=${projectId}`;
player.src = film.source;
player.addEventListener('loadeddata', () => loading.classList.add('is-ready'), { once:true });
player.addEventListener('error', () => { loading.textContent = 'VIDEO SOURCE UNAVAILABLE / PLEASE CHECK COS HEADERS'; });
