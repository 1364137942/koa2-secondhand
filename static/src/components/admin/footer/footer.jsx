import React from 'react'
import { Layout } from 'antd'
const {  Footer } = Layout;

import styles from './footer.cssmodule.less'
class FooterComponent extends React.Component {
  getNowYear(){
    let date = new Date();
    return date.getFullYear();
  }
  render() {
    return (
      <Footer className={styles.fixFooter}>
        SecondHand ©{this.getNowYear()} Created by ALI & KEVIN
      </Footer>
    )
  }
}


export default FooterComponent