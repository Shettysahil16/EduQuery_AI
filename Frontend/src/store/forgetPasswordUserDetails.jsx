import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails : null,
}

export const forgetUserDetails = createSlice({
    name : 'userDetails',
    initialState,
    reducers : {
        setForgetUserDetails : (state, action) => {
            state.forgetUserDetails = action.payload
        }
    }
})

export const { setForgetUserDetails } = forgetUserDetails.actions;

export const userDetails = (state) => state.userDetails.userDetails

export default forgetUserDetails.reducer;

