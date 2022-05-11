import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import models from 'src/features/models';

const app = create();
app.start();

if (Array.isArray(models)) {
  models.forEach(model => {
    app.model(model);
  });
}
const store = app._store;

const Container = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Container;
