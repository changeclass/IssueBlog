import React, { useState, useEffect } from 'react'
import { Button, Table, Space, Tag, Modal, Form, Input, message } from 'antd'
import './admin.less'
import {
  reqGetAllLabels,
  reqGetIssues,
  reqGetRepoInfo,
  reqUpdateIssue
} from '../../api'
import config from '../../config/config'
const { ColumnGroup, Column } = Table
const { CheckableTag } = Tag
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
}

export default function AdminPost() {
  const [pagination, setPagination] = useState({
    // 当前页数
    current: 1,
    pageSize: config.post.page_size,
    total: 0,
    onChange: function (value) {
      this.current = value
      // 页数发生变化即更新数据
      getIssueList(this.current)
    }
  })
  // 修改对话框
  const [isModalVisible, setIsModalVisible] = useState(false)
  // 表格数据
  const [data, setData] = useState([])
  // 当前issue的nunber
  const [number, setNumber] = useState(0)
  const [form] = Form.useForm()
  // 标签
  const [tags, setTags] = useState([])
  // 选择的标签
  const [selectedTags, setSelectedTags] = useState([])
  // 获取仓库基本信息
  const getRepoInfo = async () => {
    const result = await reqGetRepoInfo()
    const total = result.open_issues_count
    const obj = { ...pagination }
    obj.total = total
    setPagination(obj)
  }
  // 获取issue列表
  const getIssueList = async (page) => {
    const result = await reqGetIssues(page)
    if (result.length > 0) {
      setNumber(result[0].number)
    }
    result.forEach((item) => {
      item.key = item.id
    })
    setData(result)
  }
  // 获取所有labels
  const getLabels = async () => {
    const labels = await reqGetAllLabels()
    if (labels) {
      setTags(labels)
    }
  }
  const showModal = (text, record) => {
    setNumber(text.number)
    form.setFieldsValue({
      title: text.title,
      body: text.body
    })

    const newLabels = []
    text.labels.forEach((item) => {
      newLabels.push(item.name)
    })
    setSelectedTags(newLabels)
    setIsModalVisible(true)
  }
  const handleOk = () => {
    // setIsModalVisible(false)
    form.validateFields().then(async (result) => {
      console.log(selectedTags)
      const updateObj = await reqUpdateIssue(
        number,
        result.title,
        result.body,
        selectedTags
      )
      if (updateObj.title === result.title) {
        message.success('更新成功')
        setIsModalVisible(false)
      } else {
        message.error('更新失败')
      }
    })
  }
  // 选择标签事件
  const handleSelected = (item, check) => {
    // const tags = [...selectedTags]
    const nextSelectedTags = check
      ? [...selectedTags, item.name]
      : selectedTags.filter((t) => t !== item.name)
    setSelectedTags(nextSelectedTags)
    console.log(selectedTags)
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false)
  }
  const onFinish = () => {
    console.log(1)
  }

  useEffect(() => {
    getRepoInfo()
    getIssueList(1)
    getLabels()
  }, [])
  return (
    <div className='admin-container'>
      <Table dataSource={data} pagination={pagination}>
        <Column title='标题' dataIndex='title' key='id' />
        <Column title='时间' dataIndex='updated_at' key='id' />
        <Column
          title='Action'
          key='action'
          render={(item) => (
            <Space size='middle'>
              <a
                onClick={() => {
                  showModal(item)
                }}
              >
                编辑
              </a>
              <a>删除</a>
            </Space>
          )}
        />
      </Table>
      <Modal
        title='Basic Modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
          <Form.Item name='title' label='标题' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='body' label='内容' rules={[{ required: true }]}>
            <Input.TextArea />
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
        </Form>
      </Modal>
    </div>
  )
}
