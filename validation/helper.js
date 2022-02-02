// create right error format
// of joi errors
export const getFormattedError = (error) => {
  let errors = {};

  // if error object is undefined
  if (error === undefined) {
    return errors;
  }

  error.details.forEach((err) => {
    errors = {
      ...errors,
      [err.context.key]: err.message,
    };
  });

  // return error new format
  return errors;
};

// check whether a object is empty or not
export const isEmptyObject = (obj) => {
  // if object is undefined
  if (obj === undefined) {
    return true;
  }

  // check object has any key or not
  return Object.keys(obj).length === 0;
};
