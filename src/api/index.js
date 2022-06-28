import axios from 'axios'
import { BACKLINK } from '../constants/backend';

const _api = axios.create({
  //TODO: must be general link
  baseURL: process.env.REACT_APP_GENERAL_BACK_POINT || BACKLINK
})

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJVc2VybmFtZSI6InR3ZWVrZXIiLCJuYmYiOjE2NTUwNjc3NDEsImV4cCI6MTY1NTEzNzI4MSwiaWF0IjoxNjU1MDY3NzQxfQ.ZJgGDgvOMaNTbL08b45eMveIvhtVFIXUfUHPQqHrn1c';

//TODO: token must be saved in storage
_api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem(token) || token}`,
  }
  return config;
});

export const api = {
  createArticles: async (articles) => {

  },
  getArticles: async () => {
    _api.get('/v1/articles?code=ua&page=1&perPage=20').then(res => res.data)
  },
  getNews: async () => {
    _api.get('/v1/news?Page=1&PerPage=3').then(res => res.data)
  }
}