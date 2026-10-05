import './ui/styles.css';
import { App } from './app/App';

function boot(): void {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const ui = document.getElementById('ui-root') as HTMLElement;
  const gl = document.createElement('canvas').getContext('webgl2');
  if (!gl) {
    ui.innerHTML = '<div class="loading"><h1>WebGL 2 недоступен</h1><div class="tip">Обновите браузер или включите аппаратное ускорение.</div></div>';
    return;
  }
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    ui.insertAdjacentHTML('beforeend', '<div class="loading"><h1>Графический контекст потерян</h1><div class="tip">Прогресс сохранён. Перезагрузите страницу.</div></div>');
  });
  const app = new App(canvas, ui);
  app.start();
  (window as unknown as { __app: App }).__app = app;
}

boot();
