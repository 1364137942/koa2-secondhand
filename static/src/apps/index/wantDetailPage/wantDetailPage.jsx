import React from 'react'
import 'antd/lib/layout/style/css'
import HeaderComponent from '../../../components/index/header/header'
import styles from './wantDetailPage.cssmodule.less'
import Request from '../../../utils/request'
import tools from '../../../utils/tools'

class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      detail: {},
      activeTab: 'desc', //desc, security
      contactInfo: ''
    }
  }
  componentDidMount(){
    const wantID = document.getElementById('wantID').getAttribute('data-value');
    this.getWantDetail(wantID);
  }
  //得到商品详情
  async getWantDetail(wantID){
    try{
      let re = await Request.post({
        url: '/wantsController/getWantDetail',
        data: {
          wantID
        },
      });
      if(re.code === 0){
        this.setState({
          detail: re.data
        },function(){
          // tools.align(styles.bannerImg)
        });
      }
    }catch(e){

    }
  }

  //切换tabs
  async selectTab(tab){
    this.setState({
      activeTab: tab
    });
    if(tab === 'contact'){
      let re = await Request.post({
        url: '/usersController/getUserInfoByWantID',
        data: {
          wantID: this.state.detail.FWantID
        },
      });
      if (re.code === 0) {
        this.setState({
          contactInfo: re.data
        })
      }
    }
  }

  render() {

    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className={"wrap clearfix " + styles.topSec}>
          <div className={styles.goodDetail}>
            <h1 className={styles.title}>{this.state.detail.FGoodName}</h1>
            <ul className={styles.idleInfo}>
              <li>
                <span className={styles.para}>要求成色：</span>
                <em>{parseInt(this.state.detail.FOld) === 0 ? '非全新' : '全新'}</em>
              </li>
              <li>
                <span className={styles.para}>下架时间：</span>
                <em>{this.state.detail.FOutDate}</em>
              </li>
              <li>
                <span className={styles.para}>交易方式：</span>
                <em>线下交易</em>
              </li>
            </ul>
          </div>
        </section>
        <section className={"wrap clearfix " + styles.goodDescBlock}>
          <div className={styles.tabTitle}>
            <ul className={styles.listTabs}>
              <li className={this.state.activeTab === 'desc' ? styles.active : styles.normal}>
                <a href="javascript:void(0)" onClick={this.selectTab.bind(this, 'desc')}>商品介绍</a>
              </li>
              <li className={this.state.activeTab === 'security' ? styles.active : styles.normal}>
                <a href="javascript:void(0)" onClick={this.selectTab.bind(this, 'security')}>安全保障</a>
              </li>
              <li className={this.state.activeTab === 'contact' ? styles.active : styles.normal}>
                <a href="javascript:void(0)" onClick={this.selectTab.bind(this, 'contact')}>联系方式</a>
              </li>
            </ul>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.goodDesc} style={this.state.activeTab === 'desc' ? {display: 'block'} : {display: 'none'}} dangerouslySetInnerHTML={{__html: this.state.detail.FDesc}}/>
            <div style={this.state.activeTab === 'security' ? {display: 'block'} : {display: 'none'}}>
              安全保障
            </div>
            <div style={this.state.activeTab === 'contact' ? {display: 'block'} : {display: 'none'}}>
              <div  style={this.state.contactInfo === '' ? {display: 'block'} : {display: 'none'}}>
                请先 <a href="">登录</a> 后查看
              </div>
              <div  style={this.state.contactInfo !== '' ? {display: 'block', paddingLeft: "16px"} : {display: 'none'}}>
                <p style={{color: "red"}}>请勿恶意骚扰！！！</p>
                <p>邮箱：{this.state.contactInfo.FEmail}</p>
                <p>手机：{this.state.contactInfo.FPhone}</p>
                <p>QQ：{this.state.contactInfo.FQQ}</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    )
  }

}

export default App