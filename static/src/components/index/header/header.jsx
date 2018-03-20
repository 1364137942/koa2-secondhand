import React from 'react'
import '../../../utils/css/base.css'
import '../../../utils/css/icon.css'
import styles from './header.cssmodule.less'

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'activtiveTab': 'indexController/index'
    }
  }
  componentDidMount(){
    let pathname = window.location.pathname;
    this.setState({
      activtiveTab: pathname
    })
  }
  getMainList(){
      this.props.getMainList(1);
  }
  render() {
    return (
      <header className={styles.mainHeader}>
        <div className={styles.headerTop + " clearfix"} style={this.props.isShowSearch ? {'display':'block'} : {'display':'none'}}>
          <div className={styles.logo}>
            <h1>
              <a href=".">
                <img src="/img/logo.jpg" alt="海纳百物•只有精选"/>
              </a>
            </h1>
          </div>
          <div className={styles.searchBox}>
              <div className={styles.selectRoom}>
                <select name="" id="type" className={styles.selectType}>
                  <option value="all">全部</option>
                  <option value="cloth">服装配饰</option>
                  <option value="digital">手机数码</option>
                  <option value="book">图书专区</option>
                  <option value="sport">运动文体</option>
                  <option value="bike">自行车</option>
                  <option value="homeMachine">家用电器</option>
                  <option value="music">乐器</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <input type="text" className={styles.searchInput} id="keyword" placeholder="搜索好物"/>
              <button type="button" className={styles.searchBtn} onClick={this.getMainList.bind(this)}/>
          </div>
        </div>
        <div className={styles.nav} id="js-nav">
          <div className={styles.navBlock}>
            <ul className={styles.subNav}>
              <li className={this.state.activtiveTab.indexOf('/indexController/index') >= 0 ? styles.active: ''}><a href="/indexController/index">首页</a></li>
              <li className={this.state.activtiveTab.indexOf('/wantsController/index') >= 0 ? styles.active: ''}><a href="/wantsController/index">求购</a></li>
              <li className={this.state.activtiveTab.indexOf('/goodsController/editGood') >= 0 ? styles.active: ''}><a href="/goodsController/editGood">发布商品</a></li>
              <li className={this.state.activtiveTab.indexOf('/wantsController/editWant') >= 0 ? styles.active: ''}><a href="/wantsController/editWant">发布求购</a></li>
            </ul>
            <ul className={styles.loginBlock}>
              <li><a href="javascript:void(0);">登录</a></li>
              <li>|</li>
              <li><a href="javascript:void(0);">注册</a></li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
export default HeaderComponent