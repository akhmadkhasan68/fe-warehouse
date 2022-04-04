import axios from "axios";

const $axios = axios.create({
   baseURL: "http://127.0.0.1:8000/",
   headers: {
      'Content-Type': 'application/json'
   },
})

$axios.interceptors.request.use(function (config) {
   return config
}, function (error) {
   return Promise.reject(error)
})

$axios.interceptors.response.use(function (response) {
   return response
}, function (error) {
   if(typeof error.response.data !== "undefined"){
      let messages = [];
      Object.entries(error.response.data.errors).map(fields => {
         fields[1].map(message => {
            messages.push(message)
         })
      });

      return Promise.reject(messages)
   }else{
      return Promise.reject(error)
   }
})

export default $axios