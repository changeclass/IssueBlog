import React, { useState, useEffect } from 'react'
import { Button, Tag, Input, Form, message } from 'antd'
import './admin.less'
import { reqGetAllLabels, reqCreateIssue } from '../../api'
import { useForm } from 'antd/lib/form/Form'
const { CheckableTag } = Tag

export default function AdminPost() {
  // 表单实例
  const [form] = useForm()
  // 标签
  const [tags, setTags] = useState([])
  // 选择的标签
  const [selectedTags, setSelectedTags] = useState([])

  // 获取所有labels
  const getLabels = async () => {
    const labels = await reqGetAllLabels()
    if (labels) {
      setTags(labels)
    }
  }

  // 选择标签事件
  const handleSelected = (item, check) => {
    // const tags = [...selectedTags]
    const nextSelectedTags = check
      ? [...selectedTags, item.name]
      : selectedTags.filter((t) => t !== item.name)
    setSelectedTags(nextSelectedTags)
  }

  const onFinish = async (result) => {
    console.log(1)
    console.log(result)
    console.log(selectedTags)
    // 发送请求新建issue
    const createObj = await reqCreateIssue(
      result.title,
      result.body,
      selectedTags
    )
    if (createObj.number) {
      message.success('创建成功')
    }
  }

  useEffect(() => {
    getLabels()
  }, [])
  return (
    <div className='admin-container'>
      <Form form={form} name='control-hooks' onFinish={onFinish}>
        <Form.Item name='title' label='标题' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name='body' label='内容' rules={[{ required: true }]}>
          <Input.TextArea rows={20} />
        </Form.Item>
        <Form.Item label='标签'>
          {tags.map((item) => {
            return (
              <CheckableTag
                key={item.id}
                checked={selectedTags.indexOf(item.name) > -1}
                onChange={(checked) => handleSelected(item, checked)}
              >
                {item.name}
              </CheckableTag>
            )
          })}
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
