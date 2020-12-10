/**
 * 发送异步请求的模块
 * 1. 统一处理请求异常
 * 2. 异步直接得到data
 */
import config from '../config/config'
import axios from 'axios'
import localStore from '../utils/localStore'
import { message } from 'antd'
let token = localStore.getToken()
axios.defaults.headers.Accept = 'application/vnd.github.v3 + json'
if (typeof token === "string") {
  axios({
    headers: {
      'Authorization': 'Token ' + token
    },
    method: 'get',
    url: 'https://api.github.com/user',
  }).then(result => {
    axios.defaults.headers = { Authorization: 'Token ' + token }
  }).catch(() => {
    axios.defaults.headers = { Authorization: 'Token ' + config.Token }
  })
} else {
  axios.defaults.headers = { Authorization: 'Token ' + config.Token }
}

// axios.defaults.headers = { Authorization: 'Token ' + config.Token }
axios.defaults.baseURL = `https://api.github.com`;


export default function ajax (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 1. 执行异步请求
    if (method === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else if (method === 'POST') {
      promise = axios.post(url, data)
    } else if (method === 'DELETE') {
      promise = axios.delete(url)
    } else if (method === 'PATCH') {
      promise = axios.patch(url, data)
    }
    promise
      .then(response => {
        // 2. 成功调用resolve
        resolve(response.data)
      })
      .catch(error => {
        console.log(error.message);
        // 3. 失败不调用reject，而是提示异常信息 
        message.error("请求出错了：" + error.message);
      })
  })
};