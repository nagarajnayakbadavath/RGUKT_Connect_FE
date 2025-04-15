import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import requestsReducer from './requestsSlice';
import carouselReducer from './carouselSlice';

const appStore=configureStore({
    reducer:{
        user:userReducer,
        requests:requestsReducer,
        carousel: carouselReducer,
    }
});

export default appStore;


