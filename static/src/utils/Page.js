/**
 * Created by alizjli on 2018/2/12.
 */

const Page = {
  renderPage: function (pageIndex, count){
    let activeI = parseInt((pageIndex)/3),
      lastPage = Math.ceil(count / 3);
    let pageHtml = '';
    if (count === 0 ) {
      pageHtml='';
      return pageHtml
    }
    else if(count === 1){
      pageHtml='<div style="text-align: center; font-size: 16px; color: #999;">---------------- 已经到底了 ----------------</div>';
      return pageHtml;
    }
    pageHtml = '<a href="javascript:void(0);" data-page="up">上一页</a>';
    if(activeI > 3) {
      pageHtml += '<a href="javascript:void(0);" data-page="1">1</a><span className="shenglue-page">...</span>';
    }
    for (let i = (activeI - 3) > 0 ? (activeI - 3) : 0, len = (activeI + 3) < lastPage ? (activeI + 3) : lastPage; i < len; i++) {
      if (i === parseInt((pageIndex)/3)) {
        pageHtml += '<a href="javascript:void(0);" className="active" data-page="' + (1+(i*3)) + '">' + (i + 1) + '</a>';
      } else {
        pageHtml += '<a href="javascript:void(0);" data-page="' +((i*3) + 1) + '">' + (i + 1) + '</a>';
      }
    }
    if(lastPage - activeI > 3){
      pageHtml += '<span className="shenglue-page">...</span><a href="javascript:void(0);" data-page="' + (1 + (lastPage-1) * 3) + '">'+ lastPage + '</a>';
    }
    pageHtml += '<a href="javascript:void(0);" data-page="down">下一页</a>';

    return pageHtml;
  },
  bind: function(dom, callback) {
    //点击翻页
    document.getElementById(dom).querySelector('a').addEventListener('click', function () {
      switch (document.querySelector(this).getAttribute('data-page')) {
        case 'up':
          if (myPageIndex > 1) {
            myPageIndex = myPageIndex - 3;
            callback(myPageIndex);
          }
          break;
        case 'down':
          if (myPageIndex < data.allPage) {
            myPageIndex = myPageIndex + 3;
            callback(myPageIndex);
          }
          break;
        default:
          myPageIndex = document.querySelector(this).getAttribute('data-page');
          callback(myPageIndex);
      }
      // document.querySelector('body').style.scrollTop
      // $('body').animate({
      //   'scrollTop': $('.main-list').offset().top - 55
      // });
    }, false);
  },
  scroll: function(){
    document.body.addEventListener('scroll', function(){
      var pageTop = document.body.offsetHeight;
      var hasScrollTop=window.pageYOffset+window.innerHeight;
      if (pageTop<hasScrollTop) {
        if (window.leftTime>0 && !window.duration) {
          window.duration=true;
          window.leftTime--;
          if (myPageIndex < data.allPage) {
            myPageIndex++;
            $.ajax({
              url: uri + myPageIndex,
              method: 'get',
              success:function (data) {
                var data=JSON.parse(data);
                setTimeout(function () {
                  $('.main-list').html(function () {
                    return $(this).html()+parseData(data);
                  });
                  window.duration=false;
                },300);
              }
            });
          }
        }
      }
    }, false);
  }
};
export default Page;
