import { createSlice } from '@reduxjs/toolkit'

export const createArticleSlice = createSlice({
    name: 'createArticle',
    initialState: {
        title: "",
        subTitle: "",
        mainTxt: "",
        tags: [],
        originalLink: ""
    },
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload
        },
        updateSubTitle: (state, action) => {
            state.subTitle = action.payload
        },
        updateMainTxt: (state, action) => {
            state.mainTxt = action.payload
        },
        updateTags: (state, action) => {
            state.tags = state.tags.concat(action.payload)
        },
        updateOriginalLink: (state, action) => {
            state.originalLink = action.payload
        },
    }
})

export const { updateTitle, updateSubTitle, updateMainTxt, updateTags, updateOriginalLink } = createArticleSlice.actions
export const createArticlesActions = createArticleSlice.actions;
export default createArticleSlice.reducer