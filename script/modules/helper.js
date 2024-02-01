export const getPriorityClass = (priority) => {
  switch (priority) {
    case 'important':
      return 'table-danger';
    case 'urgent':
      return 'table-warning';
    default:
      return 'table-light';
  }
};
