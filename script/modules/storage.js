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
    name: task.name,
    finished: task.finished,
    severity: task.severity,
  };

  tasks.push(preparedTask);
  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const deleteTaskFromStorage = (task) => {
  const tasks = loadUserTasks(window.appUser);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name === task) {
      tasks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem(`tasks_${window.appUser}`, JSON.stringify(tasks));
};

const setTaskComplete = (task) => {
  const tasks = loadUserTasks(window.appUser);

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name === task) {
      tasks[i].finished = true;
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
};
