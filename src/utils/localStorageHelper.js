export const setList = item => {
  let list = getList();
  window.localStorage.setItem('list', JSON.stringify([...list, item]));
}

export const updateList = list => {
  removeList();
  window.localStorage.setItem('list', JSON.stringify(list));
}

export const getList = () => {
  const list = JSON.parse(window.localStorage.getItem('list'));
  return list || [];
};

export const removeList = () => {
  window.localStorage.removeItem('list');
}