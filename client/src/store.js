import { configureStore } from '@reduxjs/toolkit'
import postModelSlice from "./features/postModelSlice";
import modelsSlice from "./features/modelsSlice";
import userListSlice from './features/userListSlice';

export const store = configureStore({
  reducer: {
    postModel:postModelSlice,
    models:modelsSlice,
    userList:userListSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})