import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSortedUsers : []
}

export const allUsersSlice = createSlice({
    name : 'allUsers',
    initialState,
    reducers : {
        setAllSortedUsers : (state, action) => {
            state.allSortedUsers = action.payload
        }
    }
})

export const { setAllSortedUsers } = allUsersSlice.actions;

export const allSortedUsers = (state) => state.allSortedUsers.allSortedUsers

export default allUsersSlice.reducer;