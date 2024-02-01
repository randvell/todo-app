import {
  createElement,
  createHeader,
  createForm,
  createTable,
  createTask,
} from './createElements.js';

import { formControl, tableControl } from './control.js';
import { loadUserTasks } from './storage.js';

const renderUserTasks = (tableBody, userTasks) => {
  userTasks.forEach((task) => {
    const taskRow = createTask(task);
    tableBody.append(taskRow);
  });
};

const todoApp = (container, user) => {
  const userTasks = loadUserTasks(user);
  container.className =
    // eslint-disable-next-line max-len
    'app-container vh-100 w-100 d-flex align-items-center justify-content-center flex-column';

  const header = createHeader();
  const form = createForm();
  const table = createTable();
  const tableWrapper = createElement({
    tag: 'div',
    className: 'table-wrapper',
  });

  renderUserTasks(table.body, userTasks);
  tableWrapper.append(table);
  container.append(header, form, tableWrapper);

  formControl(form, table.body, user);
  tableControl(table, user);
};

export default todoApp;
