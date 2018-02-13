import React from 'react'

import Request from '../../../utils/request'
const E = require('wangeditor');
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';
    this.postData = {
      img: '',
      goodName: '',
      price: '',
      type: '',
      saleDate: '',
      desc: ''
    };
    this.state = {
      preImg: '', //预览的封面
    }
  }
  componentDidMount(){
    this.editor = new E('#editor');
    this.editor.customConfig.uploadFileName = 'img';
    this.editor.customConfig.uploadImgServer = '/admin/uploadFile';
    this.editor.create();
    this.editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'undo',  // 撤销
      'redo'  // 重复
    ]
    this.editor.txt.html(`<p>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="//localhost:3001/image/img/57d4978385121.png" style="max-width:100%;"><br></p><p><i>123</i></p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>456</b></p><p>123</p><p>456</p><p>&lt;script&gt;alert(123);&lt;/script&gt;</p>`);
  }


  async uploadImg(e) {
    if(e.target.value === ''){
      return;
    }
    let file = e.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.readAsDataURL(file);//发起异步请求
    reader.onload = function(){
      //读取完成后，数据保存在对象的result属性中
      that.setState({
        img: this.result
      })
    };
    return;
    // file 是 inputfile对象 需要上传以后，拿到 图片的url 传给callback
    let form_data = new FormData();
    form_data.append("img", file);
    let re = await Request.file({
      url: '/admin/uploadFile',
      // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      data: form_data
    });
    console.log(re);

    callback(re.data.pictureUrl);
  }
  getHtml(){
    console.log(this.editor.txt.html());
  }
  render() {
    return <div>
      商品名：<input type="text"/>
      商品封面：<label htmlFor="img">添加图片</label><input id="img" type="file" onChange={this.uploadImg.bind(this)} style={{display: 'none'}}/>
      <div style={{width: '180px', height: '180px', border: '1px solid #ccc', backgroundImage: "url(" + this.state.img + ")", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>
      </div>
      商品价格：<input type="text"/>
      商品类型：<input type="text"/>
      商品上架天数：<input type="text"/>
      商品描述
      <div id="editor"></div>
      <button onClick={this.getHtml.bind(this)}>获得内容</button>
      <div style={{width: '180px', width: '180px', lineHeight: '180px', textAlign: 'center', backgroundImage: "url(//localhost:3001/image/img/6bea46b53c85f.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>
          456
      </div>
      </div>

  }

}

export default App