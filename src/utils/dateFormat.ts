const dateFormat = (dateVal: Date) => {
  const date = new Date(dateVal);
  return date.toLocaleDateString(undefined, {
    dateStyle: "long",
  });
};

export default dateFormat;
