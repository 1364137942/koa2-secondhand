import React from 'react'
import 'antd/lib/layout/style/css'
import HeaderComponent from '../../../components/index/header/header'
import styles from './goodDetailPage.cssmodule.less'
import Request from '../../../utils/request'
import tools from '../../../utils/tools'

class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      detail: '',
      activeTab: 'desc', //desc, security
      contactInfo: ''
    }
  }
  componentDidMount(){
    const goodID = document.getElementById('goodID').getAttribute('data-value');
    this.getGoodDetail(goodID);
  }
  //得到商品详情
  async getGoodDetail(goodID){
    try{
      let re = await Request.post({
        url: '/goodsController/getGoodDetail',
        data: {
          goodID
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
        url: '/userController/getUserInfoByGoodID',
        data: {
          goodID: this.state.detail.FGoodID
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
        <section className={"wrap clearfix " + styles.topSec} style={this.state.detail === '' ? {display: 'none'} : {} }>
          <div className={styles.floatLeft + " " + styles.bannerImg}>
            {/*<img src={this.state.detail.FGoodImg} alt="商品展示图片"/>*/}
            {/*<div style={{width: '730px', height: '490px', backgroundImage: "url(/image/img/微信图片_20180306113005.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>*/}
            <div style={{width: '730px', height: '490px', backgroundImage: "url("+this.state.detail.FGoodImg+")", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>
            </div>
          </div>
          <div className={styles.floatLeft + " " + styles.goodDetail}>
            <h1 className={styles.title}>{this.state.detail.FGoodName}</h1>
            <ul className={styles.priceInfo}>
              <li className={styles.priceBlock}>
                <span className={styles.para}>转&nbsp;&nbsp;卖&nbsp;&nbsp;价：</span>
                <span className={styles.price}>
                  <b>&yen;</b>
                  <em>{this.state.detail.FPrice}</em>
                </span>
              </li>
            </ul>
            <ul className={styles.idleInfo}>
              <li>
                <span className={styles.para}>成&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
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
        <section className={"wrap clearfix " + styles.goodDescBlock} style={this.state.detail === '' ? {display: 'none'} : {} }>
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
            <div className={styles.goodDesc} style={this.state.activeTab === 'desc' ? {display: 'block'} : {display: 'none'}} dangerouslySetInnerHTML={{__html: this.state.detail.FDesc ? this.state.detail.FDesc : ''}}/>
            <div style={this.state.activeTab === 'security' ? {display: 'block'} : {display: 'none'}}>
              安全保障
            </div>
            <div style={this.state.activeTab === 'contact' ? {display: 'block'} : {display: 'none'}}>
              <div  style={this.state.contactInfo === '' ? {display: 'block'} : {display: 'none'}}>
                请先 <a href="/userController/login" style={{color: 'red'}}>登录</a> 后查看
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
        <section className={"wrap clearfix " + styles.topSec} style={this.state.detail === '' ? {} : {display: 'none'} }>
          <h1>该商品不存在，请返回首页查看更多商品！！！</h1>
        </section>
      </div>
    )
  }

}

export default App