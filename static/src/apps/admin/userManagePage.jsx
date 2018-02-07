import React from 'react'
import { Layout, Breadcrumb, message, Pagination, Table, Button, Tabs, Select  } from 'antd'
import FooterCommon from '../../components/admin/footer/footer'
import HeaderCommon from '../../components/admin/header/header'
import 'antd/lib/layout/style/css'
import Request from './../../utils/request'
const {Content } = Layout;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const columns = [
  {
    title: 'ID',
    dataIndex: 'FUserID',
    width: '5%'
  },
  {
    title: '头像',
    dataIndex: 'FAvatar',
    width: '10%',
    render: record => <img src={record} width="32px" height="32px"/>
  },
  {
    title: '邮箱',
    dataIndex: 'FEmail',
    width: '10%'
  },
  {
    title: '用户名',
    dataIndex: 'FUsername',
    width: '10%'
  },
  {
    title: '学号',
    dataIndex: 'FStudentID',
    width: '10%'
  },
  {
    title: '姓名',
    dataIndex: 'FStudentName',
    width: '10%'
  },
  {
    title: '学院',
    dataIndex: 'FAcademy',
    width: '15%'
  },
  {
    title: '手机号',
    dataIndex: 'FPhone',
    width: '10%'
  },
  {
    title: 'qq号',
    dataIndex: 'FQQ',
    width: '10%'
  },
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      eachPageNum: 10,
      count: 0,
      data: [],
      selectedRowKeys: [], // Check here to configure the default column
      type: 'white',
      operText: '批量移入黑名单'
    };
    message.config({
      top: 200,
      duration: 1.2,
    });
  }
  componentDidMount(){
    this.getUserList();
  }
  //得到用户列表
  async getUserList(){
    try{
      let re = await Request.post({
        url: '/userManage/getUserList',
        data: {
          page: this.state.page,
          eachPageNum: this.state.eachPageNum,
          type: this.state.type
        },
      });
      if(re.code === 0){
        re.data.forEach((item) => {
          item.key = item.FUserID;
        });
        this.setState({
          count: re.count,
          data: re.data,
          selectedRowKeys: [],

        })
      }else{
        message.error ('页面请求失败！');
      }
    }catch(e){
      message.error('页面请求失败！');
    }
  }
  //分页回调
  onPageChange(pagination) {
    this.setState({
      page: pagination
    }, function(){
      this.getUserList();
    });

  }
  //批量操作
  onSelectChange(selectedRowKeys){
    this.setState({ selectedRowKeys });
  }
  //切换黑白名单
  changeType(type) {
    let operText = '批量移入黑名单';
    if(type === 'black'){
      operText = '批量移入白名单';
    }
    this.setState({
      type: type,
      operText: operText,
      page: 1
    }, function(){
      this.getUserList();
    });
  }
  //对用户进行操作
  async operUser(){
    let type = this.state.type,
        url = '/userManage/blackUser',
        selectedRowKeys = this.state.selectedRowKeys;
    if(type === 'black'){
      url = '/userManage/whiteUser'
    }
    let userID = selectedRowKeys.join(',');
    try{
      let re = await Request.post({
        url: url,
        data: {
          userID: userID
        },
      });
      if(re.code === 0){
        message.success('操作成功！');
        this.setState({
          selectedRowKeys: [],
          page: 1
        },function () {
          this.getUserList();
        })
      }else{
        message.success('操作失败！');
      }
    }catch(e){
      message.error('调用接口失败！');
    }


  }
  render() {
    const user = document.getElementById('sessionUser').value;
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this)
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Layout className="layout">
        <HeaderCommon selectTab="userManage" userName={user}/>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <div style={{ width: "100%", margin: "0 auto" }}>
              用户状态：
              <Select
                value={this.state.type}
                onChange={this.changeType.bind(this)}
                dropdownMatchSelectWidth={false}
              >
                <Option value="white">白名单</Option>
                <Option value="black">黑名单</Option>
              </Select>

                <Button
                  type="primary"
                  onClick={this.operUser.bind(this)}
                  disabled={!hasSelected}
                  style={{marginLeft: '8px'}}
                >
                  {this.state.operText}
                </Button>
                <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
          </span>
              <Table
                style={{marginTop: '8px'}}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.data}
                pagination={{pageSize: this.state.eachPageNum, defaultCurrent: this.state.page, total: this.state.count}}
                onChange={this.onPageChange.bind(this)}
              />
            </div>
          </div>
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}

export default App