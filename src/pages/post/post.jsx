import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { reqGetIssueBody, reqMKtoHTML } from '../../api'
import { Divider, Skeleton, Row, Col, Tag } from 'antd'
import postFormatDate from '../../utils/postFormatTime.js'

import Comments from './comment'
import './post.less'

export default function Post() {
  const history = useHistory()
  const [post, setPost] = useState({})
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)
  const pathname = history.location.pathname
  const number = pathname.split('/').pop()

  async function getBody(number) {
    const post = await reqGetIssueBody(number)
    const htmlText = await reqMKtoHTML(post.body || '')
    const result = {
      title: post.title,
      MKRaw: post.body,
      html: htmlText,
      updated_at: post.updated_at,
      created_at: post.created_at,
      // labels: post.labels,
      user: post.user,
      comments_url: post.comments_url,
      comments: post.comments
    }

    setLoading(false)
    // console.log(newPost)
    return { post: result, labels: post.labels }
    // console.log(number)
  }
  useEffect(() => {
    getBody(number).then((result) => {
      setPost(result.post)
      setLabels(result.labels)
    })
  }, [])

  return (
    <div className='post_container'>
      <div className='post_card'>
        <div className='post_header'>
          <h2>{post.title}</h2>
        </div>
        <Divider />
        <Skeleton loading={loading}>
          <article dangerouslySetInnerHTML={{ __html: post.html }}></article>
        </Skeleton>
        <Divider />
        <div className='post-footer'>
          <Row>
            <Col span={18}>
              <div className='post-tag'>
                {labels.map((item, index) => {
                  return (
                    <Tag key={index} color={'#' + item.color}>
                      {item.name}
                    </Tag>
                  )
                })}
              </div>
            </Col>
            <Col span={6}>
              <div className='created-time'>
                最后编辑于{postFormatDate(post.updated_at)}
              </div>
            </Col>
          </Row>
        </div>
        <Divider />
        <div className='post-comment'>
          <Comments number={number} total={post.comments}></Comments>
        </div>
      </div>
    </div>
  )
}
