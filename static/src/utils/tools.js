
let Global = window

const tools = {

  getUrlParam( name ) {
    if (typeof name === 'undefined') {
      return null
    }

    let paramReg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    let value = window.location.search.substr(1).match(paramReg)
    if (value != null) {
      return unescape(value[2])
    }

    return false
  },

  redirect( url ) {
    Global.location.href = url
  },

  loadJs(url, callback) {
    let _script = document.createElement('script')
    _script.src = url
    callback = callback || function(){}

    if(navigator.userAgent.indexOf("MSIE")>0){
      _script.onreadystatechange = function(){
        if('loaded' === this.readyState || 'complete' === this.readyState){
          callback()
          this.onload = this.onreadystatechange = null
          this.parentNode.removeChild(this)
        }
      }
    }else{
      _script.onload = function(){
        callback()
        this.onload = this.onreadystatechange = null
        this.parentNode.removeChild(this)
      }
    }

    document.getElementsByTagName('head')[0].appendChild(_script)
  },
  align(className) {
    let doms = document.getElementsByClassName(className),
      len = doms.length;
    for (let i = 0; i < len; i++) {
      var item = doms[i];
      let oimg = item.querySelector('img');
      let tmpImg = new Image();
      tmpImg.onload = function(){
        let imgWidth = this.width,
          imgHeight = this.height,
          aWidth = item.clientWidth,
          aHeight = item.clientHeight;
        if (imgWidth / imgHeight > aWidth / aHeight) {
          imgWidth *= aHeight / imgHeight;
          let offset = (imgWidth - aWidth) / 2;
          oimg.style.position = 'absolute';
          oimg.style.width = imgWidth + 'px';
          oimg.style.height = aHeight + 'px';
          oimg.style.left = -offset + 'px';
          oimg.style.top = 0;
        } else {
          imgHeight *= aWidth / imgWidth;
          let offset = (imgHeight - aHeight) / 2;
          oimg.style.position = 'absolute';
          oimg.style.width = aWidth + 'px';
          oimg.style.height = imgHeight + 'px';
          oimg.style.left = 0;
          oimg.style.top = -offset + 'px';
        }
      };
      tmpImg.src = oimg.getAttribute('src');
    }

  }
};


export default tools
