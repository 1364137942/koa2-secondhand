import React from 'react'
import { Layout, Menu } from 'antd'
const { Header } = Layout;

import 'antd/lib/layout/style/css'
import styles from './card.cssmodule.less'

class CardComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowUser: false
    }
  }
  componentDidMount(){

  }
  render() {
    return (
      <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    )
  }
}


export default CardComponent