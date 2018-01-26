import React from 'react'
import { Layout, Menu, Breadcrumb, Tabs, Form, Icon, Input, Button, Checkbox, message } from 'antd'
import FooterCommon from '../../components/admin/footer/footer'
import HeaderCommon from '../../components/admin/header/header'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane
import 'antd/lib/layout/style/css'
import Request from './../../utils/request'
const {Content } = Layout

class App extends React.Component {
   async handleSubmit(e) {
     e.preventDefault();
     let values = await this.getFormValues();
     if ( values ) {
       let result = await Request.post({
         url: '/admin/login',
         data: values,
       });
       if(result.code === 0){
         window.location = '/userManage/getUser'
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
    return (
      <Layout className="layout">
        <HeaderCommon />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>管理员登录</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <div style={{ width: "640px", margin: "0 auto" }}>
              <Tabs defaultActiveKey="1" size="small">
                <TabPane tab="登录" key="1">
                  <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                    <FormItem>
                      {getFieldDecorator('user', {
                        rules: [{ required: true, message: '请您输入账号名称！' }],
                      })(
                        <Input addonBefore={<Icon type="user" />} placeholder="请您输入用户名称！" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请您输入账号密码！' }],
                      })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请您输入账号密码" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                      </Button>
                    </FormItem>
                  </Form>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}
App = Form.create({})(App);

export default App