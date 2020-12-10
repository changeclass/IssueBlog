import React, { useEffect, useState } from 'react'
import { Tag, List, Card } from 'antd'
import { reqGetAllLabels, reqGetIssusByLabel } from '../../api'
import getFontColor from '../../utils/fontColor'
import { useHistory } from 'react-router-dom'
export default function Label() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const history = useHistory()
  const getLabels = async () => {
    const labels = await reqGetAllLabels()
    setLoading(false)
    setData(labels)
  }
  reqGetIssusByLabel()
  useEffect(() => {
    getLabels()
  }, [])
  return (
    <div className='post_container'>
      <div className='post_card'>
        <p>目前，小康博客共有 {data.length} 个标签</p>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          locale={{ emptyText: '好像还没有标签呢！' }}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <span
                onClick={(event) => {
                  event.stopPropagation()
                  history.push({ pathname: '/label/' + item.name, state: item })
                }}
              >
                <Card
                  title={
                    <Tag color={'#' + item.color}>
                      {
                        <span style={{ color: getFontColor('#' + item.color) }}>
                          {item.name}
                        </span>
                      }
                    </Tag>
                  }
                >
                  {item.description}
                </Card>
              </span>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
