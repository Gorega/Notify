import { configureStore } from '@reduxjs/toolkit'
import createModalSlice from "./features/createModalSlice";
import displaySlice from "./features/displaySlice";
import userListSlice from './features/userListSlice';

export const store = configureStore({
  reducer: {
    createModal:createModalSlice,
    display:displaySlice,
    userList:userListSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})