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
      goodName: '',
      status: 'all',
      type: 'all',
      username: '',
      count: 0,
      data: [],
      selectedGoods: [],
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
    this.getGoodListByLoading();
  }
  async getGoodListByLoading(){
    this.setState({
      coverIsShow: true,
      coverHeight: document.documentElement.scrollHeight + 'px'
    }, this.getGoodList)
  }
  //得到用户列表
  async getGoodList(){
    try{
      let re = await Request.post({
        url: '/goodsManage/getGoodsList',
        data: {
          page: this.state.page,
          eachPageNum: this.state.eachPageNum,
          goodName: this.state.goodName,
          status: this.state.status,
          type: this.state.type,
          username: this.state.username,
        },
      });
      if(re.code === 0){
        re.data.forEach((item) => {
          item.key = item.FUserID;
        });
        this.setState({
          count: re.count,
          data: re.data,
          selectedGoods: [],
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
        goodName: values.goodName,
        status: values.status,
        type: values.type,
        username: values.username,
        page: 1,
        eachPageNum: 12
      },this.getGoodListByLoading)
    });
  }

  renderGoodTypeList(goodType){
    const children = [];
    goodType = JSON.parse(goodType);
    goodType.forEach(item => {
      children.push(
        <Option value={item.FKey} key={item.FKey}>{item.FShowName}</Option>
      )
    });
    return children;
  }
  renderGoodList(){
    let goodList = this.state.data;
    const children = [];
    goodList.forEach((item, key) => {
      let icon = 'plus-circle';
      if(this.state.selectedGoods.indexOf(item.FGoodID) > -1){
        icon = 'minus-circle';
      }
      item.status = '未知';
      if(item.FEnable === 0){
        item.status = '已删除';
      }else if(item.FStatus === 0){
        item.status = '已下架';
      }else if(item.FStatus === 1){
        item.status = '已上架';
      }
      children.push(
        <Col span={4} key={key} style={{marginBottom: '24px'}}>
          <Card
            hoverable
            // cover={<img alt="example" style={{verticalAlign: 'middle', display: 'inline-block'}} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            cover={<img alt="example" style={{verticalAlign: 'middle', display: 'inline-block'}} src={item.FGoodImg} />}
            actions={[<Icon onClick={this.selected.bind(this, item.FGoodID)} type={icon}/>]}
            style={this.state.selectedGoods.indexOf(item.FGoodID) > -1 ? {border: '1px solid #1890ff'} : {}}
          >
            <h3>{item.FGoodName.length > 12 ? item.FGoodName.substring(0,11)+'...' : item.FGoodName}</h3>
            <ul className={styles.detailBox}>
              <li>用户：{item.FEmail.length > 12 ? item.FEmail.substring(0,11)+'...' : item.FEmail }</li>
              <li>价格：{item.FPrice}</li>
              <li>类型：{item.FTypeName}</li>
              <li>状态：{item.status}</li>
            </ul>
          </Card>
        </Col>
      )
    });
    return children;
  }
  selected(FGoodID){
    let selectedGoods = this.state.selectedGoods;
    let index = selectedGoods.indexOf(FGoodID);
    if(index === -1){
      this.setState({
        selectedGoods: [
          ...this.state.selectedGoods,
          FGoodID
        ]
      })
    }else{
      this.setState({
        selectedGoods: [
          ...this.state.selectedGoods.slice(0,index),
          ...this.state.selectedGoods.slice(index+1)
        ]
      })
    }
  }
  //分页回调
  onPageChange(pagination) {
    this.setState({
      page: pagination
    }, this.getGoodListByLoading);
  }

  //对商品的操作
  async oper(operType){
    let operUrl = '';
    switch (operType){
      case 'onGoods':
        operUrl = '/goodsManage/onGoods';
        break;
      case 'offGoods':
        operUrl = '/goodsManage/offGoods';
        break;
      case 'enabledGoods':
        operUrl = '/goodsManage/enabledGoods';
        break;
      case 'disabledGoods':
        operUrl = '/goodsManage/disabledGoods';
        break;
      default:
        break;
    }
    try{
      let re = await Request.post({
        url: operUrl,
        data: {
          goodID: this.state.selectedGoods
        },
      });
      if(re.code === 0){
        message.success(re.msg);
        this.getGoodListByLoading();
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
    const goodType = document.getElementById('goodType').value;

    return (
      <Layout className="layout">
        <HeaderCommon selectTab="goodsManage" userName={user}/>
        <Content style={{ padding: '0 50px'}}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280}} className={styles.clearfix}>
            <Form
              className="ant-advanced-search-form"
              onSubmit={(e) => this.handleSearch(e)}
            >
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="商品名">
                    {getFieldDecorator(`goodName`)(
                      <Input placeholder="请输入商品名或商品ID" />
                    )}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="用户名">
                    {getFieldDecorator(`username`)(
                      <Input placeholder="请输入用户名或email" />
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem label="商品类型">
                    {getFieldDecorator(`type`, {
                      initialValue: 'all'
                    })(
                      <Select
                        // onChange={this.changeType.bind(this)}
                        dropdownMatchSelectWidth={false}
                      >
                        {this.renderGoodTypeList.bind(this, goodType)()}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem label="商品状态">
                    {getFieldDecorator(`status`, {
                      initialValue: 'all'
                    })(
                      <Select
                        // onChange={this.changeType.bind(this)}
                        dropdownMatchSelectWidth={false}
                      >
                        <Option value="all">全部</Option>
                        <Option value="1">已上架</Option>
                        <Option value="0">已下架</Option>
                        <Option value="-1">已删除</Option>
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
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '1') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'offGoods')}>批量下架</Button>
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '0') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'onGoods')}>批量上架</Button>
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '0' || this.state.status === '1') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'disabledGoods')}>批量删除</Button>
              <Button type="primary" style={(this.state.status === 'all' || this.state.status === '-1') ? {display: 'inline-block'} : {display: 'none'}} onClick={this.oper.bind(this, 'enabledGoods')}>批量撤销删除</Button>
            </div>
            <div>
              <Row gutter={25}>
                {this.renderGoodList.bind(this)()}
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