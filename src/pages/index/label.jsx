import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Avatar, Button, Tag, Skeleton, PageHeader } from 'antd'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CommentOutlined
} from '@ant-design/icons'

import { reqGetIssusByLabel } from '../../api'
import config from '../../config/config'
import './index.less'
import formatTime from '../../utils/formatTime'

import { useHistory } from 'react-router-dom'

const { Meta } = Card
export default function LabelPost() {
  // 定义当前页码
  const [page, setPage] = useState(1)
  // 定义issue存储列表
  const [issueList, setIssueList] = useState([])
  // 卡片是否在加载
  const [cardLoading, setCardLoading] = useState(true)
  const history = useHistory()
  const pathname = history.location.pathname
  const label = pathname.split('/').pop()
  // 获取issue
  const getIssuesList = async () => {
    const result = await reqGetIssusByLabel(page, label)
    // console.log(result)
    setCardLoading(false)
    setIssueList(result)
  }

  useEffect(() => {
    getIssuesList()
  }, [page])
  // 请求获取
  return (
    <div className='site-card-wrapper'>
      <PageHeader
        className='site-page-header'
        onBack={() => {
          history.goBack(1)
        }}
        title={label}
        // subTitle={}
      />
      <Skeleton active loading={cardLoading}>
        <Row gutter={[16, 24]}>
          {issueList.map((item, index) => {
            console.log(item)
            return (
              <Col span={6} key={index}>
                <span
                  onClick={(event) => {
                    event.stopPropagation()
                    history.push('/post/' + item.number)
                  }}
                >
                  <Card
                    style={{ width: 280 }}
                    cover={
                      <img src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />
                    }
                    hoverable
                    actions={[
                      item.labels.length > 0 ? (
                        <Tag
                          color={'#' + item.labels[0].color}
                          key={item.labels[0].id}
                        >
                          {item.labels[0].name}
                        </Tag>
                      ) : (
                        <Tag color={config.default_label.color}>
                          {config.default_label.name}
                        </Tag>
                      ),
                      <span>
                        <CommentOutlined />
                        {item.comments}
                      </span>,
                      <span
                        onClick={(event) => {
                          event.stopPropagation()
                          history.push('/post/' + item.number)
                        }}
                      >
                        查看
                      </span>
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar
                          src={
                            config.avatar ? config.avatar : item.user.avatar_url
                          }
                        />
                      }
                      title={item.title}
                      description={'发表于' + formatTime(item.created_at)}
                    />
                  </Card>
                </span>
              </Col>
            )
          })}
        </Row>
      </Skeleton>

      <div className='page'>
        {page > 1 ? (
          <Button
            type='primary'
            shape='round'
            icon={<CaretUpOutlined />}
            size='large'
            onClick={() => {
              const newPage = page - 1
              setPage(newPage)
              getIssuesList()
            }}
          />
        ) : (
          ''
        )}
        {issueList.length === config.post.page_size ? (
          <Button
            type='primary'
            shape='round'
            icon={<CaretDownOutlined />}
            size='large'
            onClick={() => {
              const newPage = page + 1
              setPage(newPage)
              getIssuesList()
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
