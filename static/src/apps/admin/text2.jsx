

import React from 'react'
import { Form, Row, Col, Input, Button, Icon, Layout, message, Breadcrumb, Select, Card, Pagination } from 'antd';

import 'antd/lib/layout/style/css';
import Request from './../../utils/request'
const {Content } = Layout;
const Option = Select.Option;
const FormItem = Form.Item;
import HommilyEditor from 'HommilyEditor';
class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.click = this.click.bind(this);


  }
  componentDidMount(){
    let html = `<p><br/></p>
<div style="text-align: center"><img src="//localhost:3001/image/img/ed526bac42341.png"/></div>
<p>&nbsp;&nbsp;&nbsp;&nbsp;4567891</p>
<p>123456</p>
<p>4897</p>
<p>456</p>`;
    const editor = this.refs.editor;
    editor.getFirstBlockText()
    editor.editHandle(html);
  }
  click(){
    const editor = this.refs.editor;


    console.log(editor.getFirstBlockText())
    console.log(editor.getPlainText())
    console.log(editor.saveHandle())
    //const  html = ""; 这里必须是 editor.saveHandle() 的返回值
    //editor.editHandle(html) 从html内容恢复编辑器内容
    //editor.onFocus()  得到焦点
  }
  async uploadImg(file,callback) {
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
  render() {
    return (<div> <HommilyEditor ref="editor" documentId="app" uploadImg = {this.uploadImg.bind(this)} />
      <button onClick={this.click}>点我呀</button>

    </div>);
  }
}

export default App