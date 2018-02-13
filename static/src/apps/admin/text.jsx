import React from 'react'
import '../../utils/css/base.css'
import '../../utils/css/icon.css'
import '../../utils/css/index.css'
import '../../utils/css/slider.css'
import '../../utils/css/main-list.css'
import '../../utils/css/quanzhibo.css'
import '../../utils/slider'
import Page from '../../utils/Page'
import Request from '../../utils/request'
import PageComponent from '../../components/common/page'
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';
    this.duration = false;
    this.state = {
      page: 1,
      eachPageNum: 10,
      goodName: '',
      data: [],
      count: 0,
      children: []
    };
    this.state.leftTime = 2;
    this.state.duration = false;

  }
  componentDidMount(){
    let Slider = fn();
    Slider.init().run();
    this.getMainList(1);
  }

  async getMainList(pageIndex) {
    console.log(pageIndex);
    if (this.state.leftTime >= 0 && this.state.duration === false) {
      let re = await Request.post({
        url: '/goodsController/getGoodsList',
        data: {
          page: pageIndex,
          eachPageNum: this.state.eachPageNum,
          goodName: this.state.goodName,
        },
      });
      if (re.code === 0) {
        this.setState({
          page: pageIndex,
          data: re.data,
          count: re.count
        }, this.renderGoodsList)
      }
    } else {
      this.setState({leftTime: 2});
    }
  }

  renderGoodsList(){
    let data = this.state.data;
    let children = [];
    data.forEach((item, i) => {
      children.push(
        <li key={i}>
          <dl>
            <dt>
              <a className="quan-img" rel="nofollow" target="_blank" href="http://uland.taobao.com/coupon/edetail?activityId=78eb3ff06ab441ee85f2de2ca7ebba2f&amp;pid=mm_33147135_20914365_78904298&amp;itemId=520435460246&amp;dx=1"><img src="/image/img/6bea46b53c85f.jpg" alt=""/></a>
              <span className="quan-price">券后15元</span>
            </dt>
            <dd>
              <p className="quan-title common-ellipsis"><a rel="nofollow" target="_blank" href="http://uland.taobao.com/coupon/edetail?activityId=78eb3ff06ab441ee85f2de2ca7ebba2f&amp;pid=mm_33147135_20914365_78904298&amp;itemId=520435460246&amp;dx=1">【买2送1】天然野生桃胶食用桃花泪搭配雪莲子皂角米雪燕银耳伴侣</a></p>
              <p className="quan-detail">
                <span className="quan-tips"><span>领</span><span>20元券</span></span>
                <a className="quan-link" rel="nofollow" target="_blank" href="http://uland.taobao.com/coupon/edetail?activityId=78eb3ff06ab441ee85f2de2ca7ebba2f&amp;pid=mm_33147135_20914365_78904298&amp;itemId=520435460246&amp;dx=1">前往抢购</a>
              </p>
            </dd>
          </dl>
        </li>
      )
    });

    if(this.state.leftTime > 0 && (this.state.page - 1) % 3 !== 0){

      this.setState({
        children: [
          this.state.children,
          ...children
        ],
        duration: false,
        leftTime: (this.state.leftTime - 1)
      });

    }else{
      document.body.scrollTop = 0;
      this.setState({
        children: children,
        duration: false,
        leftTime: 2
      });
    }
  }




  render() {
    return (
      <div>
        <header className="main-header" style={{position: 'fixed', top: 0, left: 0, zIndex: 99999, width: '100%', }}>
          <div className="header-top clearfix" style={{background: '#fff', marginTop: 0}}>
            <div className="logo">
              <h1>
                <a href=".">
                  <img src="/img/logo.jpg" alt="海纳百物•只有精选"/>
                </a>
              </h1>
            </div>

            <div className="search-box">
              <form>
                <div className="select-room">
                  <select name="" id="type" className="select-type">
                    <option value="1">全部</option>
                    <option value="2">其他</option>
                    <option value="3">數據</option>
                    <option value="4">撒</option>
                  </select>
                </div>
                <input type="text" className="search-input" id="js-keyword" placeholder="搜索好物"/>
                <button type="submit" className="search-btn" id="js-search-btn"/>
              </form>
            </div>
          </div>
          <div className="nav" id="js-nav">

            <div className="sub-nav">
              <ul>
                <li className="active"><a href="/">首页</a></li>
                <li><a href="/bao">爆优惠</a></li>
                <li><a href="/inside">国内精选</a></li>
                <li><a href="/haiwai">海淘商城</a></li>
              </ul>
            </div>
          </div>
        </header>
        <section className="wrap clearfix" style={{position: 'relative', top: '90px'}}>
            <div id="slider">
              <div className="slider-header">

                <div id="sliderContent">
                  <div className="slider-nav">
                    <div className="nav-dot">
                    </div>
                  </div>
                  <div id="banner" style={{margin: "0px auto"}}>
                    <ul style={{marginLeft: "0px", transition: "none"}}>
                      <li className="single-slider" style={{width: "100%"}}>
                        <img src="/image/ba1.jpg" alt="" width="100%"/>
                      </li>
                      <li className="single-slider" style={{width: "750px"}}>
                        <img src="/image/ba2.jpg" alt="" width="100%"/>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          <ul id="content">
            {this.state.children}
          </ul>
          <PageComponent page={this.state.page} eachPageNum={this.state.eachPageNum} count={this.state.count} callback={this.getMainList.bind(this)} duration={this.state.duration} leftTime={this.state.leftTime}/>
        </section>

      </div>
    )

  }

}

export default App