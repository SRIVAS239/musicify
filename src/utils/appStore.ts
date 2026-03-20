import { configureStore } from '@reduxjs/toolkit';
import queueReducer from '../store/queueSlice';
import searchReducer from '../store/searchSlice';
import authReducer from '../store/authSlice';
import  playerReducer from '../store/playerSlice';

const appStore = configureStore({
  reducer: {
    queue: queueReducer,
    search: searchReducer,
    auth: authReducer,
    player: playerReducer
  }
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
