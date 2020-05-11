export const convertTimestampsToDate = (timestamps) => {
  let date = new Date(parseInt(timestamps));
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
