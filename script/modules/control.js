import { createTask } from './createElements.js';
import {
  deleteTaskFromStorage,
  setTaskComplete,
  saveTaskToStorage,
} from './storage.js';

const formControl = (form, tableBody) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData);
    task.finished = false;
    task.severity = 'light';

    tableBody.append(createTask(task));
    saveTaskToStorage(task);

    form.reset();
  });
};

const markTaskComplete = (task, taskElem) => {
  setTaskComplete(task);
  taskElem.className = 'task text-decoration-line-through';
  taskElem.parentNode.className = 'table-success';
  taskElem.parentNode.querySelector('.status').innerText = 'Выполнена';
};

const tableControl = (table) => {
  table.addEventListener('click', (e) => {
    const target = e.target;

    const taskElem = target.parentNode?.parentNode?.querySelector('.task');
    if (!taskElem) {
      return;
    }

    const task = taskElem.innerText;
    if (target.dataset.action === 'delete') {
      deleteTaskFromStorage(task);
      taskElem.parentNode.remove();
      return;
    }

    if (target.dataset.action === 'finish') {
      markTaskComplete(task, taskElem);
      return;
    }
  });
};

export { formControl, tableControl };
