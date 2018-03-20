import React from 'react'
import '../../../utils/css/base.css'
import '../../../utils/css/icon.css'
import styles from './aside.cssmodule.less'
import tools from '../../../utils/tools'
import Request from '../../../utils/request'
class AsideComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    this.getNewGoods();
  }
  //得到商品详情
  async getNewGoods(){
    try{
      let re = await Request.get({
        url: '/goodsController/getHotGoods',
      });
      if(re.code === 0){
        this.setState({
          data: re.data
        },function(){
          tools.align(styles.listImg);
        });
      }
    }catch(e){

    }
  }
  render() {
    let children = [];
    this.state.data.forEach((item, i) => {
      let url = "/goodsController/goodDetail?goodID=" + item.FGoodID;
      children.push(
        <li key={i}>
          <a href={url} className={styles.listImg}>
            <img src={item.FGoodImg} alt=""/>
          </a>
          <div className={styles.listDetail}>
            <a href={url} className={styles.title}>{item.FGoodName}</a>
            <div className={styles.price}>
              <span className="red">&yen;{item.FPrice}</span>
            </div>
          </div>
        </li>
      )
    });
    return (
    <aside className={styles.sideBox}>
        <div className={styles.sideBoxTitle}>
          <h3>新发布商品</h3>
        </div>
        <div className={styles.sideBoxContent}>
          <ul className={styles.rankList}>
            {children}
          </ul>
        </div>
      </aside>
    )
  }
}
export default AsideComponent