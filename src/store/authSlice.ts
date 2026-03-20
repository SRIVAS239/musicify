import {createSlice} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/redux";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        expiresAt: null,
        scope: null,
        tokenType: null,
    } as AuthState,
    reducers: { 
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.accessToken = action.payload.accessToken;
            state.expiresAt = action.payload.expiresAt;
            state.scope = action.payload.scope;
            state.tokenType = action.payload.tokenType;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.expiresAt = null;
            state.scope = null;
            state.tokenType = null;
        }
    }

})

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;