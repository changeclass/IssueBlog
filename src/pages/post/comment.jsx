import React, { useState, useEffect } from 'react'
import {
  Tooltip,
  List,
  Comment,
  Pagination,
  Form,
  Input,
  Button,
  Avatar,
  Skeleton
} from 'antd'
import moment from 'moment'
import config from '../../config/config'
import { reqGetCommentList, reqSendComment } from '../../api'
import localStore from '../../utils/localStore'
import Auth from '../auth/auth'
import Axios from 'axios'
import marked from 'marked'
const { TextArea } = Input
const Editor = ({ onChange, onSubmit, submitting, value, user }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      {!user.login ? (
        <Auth />
      ) : (
        <Button
          htmlType='submit'
          loading={submitting}
          onClick={onSubmit}
          type='primary'
        >
          Add Comment
        </Button>
      )}
    </Form.Item>
  </>
)

export default function Comments(props) {
  let { number, total = 0 } = props
  // 获取评论列表
  const [commentList, setCommentList] = useState([])
  // 当前页码
  const [page, setPage] = useState(1)
  // 是否发表中
  const [submitting, setSubmitting] = useState(false)
  // 发表的内容
  const [value, setValue] = useState('')
  // 存放用户
  const [user, setUser] = useState({})
  // 获取状态
  const [loading, setLoading] = useState(false)
  // 获取评论
  const getComment = async (number, page) => {
    setLoading(true)
    const result = await reqGetCommentList(number, page)
    // 临时存放评论
    const t_commentList = []
    result.forEach((item) => {
      t_commentList.push({
        author: item.user.login,
        avatar: item.user.avatar_url,
        content: marked(item.body),
        datetime: (
          <Tooltip
            title={moment(new Date(item.created_at), 'days').format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          >
            <span>{moment(new Date(item.created_at), 'days').fromNow()}</span>
          </Tooltip>
        )
      })
    })
    setCommentList(t_commentList)
    setLoading(false)
  }
  // 提交事件
  const handleSubmit = async () => {
    setSubmitting(true)
    const result = await reqSendComment(number, value)
    setSubmitting(false)
    total++
    getComment(number, 1)
  }
  // 输入框改变
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  useEffect(() => {
    const token = localStore.getToken()
    console.log(typeof token)
    if (typeof token === 'string') {
      Axios({
        headers: {
          Authorization: 'Token ' + token
        },
        method: 'get',
        url: 'https://api.github.com/user'
      }).then((result) => {
        setUser(result.data)
      })
    }

    getComment(number, page)
  }, [])

  return (
    <div>
      <Comment
        avatar={
          <Avatar
            src={
              !user.login
                ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                : user.avatar_url
            }
            alt={!user.login ? '' : user.name}
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            user={user}
          />
        }
      />
      <Skeleton loading={loading}>
        <List
          className='comment-list'
          header={`共 ${total} 评论`}
          itemLayout='horizontal'
          dataSource={commentList}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={
                  <div>
                    <div
                      className='markdown-body'
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  </div>
                }
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </Skeleton>
      {total > 0 ? (
        <Pagination
          defaultCurrent={1}
          total={total}
          pageSize={config.comment.page_size}
          onChange={(page, pageSize) => {
            setPage(page)
            getComment(number, page)
          }}
        />
      ) : (
        ''
      )}
    </div>
  )
}
