/**
 * local数据存储管理的工具模块
 */
import store from 'store'
const KEY = 'token'
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // 1. 保存user
  saveToken (user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(KEY, user)
  },
  // 2. 读取user
  getToken () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(KEY) || {}
  },
  // 3. 删除user
  removeToken () {
    // localStorage.removeItem(USER_KEY)
    store.remove(KEY)
  }
}