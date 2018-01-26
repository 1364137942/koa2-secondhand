import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'

import 'antd/lib/layout/style/css'

const { Header, Content, Footer } = Layout

class HeaderNav extends React.Component {
  render() {
    return (
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><a href="/admin/loginPage">用户管理</a></Menu.Item>
          <Menu.Item key="2"><a href="/userManage/getUser">用户管理</a></Menu.Item>
          <Menu.Item key="3"><a href="/work">Work</a></Menu.Item>
        </Menu>
      </Header>
    )
  }
}


export default HeaderNav