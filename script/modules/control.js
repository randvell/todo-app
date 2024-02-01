import { createTask } from './createElements.js';
import {
  deleteTaskFromStorage,
  setTaskComplete,
  saveTaskToStorage,
  updateTaskName,
} from './storage.js';

const handleFormSubmit = (form, tableBody) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = Object.fromEntries(formData);
    task.id = Math.random().toString().substring(2, 10);
    task.finished = false;

    tableBody.append(createTask(task));
    saveTaskToStorage(task);

    form.reset();
  });
};

const emptyInputProtection = (form) => {
  const taskElem = form.elements['name'];
  taskElem.addEventListener('input', () => {
    if (taskElem.value.trim() !== '') {
      form.submitBtn.disabled = false;
    } else {
      form.submitBtn.disabled = true;
    }
  });

  form.resetBtn.addEventListener('click', () => {
    form.submitBtn.disabled = true;
  });
};

const formControl = (form, tableBody) => {
  handleFormSubmit(form, tableBody);
  emptyInputProtection(form);
};

const renumberRows = (tableBody) => {
  tableBody.querySelectorAll('tr').forEach((el, i) => {
    el.querySelector('td').innerText = i + 1;
  });
};

const markTaskComplete = (taskElem) => {
  setTaskComplete(taskElem.parentNode.dataset.taskId);
  taskElem.className = 'task text-decoration-line-through';
  taskElem.parentNode.className = 'table-success';
  taskElem.parentNode.querySelector('.status').innerText = 'Выполнена';
};

const makeTaskEditable = (taskElem) => {
  taskElem.contentEditable = true;
  taskElem.parentNode.editButton.classList.toggle('d-none');
  taskElem.parentNode.saveButton.classList.toggle('d-none');
};

const saveTaskAfterEdit = (taskElem) => {
  taskElem.contentEditable = false;
  taskElem.parentNode.editButton.classList.toggle('d-none');
  taskElem.parentNode.saveButton.classList.toggle('d-none');
  updateTaskName(taskElem.parentNode.dataset.taskId, taskElem.innerText);
};

const controlTask = (table) => {
  table.addEventListener('click', (e) => {
    const target = e.target;

    const taskElem = target.parentNode?.parentNode?.querySelector('.task');
    if (!taskElem) {
      return;
    }

    const task = taskElem.innerText;
    if (target.dataset.action === 'delete') {
      if (confirm(`Вы точно хотите удалить задачу ${task}?`)) {
        deleteTaskFromStorage(taskElem.parentNode.dataset.taskId);
        taskElem.parentNode.remove();
        renumberRows(table.body);
      }

      return;
    }

    if (target.dataset.action === 'finish') {
      markTaskComplete(taskElem);
      return;
    }

    if (target.dataset.action === 'edit') {
      makeTaskEditable(taskElem);
      return;
    }

    if (target.dataset.action === 'save') {
      saveTaskAfterEdit(taskElem);
      return;
    }
  });
};

const tableControl = (table) => {
  controlTask(table);
};

const initUser = () => {
  const user = prompt('Введите имя пользователя');
  if (user === null) {
    if (confirm('Вы хотите выйти?')) {
      return;
    }

    return initUser();
  }

  if (user === '') {
    alert('Некорректный ввод');
    return initUser();
  }

  return user;
};

export { formControl, tableControl, initUser, renumberRows };
