import React from 'react'
import '../../../utils/css/index.css'
import '../../../utils/css/slider.css'
import '../../../utils/css/main-list.css'
import '../../../utils/css/quanzhibo.css'
import '../../../utils/slider'
import tools from '../../../utils/tools'
import Request from '../../../utils/request'
import PageComponent from '../../../components/common/page'
import HeaderComponent from '../../../components/index/header/header'
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';
    this.duration = false;
    this.state = {
      page: 1,
      eachPageNum: 20,
      data: [],
      count: 0,
      children: []
    };
    this.state.leftTime = 2;
    this.state.duration = false;

  }
  componentDidMount(){
    //渲染轮播图
    let Slider = fn();
    Slider.init().run();
    this.getMainList(1);
  }

  async getMainList(pageIndex) {
    window.scrollTo(0,0);
    let searchType =  document.getElementById('type').value,
      searchGoodName = document.getElementById('keyword').value;

    let re = await Request.post({
      url: '/goodsController/getGoodsList',
      data: {
        page: pageIndex,
        eachPageNum: this.state.eachPageNum,
        searchGoodName: searchGoodName,
        searchType: searchType,

      },
    });
    if (re.code === 0) {
      this.setState({
        page: pageIndex,
        data: re.data,
        count: re.count
      }, this.renderGoodsList)
    }

  }

  renderGoodsList(){
    let data = this.state.data;
    let children = [];
    data.forEach((item, i) => {
      let goodDetailUrl = "/goodsController/goodDetail?goodID="+ item.FGoodID;
      children.push(
        <li key={i}>
          <dl>
            <dt>
              <a className="quan-img" rel="nofollow" target="_blank" href={goodDetailUrl} ><img src={"/image/img/微信图片_20180306113005.jpg"} alt=""/></a>
              <span className="quan-price">{item.FOutDay}天后下架</span>
            </dt>
            <dd>
              <p className="quan-title common-ellipsis"><a rel="nofollow" target="_blank" href="http://uland.taobao.com/coupon/edetail?activityId=78eb3ff06ab441ee85f2de2ca7ebba2f&amp;pid=mm_33147135_20914365_78904298&amp;itemId=520435460246&amp;dx=1">{item.FGoodName}</a></p>
              <p className="quan-detail">
                <span className="quan-tips"><span>出</span><span>{item.FPrice}元</span></span>
                <a className="quan-link" rel="nofollow" target="_blank" href="http://uland.taobao.com/coupon/edetail?activityId=78eb3ff06ab441ee85f2de2ca7ebba2f&amp;pid=mm_33147135_20914365_78904298&amp;itemId=520435460246&amp;dx=1">前往抢购</a>
              </p>
            </dd>
          </dl>
        </li>
      )
    });

    this.setState({
      children: children,
      duration: false,
      leftTime: 2
    }, function () {
      tools.align('quan-img');
    });

    // if(this.state.leftTime > 0 && (this.state.page - 1) % 3 !== 0){
    //
    //   this.setState({
    //     children: [
    //       this.state.children,
    //       ...children
    //     ],
    //     duration: false,
    //     leftTime: (this.state.leftTime - 1)
    //   }, function () {
    //     tools.align('quan-img');
    //   });
    //
    // }else{
    //   this.setState({
    //     children: children,
    //     duration: false,
    //     leftTime: 2
    //   }, function () {
    //     tools.align('quan-img');
    //   });
    // }
  }
  render() {
    return (
      <div>
        <HeaderComponent isShowSearch={true} getMainList={this.getMainList.bind(this)}/>
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