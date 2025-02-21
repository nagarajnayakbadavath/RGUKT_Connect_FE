import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import requestsReducer from './requestsSlice';

const appStore=configureStore({
    reducer:{
        user:userReducer,
        requests:requestsReducer,
    }
});

export default appStore;


