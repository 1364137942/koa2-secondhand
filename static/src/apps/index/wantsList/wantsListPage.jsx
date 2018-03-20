import React from 'react'
import '../../../utils/css/index.css'
import '../../../utils/css/main-list.css'
import '../../../utils/css/quanzhibo.css'
import tools from '../../../utils/tools'
import Request from '../../../utils/request'
import styles from './wantsListPage.cssmodule.less'
import PageComponent from '../../../components/common/page'
import HeaderComponent from '../../../components/index/header/header'
import AsideComponent from '../../../components/index/aside/aside'
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';
    this.duration = false;
    this.state = {
      page: 1,
      eachPageNum: 30,
      goodName: '',
      data: [],
      count: 0,
      children: [],
      leftTime: 2,
      duration: false
    };
  }
  componentDidMount(){
    //渲染轮播图
    this.getMainList(1);
  }

  async getMainList(pageIndex) {
    window.scrollTo(0,0);
    let searchType =  document.getElementById('type').value,
      searchGoodName = document.getElementById('keyword').value;
    if (this.state.leftTime >= 0 && this.state.duration === false) {
      let re = await Request.post({
        url: '/wantsController/getWantsList',
        data: {
          page: pageIndex,
          eachPageNum: this.state.eachPageNum,
          searchType: searchType,
          searchGoodName: searchGoodName,
        },
      });
      if (re.code === 0) {
        this.setState({
          page: pageIndex,
          data: re.data,
          count: re.count
        }, this.renderWantsList)
      }
    } else {
      this.setState({leftTime: 2});
    }
  }

  renderWantsList() {
    let data = this.state.data;
    let children = [];
    data.forEach((item, i) => {
      let subText = item.FDesc.replace(/<.*?>/g, function () {
        return '';
      });
      subText = subText.substring(0, 100) + '...';
      let matchImg = item.FDesc.match(/<img.*src="(.*)">/);
      let url = "/wantsController/wantDetail?wantID=" + item.FWantID;
      children.push(
        <li className={styles.itemBlock} key={i}>
          <dl className="clearfix">
            <dt className={styles.itemTitle}><a href={url}>{item.FGoodName}</a></dt>
            <dd className={styles.itemDetail}>
              {matchImg && matchImg.length >= 2 ?
                <div className={styles.wantImg}><img src={matchImg[1]} alt="求购图片"/></div> : ``}
              <p>
                {subText}
              </p>
              <ul className="clearfix">
                <li>{item.FUserName}</li>
                <li><span style={{border: '1px solid #ccc', padding: '2px'}}>{item.FTypeName}</span></li>
                <li style={{color: 'red'}}>{item.FOutDay}天后过期</li>
              </ul>
            </dd>
          </dl>
        </li>
      )
    });

    let that = this;
    that.setState({
      children: children,
      duration: false,
      leftTime: 2
    }, function () {
      tools.align(styles.wantImg);
    });
  }
  render() {
    return (
      <div>
        <HeaderComponent isShowSearch={true} getMainList={this.getMainList.bind(this)}/>
        <section className="wrap clearfix" style={{position: 'relative', top: '162px'}}>
          {/*<ul id="content">*/}
            {/*{this.state.children}*/}
          {/*</ul>*/}
          <div className={styles.mainList}>
            <ul>
              {this.state.children}
            </ul>
            <PageComponent page={this.state.page} eachPageNum={this.state.eachPageNum} count={this.state.count} callback={this.getMainList.bind(this)} duration={this.state.duration} leftTime={this.state.leftTime}/>
          </div>

          <AsideComponent/>
        </section>

      </div>
    )

  }

}

export default App