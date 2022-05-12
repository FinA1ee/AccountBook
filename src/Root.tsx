import React from 'react';
import App from './App';
import { Provider } from 'react-redux';

import store from './features/models';
import { createDvaStore } from './createDvaStore';

const dvaStore = createDvaStore(store);

const Container = () => {
  return (
    <Provider store={dvaStore}>
      <App />
    </Provider>
  );
};

export default Container;
