import {configureStore} from '@reduxjs/toolkit'
import createArticleSlice from "./createArticleSlice";
import {createArticlePlugSlice} from "./plugArticleSlice";


export default configureStore({
    reducer: {
        articleReducer: createArticleSlice,
        plugArticleReducer: createArticlePlugSlice
    }
})