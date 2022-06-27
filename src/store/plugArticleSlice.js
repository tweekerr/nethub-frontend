import { createSlice } from '@reduxjs/toolkit'

export const createArticlePlugSlice = createSlice({
    name: 'plugArticleId',
    initialState: {
        plugArticleId: 0
    },
    reducers: {
        updateArticleId: (state, action) => {
            state.plugArticleId = action.payload
        },

    }
})

export const {updateArticleId} = createArticlePlugSlice.actions

export default createArticlePlugSlice.reducer