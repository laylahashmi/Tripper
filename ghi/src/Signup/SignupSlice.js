import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    },
    errorMessage: null
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {

        error: (state, action) => {
            state.errorMessage = action.payload
        },
        handleFirstNameChange: (state, action) => {
            state.fields.firstName = action.payload
        },
        handleLastNameChange: (state, action) => {
            state.fields.lastName = action.payload
        },
        handleUsernameChange: (state, action) => {
            state.fields.username = action.payload
        },
        handleEmailChange: (state, action) => {
            state.fields.email = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        handlePasswordConfirmationChange: (state, action) => {
            state.fields.passwordConfirmation = action.payload
        },
        reset: () => initialState,
    }
});

export const {
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    reset,
    error
} = signupSlice.actions;

export default signupSlice.reducer