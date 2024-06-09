// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
// Importez d'autres reducers ici

const rootReducer = combineReducers({
  user: userReducer,
  // Ajoutez d'autres reducers ici
});

export default rootReducer;
