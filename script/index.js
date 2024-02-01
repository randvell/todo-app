import { initUser } from './modules/control.js';
import todoApp from './modules/render.js';

{
  const init = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    const user = initUser();
    if (!user) {
      return;
    }

    todoApp(container, user);
  };

  window.appInit = init;
}

document.addEventListener('DOMContentLoaded', () => {
  window.appInit('.app-container');
});
