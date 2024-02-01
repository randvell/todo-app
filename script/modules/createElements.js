import { getPriorityClass } from './helper.js';

const createElement = ({ tag, className, value }) => {
  const el = document.createElement(tag);

  if (className) {
    className.split(/\s+/).forEach((currentClass) => {
      el.classList.add(currentClass);
    });
  }

  if (value) {
    el.innerHTML = value;
  }

  return el;
};

const createHeader = () => createElement({ tag: 'h3', value: 'Todo App' });

const createButton = (props) => {
  props.tag = 'button';
  const button = createElement(props);
  const { type } = props;
  if (type) {
    button.type = type;
  }

  return button;
};

const createPrioritySelect = () => {
  const container = createElement({ tag: 'div' });
  const selectElement = createElement({
    tag: 'select',
    className: 'form-select',
  });
  selectElement.name = 'priority';

  const options = ['normal', 'important', 'urgent'];
  const optionLabels = ['Обычная', 'Важная', 'Срочная'];

  options.forEach((option, i) => {
    const optionElement = createElement({ tag: 'option' });
    optionElement.value = option;
    optionElement.textContent = optionLabels[i];
    selectElement.appendChild(optionElement);
  });

  const labelElement = createElement({ tag: 'label' });
  labelElement.textContent = 'Приоритет:';
  container.append(labelElement, selectElement);

  return container;
};

const createForm = (props) => {
  const form = createElement({
    tag: 'form',
    className: 'd-flex align-items-end mb-3 gap-2',
  });

  const inputLabel = createElement({
    tag: 'label',
    className: 'form-group me-3 mb-0',
  });

  const formInput = createElement({ tag: 'input', className: 'form-control' });
  formInput.name = 'name';
  formInput.type = 'text';
  formInput.placeholder = 'ввести задачу';
  inputLabel.append(formInput);

  const prioritySelect = createPrioritySelect();

  const submitButton = createButton({
    type: 'submit',
    className: 'btn btn-primary me-3',
    value: 'Сохранить',
  });
  submitButton.dataset.action = 'add_task';
  submitButton.disabled = true;

  const resetButton = createButton({
    type: 'reset',
    className: 'btn btn-warning',
    value: 'Очистить',
  });

  form.append(inputLabel, prioritySelect, submitButton, resetButton);

  form.submitBtn = submitButton;
  form.resetBtn = resetButton;

  return form;
};

const createTableRow = (props) => createElement({ ...props, tag: 'tr' });

const createTableColumn = (props) => createElement({ ...props, tag: 'td' });

const createTableBody = (props) => createElement({ ...props, tag: 'tbody' });

const createTableHead = () => {
  const tableHeadColumns = ['№', 'Задача', 'Статус', 'Действия'];
  const thead = document.createElement('thead');
  const headTableRow = createTableRow({ className: 'fw-bold' });
  tableHeadColumns.forEach((columnValue) => {
    headTableRow.append(createTableColumn({ tag: 'th', value: columnValue }));
  });

  thead.append(headTableRow);
  return thead;
};

const createTable = () => {
  const table = createElement({
    tag: 'table',
    className: 'table table-hover table-bordered',
  });

  const tbody = createTableBody();
  table.body = tbody;

  table.append(createTableHead(), tbody);

  return table;
};

const getCurrentTasksCount = () => document.querySelectorAll('.task').length;

const createTask = (taskData) => {
  const idColumn = createTableColumn({ value: getCurrentTasksCount() + 1 });

  const { id, finished, name, priority } = taskData;
  const taskColumn = createTableColumn({
    value: name,
    className: 'task' + (finished ? ' text-decoration-line-through' : ''),
  });

  const saveButton = createButton({
    className: 'btn btn-success d-none',
    value: 'Сохранить',
  });
  saveButton.dataset.action = 'save';

  const editButton = createButton({
    className: 'btn btn-info',
    value: 'Редактировать',
  });
  editButton.dataset.action = 'edit';

  const deleteButton = createButton({
    className: 'btn btn-danger',
    value: 'Удалить',
  });
  deleteButton.dataset.action = 'delete';

  const finishButton = createButton({
    className: 'btn btn-success',
    value: 'Завершить',
  });
  finishButton.dataset.action = 'finish';

  const controlColumn = createTableColumn({
    className: 'd-flex gap-2 justify-content-end',
  });
  controlColumn.append(saveButton, editButton, deleteButton, finishButton);

  const statusColumn = createTableColumn({
    value: finished ? 'Выполнена' : 'В процессе',
    className: 'status',
  });

  const taskRow = createTableRow({
    className: finished ? 'table-success' : getPriorityClass(priority),
  });

  taskRow.dataset.taskId = id;
  taskRow.append(idColumn, taskColumn, statusColumn, controlColumn);
  taskRow.editButton = editButton;
  taskRow.saveButton = saveButton;
  taskRow.deleteButton = deleteButton;
  taskRow.finishButton = finishButton;

  return taskRow;
};

export {
  createElement,
  createHeader,
  createForm,
  createTable,
  createTableRow,
  createTableColumn,
  createTask,
};
