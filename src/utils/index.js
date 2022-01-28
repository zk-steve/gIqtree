export const getFileExtension = (file) => {
  const array = file.split(".");
  return `.${array[array.length - 1]}`;
};
