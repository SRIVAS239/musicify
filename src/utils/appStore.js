import {configureStore} from '@reduxjs/toolkit';
import queueReducer from '../store/queueSlice';

const appStore = configureStore({
    reducer: {
        queue: queueReducer
    }
});

export default appStore;