import React, { useState, useEffect } from 'react'
import { message, Spin, Tag, Form, Input, Button, Tooltip } from 'antd'
import './admin.less'
import { reqCreteLabel, reqDeleteLabel, reqGetAllLabels } from '../../api'
import fontColor from '../../utils/fontColor'
import { TagOutlined, DesktopOutlined } from '@ant-design/icons'
import colorList from '../../config/color'
export default function AdminLabels() {
  const [label, setLabel] = useState([])
  const [loading, setLoading] = useState(true)
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  // 获取所有标签
  const getLabels = async () => {
    const result = await reqGetAllLabels()
    setLoading(false)
    setLabel(result)
  }
  // 删除一个标签
  const removeLabel = async (e, name) => {
    const result = await reqDeleteLabel(name)
    if (!result) {
      message.success('删除成功！可能存在缓存无法及时更新')
    } else {
      getLabels()
      message.error('删除失败！')
    }
  }
  // 表单校验完成
  const onFinish = async (values) => {
    // 获得一个随机颜色
    const color = colorList[parseInt(Math.random() * colorList.length)]
    const result = await reqCreteLabel(values.name, values.description, color)
    if (result.id) {
      message.success('添加成功！')
      getLabels()
    } else {
      message.error('添加失败！')
    }
  }
  useEffect(() => {
    getLabels()
    forceUpdate({})
  }, [])
  return (
    <div className='admin-container'>
      <Form
        form={form}
        name='horizontal_login'
        layout='inline'
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入标签名' }]}
        >
          <Input
            prefix={<TagOutlined className='site-form-item-icon' />}
            placeholder='name'
          />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{ required: false, message: '请输入描述' }]}
        >
          <Input
            prefix={<DesktopOutlined className='site-form-item-icon' />}
            placeholder='描述'
          />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              添加
            </Button>
          )}
        </Form.Item>
      </Form>
      <Spin tip='别急，正在加载中...' spinning={loading}>
        <p>目前，小康博客共有 {label.length} 个标签</p>
        {label.map((item, index) => {
          return (
            <Tooltip placement='bottom' title={item.description} key={item.id}>
              <Tag
                color={'#' + item.color}
                style={{ color: fontColor('#' + item.color) }}
                closable
                onClose={(e) => removeLabel(e, item.name)}
              >
                {item.name}
              </Tag>
            </Tooltip>
          )
        })}
      </Spin>
    </div>
  )
}
