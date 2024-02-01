const loadUserTasks = (user) => {
  window.appUser = user;
  const tasksData = localStorage.getItem(`tasks_${user}`);
  if (!tasksData) {
    return [];
  }
  try {
    return JSON.parse(tasksData) || [];
  } catch (error) {
    console.error('Ошибка при загрузке из Local Storage');
    return [];
  }
};

const saveTaskToStorage = (task) => {
  const tasks = loadUserTasks(window.appUser);
  const preparedTask = {
    id: task.id,
    name: task.name,
    finished: task.finished,
    priority: task.priority,
  };

  tasks.push(preparedTask);
  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const deleteTaskFromStorage = (taskId) => {
  const tasks = loadUserTasks(window.appUser);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const setTaskComplete = (taskId) => {
  const tasks = loadUserTasks(window.appUser);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].finished = true;
      break;
    }
  }

  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const updateTaskName = (taskId, newName) => {
  const tasks = loadUserTasks(window.appUser);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].name = newName;
      break;
    }
  }

  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const getUserTasksCount = () => loadUserTasks().length;

export {
  loadUserTasks,
  saveTaskToStorage,
  deleteTaskFromStorage,
  getUserTasksCount,
  setTaskComplete,
  updateTaskName,
};
