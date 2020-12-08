import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'

import './index.less'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 }
}

export default function Header(childrens) {
  return (
    <Row>
      <Col span={8}>
        <h1>
          <a href='/'>小康博客</a>
        </h1>
      </Col>
      <Col span={8}></Col>
      <Col span={8} className='navigation'>
        {childrens.children}
      </Col>
    </Row>
  )
}
