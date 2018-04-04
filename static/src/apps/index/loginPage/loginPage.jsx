import React from 'react'
import HeaderComponent from '../../../components/index/header/header'
import 'antd/lib/layout/style/css'
import '../../../utils/css/login.css';
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
    this.loginUrl = '/userController/login';
    this.state = {
      forgetPass: false,
      timer: 0,
      timerController: null
    }
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
        },
        idCode: {
          enabled: false,
          validators: {
            notEmpty: {
              message: '验证码不能为空'
            }
          }
        }
      }
    });
  }
  forgetPass(){
    this.setState({
      forgetPass: true
    });
    this.loginUrl = '/userController/forgetPass'
    $('#loginForm').data("bootstrapValidator").enableFieldValidators('idCode', 'enabled');
  }
  async login(){
    let email = document.getElementById('email').value,
        password = document.getElementById('password').value,
        idCode = document.getElementById('idCode').value;

    let re = await Request.post({
      url: this.loginUrl,
      data: {
        email,
        password,
        idCode
      },
    });
    if(re.code === 0){
      if(this.state.forgetPass == true){
        this.setState({
          forgetPass: false
        });
        this.loginUrl = '/userController/login';
        message.info('重置密码成功,请重新登录！');
      }else{
        window.location =  '/indexController/index';
      }

    }else{
      message.error(re.msg);
    }
  }
  async sendIdCode(){
    if(this.state.timer !== 0){
      return;
    }
    let email = document.getElementById('email').value;
    $('#loginForm').data('bootstrapValidator').validateField('email');
    let validFlag = true;
    $('#email').nextAll('i').each((i, item) => {
      // console.log(item);
      if(item.className.indexOf('glyphicon-remove') >= 0){
        validFlag = false;
      }
    });



    if(validFlag){
      let re = await Request.post({
        url: '/userController/sendIDCode',
        data: {
          email
        },
      });
      if(re.code === 0){
        this.setState({
          timer: 60
        });
        let that = this;
        this.timerController = window.setInterval(() => {
          that.setState({
            timer: --that.state.timer
          }, function(){
            console.log(that.state.timer);
            if(that.state.timer == 0){
              window.clearInterval(that.timerController);
            }
          })
        }, 1000)
      }else{
        message.error(re.msg);
      }
    }

  }
  render() {
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className="clearfix" style={{position: 'relative', top: '36px'}}>
          <section className={styles.myContainer}>
          <div className="my-body">
            <form action="javascript: void(0);" id="loginForm" role="form" noValidate="novalidate">
              <div className="form-group has-feedback">
                <div>
                  <label htmlFor="email">账号</label>
                </div>
                <input type="text" id="email" name="email" data-bv-field="email" placeholder="请输入邮箱名"/>
                  <i className="form-control-feedback" data-bv-icon-for="email" style={{display: "none"}}/>
              </div>
              <div className="form-group has-feedback" style={this.state.forgetPass ? {} : {display: 'none'}}>
                <label htmlFor="idCode">邮箱验证码</label>
                <div className="col-lg-5">
                  <input type="text" className="form-control" style={{width: '70%'}} name="idCode" id="idCode" data-bv-field="idCode"/>
                  <button className={"login-btn " + (this.state.timer !== 0 ? 'disabledBtn' : '')} style={{width: '25%', marginLeft: '10px', marginTop: 0}} onClick={this.sendIdCode.bind(this)} >发送{this.state.timer != 0 ? '('+this.state.timer+'s)' : ''}</button>
                </div>
              </div>
              <div className="form-group has-feedback">
                <div><label htmlFor="password">密码</label></div>
                <input type="password" id="password" name="password" data-bv-field="password" placeholder="请输入密码"/>
                  <i className="form-control-feedback" data-bv-icon-for="password" style={{display: "none"}}/>
              </div>
              <div className="form-group has-feedback">
                <button name="send" className="login-btn" onClick={this.login.bind(this)}>{this.state.forgetPass ? '重置密码':'登录'}</button>
              </div>
              <p>
                已有账户？<a className="register" href="javascript: void(0);" onClick={this.forgetPass.bind(this)}>忘记密码</a>

              </p>
            </form>
          </div>
        </section>
        <footer>
          <p className="copyright">&copy; 多赞 All Rights Reserved.</p>
        </footer>
        </section>

      </div>
    )

  }

}

export default App