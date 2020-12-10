import React, { useState, useEffect } from 'react'
import { Button, Tabs } from 'antd'
import './admin.less'
import AdminLabels from './labels'
import AdminPost from './post'
import NewPost from './newPost'
const { TabPane } = Tabs
export default function Admin() {
  return (
    <div className='admin-container'>
      <Tabs tabPosition={'left'}>
        <TabPane tab='文章管理' key='1'>
          <AdminPost />
        </TabPane>
        <TabPane tab='标签管理' key='2'>
          <AdminLabels />
        </TabPane>
        <TabPane tab='新增文章' key='3'>
          <NewPost />
        </TabPane>
      </Tabs>
    </div>
  )
}
