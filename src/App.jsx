// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import AppRouter from './routes/AppRouter';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <AppRouter />
    </Provider>
  );
}

export default App;
