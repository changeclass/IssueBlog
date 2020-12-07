import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import { reqGetIssueBody, reqMKtoHTML } from '../../api'
import { Divider } from 'antd'
import './post.less'

async function getBody(number) {
  const post = await reqGetIssueBody(number)
  const htmlText = await reqMKtoHTML(post.body)
  console.log(htmlText, post.body)
  post.html = htmlText
  return post
  // console.log(number)
}

export default function Post() {
  const history = useHistory()
  const [post, setPost] = useState({})
  const pathname = history.location.pathname
  const number = pathname.split('/').pop()
  useEffect(() => {
    getBody(number).then((result) => {
      console.log(result)
      setPost(result)
    })
  }, [])

  return (
    <div className='post_container'>
      <div className='post_card'>
        <div className='post_header'>
          <h2>{post.title}</h2>
          标签：{post.labels}
        </div>
        <Divider />
        <article dangerouslySetInnerHTML={{ __html: post.html }}></article>
        <Divider />
      </div>
    </div>
  )
}
