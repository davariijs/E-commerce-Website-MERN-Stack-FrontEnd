import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

interface UserState {
    uid: string | null,
    email: string | null,
    name: string | null,
}

// Define initial state
const initialState: UserState = {
    uid: null,
    email: null,
    name: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action:PayloadAction<UserState>) {
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
export const selectUser = (state:RootState) => state.user;

export default userSlice.reducer;