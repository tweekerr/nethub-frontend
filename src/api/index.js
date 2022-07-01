import axios from 'axios'
import {BACKLINK} from '../constants/backend';

const _api = axios.create({
    //TODO: must be general link
    baseURL: process.env.REACT_APP_GENERAL_BACK_POINT || ' https://nethub.loca.lt/v1'
})

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJVc2VybmFtZSI6InR3ZWVrZXIiLCJuYmYiOjE2NTY2ODIwNTcsImV4cCI6MTY1Njc1MTU5NywiaWF0IjoxNjU2NjgyMDU3fQ.9t007ZJe8p9Xtfg7mCKLJov460_x8Xa7z7SVSViTfsU';

//TODO: token must be saved in storage
_api.interceptors.request.use((config) => {
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem(token) || token}`,
    }
    return config;
});

// _api.interceptors.response.use((config) => {
//     return config;
// }, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_GENERAL_BACK_POINT || BACKLINK}/user/refresh-tokens`,)
//             console.log('response', response);
//             localStorage.setItem('token', response.data.accessToken);
//             return _api.request(originalRequest);
//         } catch (e) {
//             console.log('НЕ АВТОРИЗОВАНИЙ')
//         }
//     }
//     throw error;
// })

export const api = {
    createArticles: async (articles) => {
    },
    getArticles: async () => {
        return _api.get('/articles?code=ua&page=1&perPage=20').then(res => res.data)
    },
    getNews: async () => {
        return _api.get('/news?Page=1&PerPage=3').then(res => res.data)
    }
}