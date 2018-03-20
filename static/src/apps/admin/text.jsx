import React from 'react'
import '../../utils/css/index.css'
import '../../utils/css/slider.css'
import '../../utils/css/main-list.css'
import '../../utils/css/quanzhibo.css'
import '../../utils/slider'
import Request from '../../utils/request'
import PageComponent from '../../components/common/page'
import HeaderComponent from '../../components/index/header/header'
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
              <span className="quan-price">券后1元</span>
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
        <HeaderComponent isShowSearch={true}/>
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