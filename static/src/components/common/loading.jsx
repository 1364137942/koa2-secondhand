import React from 'react'
import { Spin } from 'antd'

import 'antd/lib/layout/style/css'
import styles from './loading.cssmodule.less'

class LoadingComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: this.props.coverHeight ? (this.props.coverHeight) : '100%',
      isShow: this.props.coverIsShow ? 'block' : 'none'
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      height: nextProps.coverHeight ? (nextProps.coverHeight) : '100%',
      isShow: nextProps.coverIsShow ? 'block' : 'none'

    })
  }
  render() {
    return (
      <div className={styles.coverLoading} style={{height: this.state.height, display: this.state.isShow}}>
        <div className={styles.loadingBox}>
          <Spin delay={300} className={styles.loading}/>
        </div>
      </div>
    )
  }
}


export default LoadingComponent