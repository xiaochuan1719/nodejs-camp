import axios from "axios";
import Vue from "vue";
import router from './router'

const http = axios.create({
  baseURL: "http://127.0.0.1:3050/admin/api"
});

// Add a request interceptor
http.interceptors.request.use(config => {
    // Do something before request is sent
    // 请求头加入 token 
    localStorage._token && (config.headers.Authorization = 'Bearer ' + localStorage._token)
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.data.message) {  
      Vue.prototype.$message({
        type: "error",
        message: error.response.data.message
      });

      if (error.response.status === 401) {
        router.push('/login')
      }
      
    }
    return Promise.reject(error);
  }
);

export default http;
