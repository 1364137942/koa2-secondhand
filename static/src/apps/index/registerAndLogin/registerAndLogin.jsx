import React from 'react'
import styles from './registerAndLoginComponent.cssmodule.less'
import HeaderComponent from '../../../components/index/header/header'
class RegisterAndLoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: 'login'
    }

  }
  componentWillMount(){
    let type = document.getElementById('type').innerText;
    this.setState({
      type: type === 'login' ? 'login' : 'register'
    })
  }

  render() {
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className={styles.container}>
          <div className={styles.loginBlock}>
            <form action="">
              <form action="">登录</form>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
export default RegisterAndLoginComponent