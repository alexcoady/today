export const isFetching = ACTION => (state = false, action) => {

  switch (action.type) {
    case `${ACTION}_PENDING`:
      return true;
    case `${ACTION}_FULFILLED`:
    case `${ACTION}_REJECTED`:
      return false;
  }

  return state;
};

export const hasFetched = ACTION => (state = false, action) => {

  switch (action.type) {
    case `${ACTION}_FULFILLED`:
      return true;
  }

  return state;
};
