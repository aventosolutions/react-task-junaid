import moment from "moment";

export const stringSorting = (a, b, dataIndex) => {
  return a[dataIndex].localeCompare(b[dataIndex]);
};

export const numberSorting = (a, b, dataIndex) => {
  return a[dataIndex] - b[dataIndex];
};

export const dateSorting = (a, b, dataIndex) => {
  const d1 = moment([2007, 0, 29]);
  const d2 = moment([2007, 0, 28]);
  return d1.diff(d2);
};
