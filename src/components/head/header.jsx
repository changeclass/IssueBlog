import React, { useEffect, useState } from 'react'
import { Row, Col, Menu, Dropdown, message } from 'antd'
import { Avatar, Image, Button, Modal, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import Label from '../../pages/label/label'
import Milestone from '../../pages/milestone/milestone'

import './index.less'
import store from '../../utils/localStore'

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.alipay.com/'
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.taobao.com/'
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
)
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

export default function Header(childrens) {
  // 登录框的显示与隐藏
  const [visible, setVisible] = useState(false)
  // 表单实例
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  // 检查用户是否登录
  function userCheck() {
    const user = store.getUser()
    if (user.token) {
      return user
    } else {
      return false
    }
  }
  // 用户登录事件
  function userLogin() {
    setVisible(true)
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // store.saveUser({
    //   token: '111'
    // })
  })
  return (
    <Row>
      <Col span={8}>这是一个Logo</Col>
      <Col span={8}>col-6</Col>
      <Col span={8} className='navigation'>
        {childrens.children}
        {userCheck() ? (
          <Dropdown overlay={menu}>
            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
          </Dropdown>
        ) : (
          <span onClick={userLogin}>
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </span>
        )}
      </Col>
      <Modal
        title='登录框框'
        centered
        visible={visible}
        onOk={async () => {
          console.log(form)
          form
            .validateFields()
            .then((result) => {
              console.log(result)
            })
            .catch((err) => {
              message.error('????')
            })
        }}
        onCancel={() => setVisible(false)}
        width={800}
        maskClosable={false}
      >
        <Form {...layout} name='userLoginForm' onFinish={onFinish} form={form}>
          <Form.Item
            label='Token'
            name='token'
            rules={[{ required: true, message: '请输入TOKEN' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  )
}
