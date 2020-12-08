import React, { useEffect, useState } from 'react'
import { Tag, List, Card } from 'antd'
import { reqGetAllLabels } from '../../api'
import getFontColor from '../../utils/fontColor'
export default function Label() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getLabels = async () => {
    const labels = await reqGetAllLabels()
    setLoading(false)
    console.log(labels)
    setData(labels)
    console.log(data)
  }
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
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
