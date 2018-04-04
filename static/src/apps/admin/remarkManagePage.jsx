import React from 'react'
import { Form, Row, Col, Input, Button, Icon, Layout, message, Breadcrumb, Select, Card, Pagination } from 'antd';

import FooterCommon from '../../components/admin/footer/footer'
import HeaderCommon from '../../components/admin/header/header'
import LoadingCommon from '../../components/common/loading'
import 'antd/lib/layout/style/css';
import styles from './goodsManagePage.cssmodule.less';
import Request from './../../utils/request'
const {Content } = Layout;
const Option = Select.Option;
const FormItem = Form.Item;
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      eachPageNum: 12,
      status: 'all',
      type: 'good',
      username: '',
      count: 0,
      data: [],
      selectedRemark: [],
      expand: false,
      coverIsShow: false,
      coverHeight: '100%'
    };
    message.config({
      top: 200,
      duration: 1.2,
    });
  }
  componentDidMount(){
    this.getRemarkListByLoading();
  }
  async getRemarkListByLoading(){
    this.setState({
      coverIsShow: true,
      coverHeight: document.documentElement.scrollHeight + 'px'
    }, this.getRemarkList)
  }
  //得到用户列表
  async getRemarkList(){
    try{
      let re = await Request.post({
        url: '/remarkManage/getRemarkList',
        data: {
          page: this.state.page,
          eachPageNum: this.state.eachPageNum,
          status: this.state.status,
          type: this.state.type,
          username: this.state.username,
        },
      });
      if(re.code == 0){
        this.setState({
          count: re.count,
          data: re.data,
          selectedRemark: [],
          coverIsShow: false
        });
        if(re.data.length === 0){
          message.info ('没有数据！');
        }
      }else{
        message.error ('页面请求失败！');
        this.setState({
          coverIsShow: false
        })
      }
    }catch(e){
      message.error('页面请求失败！');
      this.setState({
        coverIsShow: false
      })
    }
  }
  handleSearch(e) {
    e.preventDefault();
    let that = this;
    this.props.form.validateFields((err, values) => {
      that.setState({
        status: values.status,
        type: values.type,
        username: values.username,
        page: 1,
        eachPageNum: 12
      },this.getRemarkListByLoading)
    });
  }

  renderRemarkList(){
    let remarkList = this.state.data;
    const children = [];
    remarkList.forEach((item, key) => {
      let icon = 'plus-circle';
      if(this.state.selectedRemark.indexOf(item.FRemarkID) > -1){
        icon = 'minus-circle';
      }
      item.status = '未知';
      if(item.FStatus == 0){
        item.status = '无效评论';
      }else if(item.FStatus == 1){
        item.status = '有效评论';
      }
      children.push(
        <Col span={12} key={key} style={{marginBottom: '24px'}}>
          <Card
            title={item.FUserName + '(' + item.FEmail + ')'}
            actions={[<Icon onClick={this.selected.bind(this, item.FRemarkID)} type={icon}/>]}
          >
            <p>商品名：{item.FGoodName}</p>
            <p>出价：{item.FPrice ? item.FPrice + '元' : '未出价'}</p>
            <p>评论：{item.FRemark}</p>
            <p>状态：{item.status}</p>
          </Card>
        </Col>
      )
    });
    return children;
  }
  selected(FRemarkID){
    let selectedRemark = this.state.selectedRemark;
    let index = selectedRemark.indexOf(FRemarkID);
    if(index === -1){
      this.setState({
        selectedRemark: [
          ...this.state.selectedRemark,
          FRemarkID
        ]
      })
    }else{
      this.setState({
        selectedRemark: [
          ...this.state.selectedRemark.slice(0,index),
          ...this.state.selectedRemark.slice(index+1)
        ]
      })
    }
  }
  //分页回调
  onPageChange(pagination) {
    this.setState({
      page: pagination
    }, this.getRemarkListByLoading);
  }

  //对评论的操作
  async oper(operType){
    let operUrl = '';
    switch (operType){
      case 'enabled':
        operUrl = '/remarkManage/enabledRemark';
        break;
      case 'disabled':
        operUrl = '/remarkManage/disabledRemark';
        break;
      default:
        break;
    }
    try{
      let re = await Request.post({
        url: operUrl,
        data: {
          remarkID: this.state.selectedRemark
        },
      });
      if(re.code === 0){
        message.success(re.msg);
        this.getRemarkListByLoading();
      }else{
        message.error('接口请求失败！');
      }
    }catch(e){
      message.error('接口请求失败！');
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const user = document.getElementById('sessionUser').value;

    return (
      <Layout className="layout">
        <HeaderCommon selectTab="remarkManage" userName={user}/>
        <Content style={{ padding: '0 50px'}}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>评论管理</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280}} className={styles.clearfix}>
            <Form
              className="ant-advanced-search-form"
              onSubmit={(e) => this.handleSearch(e)}
            >
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="用户名">
                    {getFieldDecorator(`username`)(
                      <Input placeholder="请输入用户名或email" />
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem label="评论分类">
                    {getFieldDecorator(`type`, {
                      initialValue: 'good'
                    })(
                      <Select
                        // onChange={this.changeType.bind(this)}
                        dropdownMatchSelectWidth={false}
                      >
                        <Option value="good">二手商品</Option>
                        <Option value="want">求购信息</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem label="评论状态">
                    {getFieldDecorator(`status`, {
                      initialValue: 'all'
                    })(
                      <Select
                        // onChange={this.changeType.bind(this)}
                        dropdownMatchSelectWidth={false}
                      >
                        <Option value="all">全部评论</Option>
                        <Option value="-1">无效评论</Option>
                        <Option value="1">有效评论</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </Col>
              </Row>
            </Form>
            <div className={styles.oper}>
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '-1') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'enabled')}>批量有效</Button>
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '1') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'disabled')}>批量无效</Button>
            </div>
            <div>
              <Row gutter={25}>
                {this.renderRemarkList.bind(this)()}
              </Row>
            </div>
            <Pagination style={{float: 'right'}} current={this.state.page} defaultCurrent={this.state.page} total={this.state.count} pageSize={this.state.eachPageNum} onChange={this.onPageChange.bind(this)}/>
          </div>
          <LoadingCommon coverIsShow={this.state.coverIsShow} coverHeight={this.state.coverHeight}/>
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}
App = Form.create({})(App);

export default App