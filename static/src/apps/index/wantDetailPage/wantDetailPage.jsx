import React from 'react'
import 'antd/lib/layout/style/css'
import HeaderComponent from '../../../components/index/header/header'
import styles from './wantDetailPage.cssmodule.less'
import Request from '../../../utils/request'

import PageComponent from '../../../components/common/page'
import { Input,Form, Button, message } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      detail: '',
      activeTab: 'desc', //desc, security
      contactInfo: ''
    }
    this.wantID = '';
    message.config({
      top: 200,
      duration: 1.2,
    });
  }
  componentDidMount(){
    this.wantID = document.getElementById('wantID').getAttribute('data-value');
    this.getWantDetail(this.wantID);
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
        url: '/userController/getUserInfoByWantID',
        data: {
          wantID: this.wantID
        },
      });
      if (re.code === 0) {
        this.setState({
          contactInfo: re.data
        })
      }
    }else if(tab === 'remark'){
      this.getRemarkList(1);
    }
  }

  async getRemarkList(pageIndex){
    let re = await Request.post({
      url: '/remarkController/gerRemarkList',
      data: {
        page: pageIndex,
        eachPageNum: this.state.eachPageNum,
        itemType: 'want',
        itemID: this.wantID
      },
    });
    if (re.code === 0) {
      this.setState({
        page: pageIndex,
        remarkList: re.data,
        count: re.count
      }, this.renderRemarkList)
    }
  }

  renderRemarkList(){
    let data = this.state.remarkList;
    let children = [];
    data.forEach((item, i) => {
      children.push(
        <li key={i}>
          <div>
            <span><img src={item.FAvatar} alt="头像"/></span>
            <span>{item.FUserName}</span>
          </div>
          <div>
            <p>出价：{item.FPrice ? item.FPrice + '元' : '未出价'}</p>
            <p>评论：{item.FRemark}</p>
            <p style={item.showContactInfo == 1 ? {} : {display: 'none'}}>-----------------------------------</p>
            <p style={item.showContactInfo == 1 ? {} : {display: 'none'}}>手机：{item.FPhone}</p>
            <p style={item.showContactInfo == 1 ? {} : {display: 'none'}}>QQ：{item.FQQ}</p>
            <p style={item.showContactInfo == 1 ? {} : {display: 'none'}}>邮箱：{item.FEmail}</p>
            <p>评论时间：{item.FCreateTime}</p>
          </div>
        </li>
      )
    });
    if(children.length == 0){
      children[0] = <p key="1">快来抢沙发！！！</p>
    }

    this.setState({
      children: children,
    });
  }
  async handleSubmit(e){
    e.preventDefault();
    let values = await this.getFormValues();
    if ( values ) {
      let postData = {};
      postData.price = values.price;
      postData.remark = values.remark;
      postData.itemID = 'W'+this.wantID;
      let result = await Request.post({
        url: '/remarkController/addRemark',
        data: postData,
      });
      if(result.code === 0){
        message.success( '发布评论成功！' )
        this.getRemarkList(1);
      }else{
        message.error( result.msg )
      }
    } else {
      message.error( '系统繁忙，稍后再试！' )
    }
  }
  getFormValues() {
    let that = this;
    return new Promise((resolve, reject) => {
      that.props.form.validateFields((err, values) => {
        if (!err) {
          resolve( values )
        } else {
          reject( false )
        }
      })
    })
  }
  checkNumber(rule, value, callback){
    const pattern = /^(0{1}.{1}(([1-9]{1}\d{0,1})|(\d{1}[1-9]{1})))$|^([1-9]{1}\d*.{0,1}\d{0,2})$/;
    if (pattern.test(value) === false) {
      callback('请输入正确的价格，最多两位小数！')
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className={"wrap clearfix " + styles.topSec} style={this.state.detail === '' ? {display: 'none'} : {} }>
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
              <li className={this.state.activeTab === 'remark' ? styles.active : styles.normal}>
                <a href="javascript:void(0)" onClick={this.selectTab.bind(this, 'remark')}>评论</a>
              </li>
            </ul>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.goodDesc} style={this.state.activeTab === 'desc' ? {display: 'block'} : {display: 'none'}} dangerouslySetInnerHTML={{__html: this.state.detail.FDesc ? this.state.detail.FDesc : '这个人很懒，什么都没留下！！！'}}/>
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
          <div style={this.state.activeTab === 'remark' ? {display: 'block'} : {display: 'none'}}>
            <div className={styles.remarkList+' clearfix'}>
              <ul>

                {this.state.children}
              </ul>
              <PageComponent page={this.state.page} eachPageNum={this.state.eachPageNum} count={this.state.count} callback={this.getRemarkList.bind(this)}/>
            </div>
            <div className={styles.remarkArea}>
              <Form onSubmit={(e) => this.handleSubmit(e)} className={styles.extendUserInfo}>
                <FormItem
                  {...formItemLayout}
                  label="出价："
                >
                  {getFieldDecorator('price', {
                    rules: [
                      {validator: this.checkNumber}
                    ],
                    validateFirst: true,
                  })(
                    <Input placeholder="请输入价格（可选）" />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="评论："
                >
                  {getFieldDecorator('remark', {
                    rules: [
                      { required: true, message: '请输入评论内容！', whitespace: true },
                      {max: 256, message: '最长256个字！'},
                    ],
                    validateFirst: true,
                  })(
                    <div className={styles.remarkText}>
                      <TextArea rows={4} placeholder="请输入评论内容"/>
                    </div>
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                  提交
                </Button>
              </Form>
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
App = Form.create({})(App);
export default App