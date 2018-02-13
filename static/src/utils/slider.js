/**
 * Created by alizjli on 2018/2/11.
 */
/**
 * Created by ali on 2016-8-3.
 */

//委托函数
function fnCall(fn, obj, args){
  return function(){
    fn.apply(obj, args);
  }
}

//轮播
(function(global, factory){
  factory(global);
}(window, function(global){
  global.Slide = function(){
    this.slider = document.getElementById('slider');
    this.banner = document.getElementById('banner');
    this.ul = this.banner.getElementsByTagName('ul')[0];
    this.lis = this.ul.children;
    this.spans = null; //导航小点
    this.nav = this.slider.querySelector(".nav-dot");//导航容器
    this.currIndex = 0;
    this.direction = true;  //用来实现来回滚动的
    this.time = '';
  };
  Slide.prototype.init = function(url){
    var self = this;

    //在末尾加上一张图片
    self.ul.appendChild(self.lis[0].cloneNode(true));
    //this.banner.style.width = window.innerWidth + 'px';
    self.banner.style.margin = '0 auto';
    self.ul.style.width = self.banner.clientWidth * self.lis.length + 'px';
    for(var i = 0; i<self.lis.length; i++){
      self.lis[i].style.width = self.banner.clientWidth + 'px';
    }
    // self.align();
    //    },
    //    error:function () {
    //        alert('获取数据失败，请重试');
    //    }
    //});

    //初始化导航小点
    var documentFragment = document.createDocumentFragment();
    for(var i = 0; i< 2 ; i++){
      var span = document.createElement('span');
      span.index = i;
      documentFragment.appendChild(span);
    }
    this.nav.appendChild(documentFragment);
    this.nav.style.width = 2*(10+2*2) + 'px';
    //导航小点的集合
    this.spans = this.nav.getElementsByTagName('span');

    for(var i = 0; i<this.spans.length;i++){
      this.spans[i].onclick = function(i){
        return function(e){
          self.currIndex = i;
          self.slide();
        }
      }(i);
    }
    this.slider.addEventListener('mouseover',function(){
      self.stop();
    },false);

    this.slider.addEventListener('mouseleave',function(){
      self.time = setInterval(fnCall(self.slide, self),3000);
    },false);

    return this;
  };

  Slide.prototype.run = function(){
    this.time = setInterval(fnCall(this.slide, this),3000);
    this.spans[0].style.background = '#303d41';
    return this;
  };
  Slide.prototype.stop = function(){
    clearInterval(this.time);
    return this;
  };
  Slide.prototype.start = function () {
    var self = this;
    self.time = setInterval(fnCall(self.slide, self),3000);
  };
  Slide.prototype.navColor = function(){
    for(var i = 0;i<this.spans.length;i++){
      if(i != this.currIndex){
        this.spans[i].style.background = '#d2d2d2';
      }else{
        this.spans[i].style.background = '#303d41';
      }
    }
    return this;
  };

  Slide.prototype.slide = function(dir){
    var self = this;
    this.navColor();
    if(this.currIndex == this.lis.length-1){
      this.spans[0].style.background = '#303d41';
      setTimeout(function(){
        self.currIndex = 0;
        self.navColor();
        self.ul.style.transition = 'none';
        self.ul.style.marginLeft = '0px';
      },800);
    }else if(this.ul.style.transition == 'none'){
      this.ul.style.transition = 'all 0.8s ease-in-out';
    }
    dir = dir || false;
    if(dir){
      this.ul.style.marginLeft = -(this.banner.clientWidth * (dir == 'toleft' ? (this.currIndex - 1 > -1 ? this.currIndex-- : 0) : (this.currIndex + 1 > this.lis.length-1 ? this.currIndex : this.currIndex++))) + 'px';
    }else{
      this.ul.style.marginLeft = -(this.banner.clientWidth * (this.direction ? this.currIndex++ : this.currIndex--)) + 'px';
    }
    return this;
  };
  Slide.prototype.templateEngine = function(template, json) {
    var pattern = /\[(\w*[:]*[=]*\w+)\](?!})/g;
    return template.replace(pattern, function (match, key, value) {
      return json[key];
    });
  };
  // Slide.prototype.align = function(){
  //   $('.slider').each(function (index,value) {
  //     var oimg=$(this).find('img');
  //     $("<img/>").attr("src", oimg.attr("src")).load(function() {
  //       var imgWidth = this.width;
  //       var imgHeight = this.height;
  //       if(imgWidth > imgHeight){
  //         oimg.css({'width': '100%', 'height': 'auto'});
  //       }else{
  //         oimg.css({'height': '100%', 'width': 'auto'});
  //       }
  //       $(this).remove();
  //     });
  //   });
  //   return this;
  // };
  window.fn = function(){
    return new Slide();
  }
}));



