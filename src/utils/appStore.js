import {configureStore} from '@reduxjs/toolkit';
import queueReducer from '../store/queueSlice';
import searchReducer from '../store/searchSlice';

const appStore = configureStore({
    reducer: {
        queue: queueReducer,
        search: searchReducer
    }
});

export default appStore;