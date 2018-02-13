import React from 'react'
function getScrollTop(){
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if(document.body){
    bodyScrollTop = document.body.scrollTop;
  }
  if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

//文档的总高度

function getScrollHeight(){
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if(document.body){
    bodyScrollHeight = document.body.scrollHeight;
  }
  if(document.documentElement){
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight(){
  var windowHeight = 0;
  if(document.compatMode == "CSS1Compat"){
    windowHeight = document.documentElement.clientHeight;
  }else{
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}

class PageComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: this.props.page ? this.props.page : 1,
      eachPageNum: this.props.eachPageNum ? this.props.eachPageNum : 10,
      count: this.props.count ? this.props.count : 0,
    };

  }
  componentDidMount(){
    let that = this;
    window.addEventListener('scroll', function(){
      if(getScrollTop() + getWindowHeight() === getScrollHeight() && that.props.duration === false && that.props.leftTime > 0){
          if (that.state.page <= parseInt(that.state.count/that.state.eachPageNum)) {
              that.props.callback.bind(that, that.state.page + 1)();
          }
        }
    }, false);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page ? nextProps.page : 1,
      eachPageNum: nextProps.eachPageNum ? nextProps.eachPageNum : 10,
      count: nextProps.count ? nextProps.count : 0,
    })
  }
  renderPage(){
    let activeI = parseInt((this.state.page)/3),
      pageIndex = this.state.page,
      allPage = Math.ceil(this.state.count/this.state.eachPageNum),
      lastPage = Math.ceil(allPage / 3),
      pageHtml = [];
      if (allPage === 0 ) {
        pageHtml.push('');
        return pageHtml
      }
      else if(allPage === 1){
        pageHtml.push(<div key={0} style="text-align: center; font-size: 16px; color: #999;">---------------- 已经到底了 ----------------</div>);
        return pageHtml;
      }
      let prev = Math.ceil(this.state.page / 3) * 3 - 5;
      pageHtml.push(<a key={'up'} href="javascript:void(0);" onClick={this.props.callback.bind(this, prev > 0 ? prev : 1)}>上一页</a>);
      if(activeI > 3) {
        pageHtml.push(<a key={1} href="javascript:void(0);" onClick={this.props.callback.bind(this, 1)}>1</a>);
        pageHtml.push(<span key="..." className="shenglue-page">...</span>);
      }
      for (let i = (activeI - 3) > 0 ? (activeI - 3) : 0, len = (activeI + 3) < lastPage ? (activeI + 3) : lastPage; i < len; i++) {
        if (i === parseInt((pageIndex -1)/3)) {
          pageHtml.push(<a key={(i + 1)} href="javascript:void(0);" className="active" onClick={this.props.callback.bind(this, (1+(i*3)))}>{(i + 1)}</a>);
        } else {
          pageHtml.push(<a key={(i + 1)} href="javascript:void(0);" onClick={this.props.callback.bind(this, (i*3) + 1)}>{(i + 1)}</a>);
        }
      }
      if(lastPage - activeI > 3){
        pageHtml.push(<span key=".." className="shenglue-page">...</span>);
        pageHtml.push(<a key={lastPage} href="javascript:void(0);" onClick={this.props.callback.bind(this, 1 + (lastPage-1) * 3)}>{lastPage}</a>);
      }
      pageHtml.push(<a key="next" href="javascript:void(0);" onClick={this.props.callback.bind(this, this.state.page + 1 <= (1 + (lastPage-1) * 3) ? this.state.page + 1 : (1 + (lastPage-1) * 3))}>下一页</a>);
      return pageHtml;

  }
  render() {
    return (
      <div className="list-nav clearfix" >
        {this.renderPage.bind(this)()}
      </div>
    )
  }
}


export default PageComponent