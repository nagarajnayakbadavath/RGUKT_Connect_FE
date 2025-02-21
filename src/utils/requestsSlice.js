import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: [],
    reducers: {
        setRequests: (state, action) => {
            return action.payload;
        },
        addRequest: (state, action) => {
            state.push(action.payload); // Add a single request to the array
        },
        removeRequest: (state, action) => {
            return state.filter(request => request.id !== action.payload);
        }
    }
});

export const { addRequest, removeRequest,setRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
