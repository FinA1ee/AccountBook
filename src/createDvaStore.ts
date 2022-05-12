import { create } from 'dva-core';

export function createDvaStore(model, options = {}, createOptions = {}) {
  const app = create(createOptions);

  const isArray = Array.isArray(model);
  if (isArray) {
    model.map(app.model);
  } else {
    app.model(model);
  }

  app.start();
  const store = app._store;

  return store;
}
