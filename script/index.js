import todoApp from './modules/render.js';

{
  const init = (containerSelector) => {
    const container = document.querySelector(containerSelector);

    const askUser = () => {
      const user = prompt('Введите имя пользователя');
      if (user === null) {
        if (confirm('Вы хотите выйти?')) {
          return;
        }

        return askUser();
      }
      if (user === '') {
        alert('Некорректный ввод');
        return askUser();
      }

      return user;
    };

    //const user = askUser();
    const user = 123;
    if (!user) {
      return;
      // todo: app fail ?
    }

    todoApp(container, user);
  };

  window.appInit = init;
}

document.addEventListener('DOMContentLoaded', () => {
  window.appInit('.app-container');
});
