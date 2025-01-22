import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: null,
        email: null,
        name: null,
    },
    reducers: {
        setUser(state, action) {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        clearUser(state) {
            state.uid = null;
            state.email = null;
            state.name = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user;

export default userSlice.reducer;