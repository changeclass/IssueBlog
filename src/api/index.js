/**
 * 包含应用中所有接口请求的函数的模块
 * 每个函数的返回值都是Promise
 */
import ajax from './ajax'
import config from '../config/config'

const BASE = `/repos/${config.owner}/${config.repo}`
// 获取所有Issue
export const reqGetIssues = (page) => ajax(BASE + '/issues', { page, per_page: config.post.page_size, creator: config.owner, state: "open" })
// 获取单个Issue
export const reqGetIssueBody = (number) => ajax(BASE + `/issues/${number}`)
// 将markdown转为HTML
export const reqMKtoHTML = (text) => ajax(`/markdown`, { text }, 'POST')
// 获取评论列表
export const reqGetCommentList = (number, page) => ajax(BASE + `/issues/${number}/comments`, { page, per_page: config.comment.page_size, }, "GET")
// 发表评论
export const reqSendComment = (number, body) => ajax(BASE + `/issues/${number}/comments`, { body }, 'POST')
// 获取所有labels (前100个)
export const reqGetAllLabels = () => ajax(BASE + '/labels')