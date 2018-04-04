import React from 'react'
import HeaderComponent from '../../../components/index/header/header'
import 'antd/lib/layout/style/css'
import '../../../utils/css/login.css';
import styles from './register.cssmodule.less'
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
    $('#registerForm').bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        nickname: {
          message: '用户昵称验证失败',
          validators: {
            notEmpty: {
              message: '用户昵称不能为空'
            },
            stringLength: {
              min: 3,
              max: 14,
              message: '用户昵称长度必须在3到14位之间'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_]+$/,
              message: '用户昵称只能包含大写、小写、数字和下划线'
            }
          }
        },
        password: {
          message: '密码验证错误',
          validators: {
            notEmpty: {
              message: '密码不能为空'
            },
            stringLength: {
              min: 6,
              max: 20,
              message: '密码长度必须在6到20位之间'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_\+\-\.]+$/,
              message: '密码只能包含大写、小写、数字、下划线、+、-和.'
            }
          }
        },
        email: {
          validators: {
            notEmpty: {
              message: '邮件不能为空'
            },
            emailAddress: {
              message: '请输入正确的邮件地址如：123@qq.com'
            }
          }
        },
        qq: {
          validators: {
            notEmpty: {
              message: 'QQ号不能为空'
            },
            numeric: {
              message: 'QQ号必须是数字'
            }
          }
        },
        idCode: {
          validators: {
            notEmpty: {
              message: '验证码不能为空'
            }
          }
        }
      }
    })
  }
  async register(){
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
        <section className="clearfix" style={{position: 'relative', top: '84px'}}>
          <section className={styles.myContainer}>
            <div className="my-body">
              <form action="javascript:void(0)" method="post" id="registerForm" role="form" noValidate="novalidate">
                <div className="form-group has-feedback">
                  <div>
                    <label htmlFor="username">用户昵称</label>
                  </div>
                  <input type="text" id="username" name="username" data-bv-field="username" placeholder="请输入用户昵称"/>
                    <i className="form-control-feedback" data-bv-icon-for="email" style={{display: "none"}} />
                </div>
                <div className="form-group has-feedback">
                  <div><label htmlFor="password">密码</label></div>
                  <input type="password" id="password" name="password" data-bv-field="password" placeholder="请输入密码"/>
                    <i className="form-control-feedback" data-bv-icon-for="password" style={{display: "none"}} />
                </div>
                <div className="form-group has-feedback">
                  <label htmlFor="email">邮箱</label>
                  <div className="col-lg-5">
                    <input type="text" className="form-control" name="email" id="email" data-bv-field="email" placeholder="请输入邮箱"/>
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label htmlFor="idCode">邮箱验证码</label>
                  <div className="col-lg-5">
                    <input type="text" className="form-control" style={{width: '70%'}} name="idCode" id="idCode" data-bv-field="idCode"/>
                    <button className="login-btn" style={{width: '25%', marginLeft: '10px', marginTop: 0}}>发送</button>
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label htmlFor="studentID">学生号</label>
                  <div className="col-lg-5">
                    <input type="text" className="form-control" name="studentID" id="studentID" placeholder="请输入广外学生号"
                           data-bv-field="studentID"/>
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label htmlFor="studentPass">学号密码</label>
                  <div className="col-lg-5">
                    <input type="text" className="form-control" name="studentPass" id="studentPass" placeholder="请输入数字广外登录密码"
                           data-bv-field="studentPass"/>
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <button name="send" className="login-btn" onClick={this.register.bind(this)}>注册</button>
                </div>
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