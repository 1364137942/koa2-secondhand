import React from 'react'
import '../../../utils/css/index.css'
import 'antd/lib/layout/style/css'
import Request from '../../../utils/request'
import styles from './userCenterPage.cssmodule.less'
import PageComponent from '../../../components/common/page'
import HeaderComponent from '../../../components/index/header/header'
import AsideComponent from '../../../components/index/aside/aside'
import { Layout, Menu, Breadcrumb, Tabs, Form, Icon, Input, Button, message, Upload } from 'antd'
const FormItem = Form.Item;
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';
    this.duration = false;
    this.state = {
      active: 'userInfo',
      userInfo: '',
      activeGoodStatus: 'up',
      activeWantStatus: 'up',
      eachGoodPageNum: 10,
      goodPage: 1,
      goodList: [],
      goodCount: 0,
      goodChildren: [],
      eachWantPageNum: 10,
      wantPage: 1,
      wantList: [],
      wantCount: 0,
      wantChildren: [],
    };
    message.config({
      top: 200,
      duration: 1.2,
    });
  }

  componentDidMount(){
    this.getUserInfo();
    // this.getGoodsList(1);
    // this.getWantsList(1);
  }
  selectTab(tab){
    this.setState({
      active: tab
    })
    if(status === 'goodsInfo'){
      this.getGoodsList();
    }else if(status === 'userInfo'){
      this.getUserInfo();
    }else if(status === 'wantsInfo'){
      this.getWantsList();
    }
  }
  switchGoodStatus(status){
    this.setState({
      activeGoodStatus: status
    },this.getGoodsList.bind(this,1));
  }
  switchWantStatus(status){
    this.setState({
      activeWantStatus: status
    },this.getWantsList.bind(this,1))
  }
  async getUserInfo(){
    let re = await Request.post({
      url: '/userController/getUserInfo',
      data: {},
    });
    if(re.code === 0){
      this.setState({
        userInfo: re.data
      });
    }
  }
  async getGoodsList(pageIndex){
    window.scrollTo(0,0);
    let re = await Request.post({
      url: '/goodsController/getUserGoodList',
      data: {
        page: pageIndex,
        eachPageNum: this.state.eachGoodPageNum,
        status: this.state.activeGoodStatus === 'up' ? 1 : 0
      },
    });
    if (re.code === 0) {
      this.setState({
        goodPage: pageIndex,
        goodList: re.data,
        goodCount: re.count
      }, this.renderGoodsList)
    }
  }
  async getWantsList(pageIndex){
    window.scrollTo(0,0);
    let re = await Request.post({
      url: '/wantsController/getWantUserList',
      data: {
        page: pageIndex,
        eachPageNum: this.state.eachWantPageNum,
        status: this.state.activeWantStatus === 'up' ? 1 : 0
      },
    });
    if (re.code === 0) {
      this.setState({
        wantPage: pageIndex,
        wantList: re.data,
        wantCount: re.count
      }, this.renderWantsList)
    }
  }

  async operGoodsStatus(goodID, status){
    let re = await Request.post({
      url: '/goodsController/updateUserGoodStatus',
      data: {
        goodID: goodID,
        status: status
      },
    });
    if (re.code === 0) {
      message.success(re.msg);
      this.getGoodsList(1);

    }else{
      message.success(re.msg);
    }
  }

  async operWantsStatus(wantID, status){
    let re = await Request.post({
      url: '/wantsController/updateUserWantStatus',
      data: {
        wantID: wantID,
        status: status
      },
    });
    if (re.code === 0) {
      message.success(re.msg);
      this.getWantsList(1);
    }else{
      message.success(re.msg);
    }
  }
  renderGoodsList(){
    let data = this.state.goodList;
    let children = [];
    data.forEach((item, i) => {
      let subTitle = item.FGoodName;
      let operStatus = 'up';
      if(subTitle.lenght > 32)
      subTitle = subTitle.substring(0, 32) + '...';
      let goodUrl = "/goodsController/goodDetail?goodID=" + item.FGoodID;
      let editGoodUrl = "/goodsController/editGood?goodID=" + item.FGoodID;
      if(item.FStatus == 1){
        operStatus = 'down';
      }
      children.push(
        <li key={i}>
                      <span className={styles.goodTitle}>
                        {subTitle}
                      </span>
          <span className={styles.goodCreateTime}>
                        创建时间：{item.FCreateTime}
                      </span>
          <span className={styles.goodDownTime}>
                        下架时间：{item.FOutDate}
                      </span>
          <span className={styles.goodOper}>
                        <a className={styles.operBtn} href={goodUrl}>查看</a>
                        <a className={styles.operBtn} href={editGoodUrl}>编辑</a>

                        <a className={styles.operBtn} onClick={this.operGoodsStatus.bind(this, item.FGoodID, operStatus)}>{operStatus === 'up' ?  '上架' : '下架'}</a>
          </span>
        </li>
      )
    });

    let that = this;
    that.setState({
      goodChildren: children
    })
  }

  renderWantsList(){
    let data = this.state.wantList;
    let children = [];

    data.forEach((item, i) => {
      let subTitle = item.FGoodName;
      let operStatus = 'up';
      if(item.FStatus == 1){
        operStatus = 'down';
      }
      if(subTitle.lenght > 32)
        subTitle = subTitle.substring(0, 32) + '...';
      let wantUrl = "/wantsController/wantDetail?wantID=" + item.FWantID;
      let editWantUrl = "/wantsController/editWant?wantID=" + item.FWantID;
      children.push(
        <li key={i}>
                      <span className={styles.goodTitle}>
                        {subTitle}
                      </span>
          <span className={styles.goodCreateTime}>
                        创建时间：{item.FCreateTime}
                      </span>
          <span className={styles.goodDownTime}>
                        下架时间：{item.FOutDate}
                      </span>
          <span className={styles.goodOper}>
                        <a className={styles.operBtn} href={wantUrl}>查看</a>
                        <a className={styles.operBtn} href={editWantUrl}>编辑</a>
                        <a className={styles.operBtn} onClick={this.operWantsStatus.bind(this, item.FWantID, operStatus)}>{operStatus === 'up' ?  '上架' : '下架'}</a>
                      </span>
        </li>
      )
    });

    let that = this;
    that.setState({
      wantChildren: children
    })
  }
  async handleSubmit(e){
    e.preventDefault();
    let values = await this.getFormValues();
    if ( values ) {
      let postData = {};
      postData.username = values.userName;
      postData.phone = values.phone;
      postData.qq = values.qq;

      let result = await Request.post({
        url: '/userController/modifyUserInfo',
        data: postData,
      });
      if(result.code === 0){
        message.success( '修改信息成功！' )
      }else{
        message.error( '用户名或密码错误！' )
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    }
    let phoneReg = new RegExp('^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$');
    let numberReg = new RegExp('^\\d{1,}$');
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className="wrap clearfix" style={{position: 'relative', top: '48px'}}>
          <div className={styles.mainList}>
            <div className={styles.sideBar}>
                <ul>
                  <li className={this.state.active === 'userInfo' ? styles.active : ''} style={{borderBottom: 'none'}} onClick={this.selectTab.bind(this, 'userInfo')}>个人信息</li>
                  <li className={this.state.active === 'goodsInfo' ? styles.active : ''} style={{borderBottom: 'none'}} onClick={this.selectTab.bind(this, 'goodsInfo')}>商品管理</li>
                  <li className={this.state.active === 'wantsInfo' ? styles.active : ''} onClick={this.selectTab.bind(this, 'wantsInfo')}>求购管理</li>
                </ul>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.userInfo} style={this.state.active === 'userInfo' ? {display: 'block'} : {display: 'none'}}>
                <ul className={styles.baseUserInfo}>
                  <li>邮箱：{this.state.userInfo.FEmail}</li>
                  <li>学号：{this.state.userInfo.FStudentID}</li>
                  <li>学院：{this.state.userInfo.FAcademy}</li>
                </ul>
                <Form onSubmit={(e) => this.handleSubmit(e)} className={styles.extendUserInfo}>
                  <FormItem
                    {...formItemLayout}
                    label="用户昵称："
                  >
                    {getFieldDecorator('userName', {
                      rules: [
                        { required: true, message: '请输入用户名称！', whitespace: true },
                        {max: 32, message: '最长32个字！'}
                      ],
                      validateFirst: true,
                      initialValue: this.state.userInfo.FUserName
                    })(
                      <Input placeholder="请输入用户名称！" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="手机号："
                  >
                    {getFieldDecorator('phone', {
                      rules: [
                        { required: true, message: '请输入手机号！', whitespace: true },
                        { pattern: phoneReg, message: '请输入正确手机格式！', whitespace: true },
                        {max: 11, message: '最长11个字！'}
                      ],
                      validateFirst: true,
                      initialValue: this.state.userInfo.FPhone
                    })(
                      <Input placeholder="请输入手机号！" />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="QQ："
                  >
                    {getFieldDecorator('qq', {
                      rules: [
                        { required: true, message: '请输入QQ！', whitespace: true },
                        { pattern: numberReg, message: '请输入正确QQ！', whitespace: true },
                        {max: 11, message: '最长11个字！'},
                        {min: 4, message: '最短4个字！'}
                      ],
                      validateFirst: true,
                      initialValue: this.state.userInfo.FPhone
                    })(
                      <Input placeholder="请输入QQ！" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                      提交
                    </Button>
                  </FormItem>
                </Form>
              </div>
              <div className={styles.goodsInfo + ' clearfix'} style={this.state.active === 'goodsInfo' ? {display: 'block'} : {display: 'none'}}>
                <ul className={styles.goodsStatus + ' clearfix'}>
                  <li className={this.state.activeGoodStatus === 'up' ? styles.activeGoodStatus : ''} onClick={this.switchGoodStatus.bind(this, 'up')}>已上架</li>
                  <li className={this.state.activeGoodStatus === 'down' ? styles.activeGoodStatus : ''} onClick={this.switchGoodStatus.bind(this, 'down')}>已下架</li>
                </ul>
                <div className={styles.goodList}>
                  <ul>
                    {this.state.goodChildren}
                  </ul>
                  <PageComponent page={this.state.goodPage} eachPageNum={this.state.eachGoodPageNum} count={this.state.goodCount} callback={this.getGoodsList.bind(this)}/>
                </div>
              </div>
              <div className={styles.goodsInfo + ' clearfix'} style={this.state.active === 'wantsInfo' ? {display: 'block'} : {display: 'none'}}>
                <ul className={styles.goodsStatus + ' clearfix'}>
                  <li className={this.state.activeWantStatus === 'up' ? styles.activeGoodStatus : ''} onClick={this.switchWantStatus.bind(this, 'up')}>已上架</li>
                  <li className={this.state.activeWantStatus === 'down' ? styles.activeGoodStatus : ''} onClick={this.switchWantStatus.bind(this, 'down')}>已下架</li>
                </ul>
                <div className={styles.goodList}>
                  <ul>
                    {this.state.wantChildren}
                  </ul>
                </div>
                <PageComponent page={this.state.wantPage} eachPageNum={this.state.eachWantPageNum} count={this.state.wantCount} callback={this.getWantsList.bind(this)}/>
              </div>
            </div>
          </div>
          <AsideComponent/>
        </section>

      </div>
    )

  }

}
App = Form.create({})(App);
export default App