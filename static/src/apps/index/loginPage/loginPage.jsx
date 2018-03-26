import React from 'react'
import HeaderComponent from '../../../components/index/header/header'
import 'antd/lib/layout/style/css'
import '../../../utils/css/login.css';
import logo from '../../../utils/img/logo_big.png';
import styles from './loginPage.cssmodule.less'
import { message } from 'antd'

import Request from '../../../utils/request'
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    message.config({
      top: 200,
      duration: 1.2,
    });
  }
  componentDidMount(){
    $('#loginForm').bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        email:{
          validators: {
            notEmpty: {
              message: '邮箱不能为空'
            },
            emailAddress: {
              message: '请输入正确的邮件地址如：123@qq.com'
            }
          }

        },
        password: {
          validators: {
            notEmpty: {
              message: '密码不能为空'
            }
          }
        }
      }
    });
  }
  async login(){
    let email = document.getElementById('email').value,
        password = document.getElementById('password').value;
    let re = await Request.post({
      url: '/userController/login',
      data: {
        email,
        password
      },
    });
    if(re.code === 0){
      window.location = '/indexController/index'
    }else{
      message.error('用户名或密码错误！');
    }
  }
  render() {
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className="clearfix" style={{position: 'relative', top: '36px'}}>
          <section className={styles.myContainer}>
          <div className="my-heading">
            <h1 className="title">多赞</h1>
            <img src={logo} alt="多赞"/>
          </div>
          <div className="my-body">
            <form action="javascript: void(0);" id="loginForm" role="form" noValidate="novalidate">
              <div className="form-group has-feedback">
                <div>
                  <label htmlFor="email">账号</label>
                </div>
                <input type="text" id="email" name="email" data-bv-field="email" placeholder="请输入邮箱名"/>
                  <i className="form-control-feedback" data-bv-icon-for="email" style={{display: "none"}}/>
              </div>
              <div className="form-group has-feedback">
                <div><label htmlFor="password">密码</label></div>
                <input type="password" id="password" name="password" data-bv-field="password" placeholder="请输入密码"/>
                  <i className="form-control-feedback" data-bv-icon-for="password" style={{display: "none"}}/>
              </div>
              <div className="form-group has-feedback">
                <button name="send" className="login-btn" onClick={this.login.bind(this)}>登录</button>
              </div>
              <p>还没账户？<a className="register" href="/userController/register">免费注册</a></p>
            </form>

          </div>
        </section>

        <footer>
          <p className="copyright">&copy; SecondHand All Rights Reserved.</p>
        </footer>
        </section>

      </div>
    )

  }

}

export default App