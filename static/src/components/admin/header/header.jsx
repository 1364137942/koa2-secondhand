import React from 'react'
import { Layout, Menu } from 'antd'
const { Header } = Layout;

import 'antd/lib/layout/style/css'
import styles from './header.cssmodule.less'

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowUser: false
    }
  }
  componentDidMount(){
    let userName = this.props.userName ? this.props.userName: '';
    if(userName !== ''){
      this.setState({
        isShowUser: true
      })
    }else{
      this.setState({
        isShowUser: false
      })
    }
  }
  render() {
    let selectTab = this.props.selectTab ? this.props.selectTab : '';

    return (
      <Header className={styles.antLayoutHeader}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selectTab]}
          style={{ lineHeight: '52px' }}
        >
          <Menu.Item key="userManage"><a href="/userManage/getUser">用户管理</a></Menu.Item>
          <Menu.Item key="goodsManage"><a href="/goodsManage/getGoods">商品管理</a></Menu.Item>
          <Menu.Item key="wantsManage"><a href="/wantsManage/getWants">求购管理</a></Menu.Item>
          <Menu.Item key="remarkManage"><a href="/remarkManage/getRemark">评论管理</a></Menu.Item>
        </Menu>

        <div className={ this.state.isShowUser === true ? styles.admin : styles.hidden}>
          {this.props.userName} | <a href="/admin/logOut" className={styles.logOut}>注销</a>
        </div>
      </Header>
    )
  }
}


export default HeaderComponent