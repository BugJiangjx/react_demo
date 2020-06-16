const clientMiddleware = api => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action({ api, dispatch, getState });
  }

  return next(action);
};

export default clientMiddleware;
