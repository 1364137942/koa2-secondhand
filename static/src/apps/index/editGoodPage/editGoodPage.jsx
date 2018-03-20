import React from 'react'
import 'antd/lib/layout/style/css'
import HeaderComponent from '../../../components/index/header/header'
import styles from './editGoodPage.cssmodule.less'
import Request from '../../../utils/request'
const E = require('wangeditor');
import { Layout, Menu, Breadcrumb, Tabs,Select, Form, Icon, Input, Button, message, Upload } from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

function beforeUpload(file) {
  const allowType = ['image/png', 'image/jpeg'];
  let isAllowType = (allowType.indexOf(file.type) > -1)
  if (!isAllowType) {
    message.error('只能上传jpeg和png格式文件');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('图片大小需要小于3m');
  }
  return isAllowType && isLt3M;
}

class App extends React.Component {
  constructor(props, context){
    super(props, context);
    this.editor = '';

    this.postData = {
      goodName: '',
      price: '',
      goodType: '',
      saleDate: '',
      desc: '',
      imageUrl: '',
      old: ''
    };
    this.url = '/goodsController/addGood';
    this.state = {
      preImg: '', //预览的封面
      // imageUrl: '', //封面
      loading: false,
      imageUrl: '',
      goodName: '',
      price: '',
      goodType: '',
      saleDate: '',
      desc: '',
      old: ''
    };
    message.config({
      top: 200,
      duration: 1.2,
    });
  }
  componentDidMount(){
    //初始化商品类型选择
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
    ];
    this.editor.txt.html('');
    let goodID = document.getElementById('goodID').getAttribute('data-value');
    this.fillForm(goodID);

  }
  async fillForm(goodID){
    if(goodID !== ''){
      this.url = '/goodsController/modifyGood';
      let re = await Request.post({
        url: '/goodsController/getGoodDetail',
        data: {
          goodID
        },
      });
      if(re.code === 0){
        this.setState({
          imageUrl: re.data.FGoodImg,
          goodName: re.data.FGoodName,
          price: re.data.FPrice,
          goodType: re.data.FType,
          saleDate: re.data.FSaleDay,
          old: re.data.FOld
        });
        this.postData.goodID = goodID;
        this.editor.txt.html(re.data.FDesc);
      }
    }
  }
  async handleChange(info){
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.data[0],
        loading: false,
      });
    }
  }

  getHtml(){
    let html = this.editor.txt.html()
    let text =  html.replace(/<.*?>/g, function () {
      return '';
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    let values = await this.getFormValues();
    if ( values ) {
      this.postData.goodName = values.goodName;
      this.postData.goodType = values.goodType;
      this.postData.saleDate = values.saleDate;
      this.postData.price = values.price;
      this.postData.old = values.old;
      this.postData.imageUrl = this.state.imageUrl;
      this.postData.desc = this.editor.txt.html();

      let result = await Request.post({
        url: this.url,
        data: this.postData,
      });
      if(result.code === 0){
        message.info( 'success！' )
      }else{
        message.error( '商品添加失败！' )
      }
    } else {
      message.error( '系统繁忙，稍后再试！' )
    }

  }
  getFormValues() {
    let that = this;
    return new Promise((resolve, reject) => {
      that.props.form.validateFields((err, values) => {
        if (!err) {
          resolve( values )
        } else {
          reject( false )
        }
      })
    })
  }
  checkNumber(rule, value, callback){
    const pattern = /^(0{1}.{1}(([1-9]{1}\d{0,1})|(\d{1}[1-9]{1})))$|^([1-9]{1}\d*.{0,1}\d{0,2})$/;
    if (pattern.test(value) === false) {
      callback('请输入正确数字！')
    }
    callback()
  }
  renderGoodTypeList(goodTypeList){
    let children = [];
    goodTypeList.forEach((item, key) => {
      children.push(
        <Option value={item.FKey} key={key}>{item.FShowName}</Option>
      )
    });
    return children;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 3 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const goodTypeList = JSON.parse(document.getElementById('goodType').getAttribute('data-value'));
    return (
      <div>
        <HeaderComponent isShowSearch={false}/>
        <section className={styles.editContainer}>
          <h1>编辑商品</h1>
          <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
            <FormItem
              {...formItemLayout}
              label="商品名："
            >
              {getFieldDecorator('goodName', {
                rules: [
                  { required: true, message: '请您输入商品名称！', whitespace: true },
                  {max: 32, message: '最长32个字！'}
                  ],
                validateFirst: true,
                initialValue: this.state.goodName
              })(
                <Input placeholder="请您输入商品名称！"  />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品封面："
            >
              <Upload
                name="img"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/admin/uploadFile"
                beforeUpload={beforeUpload}
                onChange={this.handleChange.bind(this)}
              >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" style={{width: '200px', height: '200px'}}/> : uploadButton}
              </Upload>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品价格："
            >
              {getFieldDecorator('price', {
                rules: [
                  { required: true, message: '请输入商品价格！', whitespace: true },
                  {validator: this.checkNumber}
                ],
                validateFirst: true,
                initialValue: this.state.price
              })(
                <Input placeholder="请输入商品价格！" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品类型："
            >
              {getFieldDecorator('goodType', {
                rules: [{ required: true, message: '请选择商品类型！', whitespace: true },],
                initialValue: this.state.goodType
              })(
                <Select
                  dropdownMatchSelectWidth={false}
                >
                  {this.renderGoodTypeList.bind(this,goodTypeList)()}
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否全新："
            >
              {getFieldDecorator('old', {
                rules: [{ required: true, message: '请选择商品新旧类型！', whitespace: true },],
                initialValue: this.state.old.toString()
              })(
                <Select
                  dropdownMatchSelectWidth={false}
                >
                  <Option value="0" >非全新</Option>
                  <Option value="1" >全新</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="上架天数："
            >
              {getFieldDecorator('saleDate', {
                rules: [{ required: true, message: '请选择商品上架天数！', whitespace: true },],
                initialValue: this.state.saleDate.toString()
              })(
                <Select
                  dropdownMatchSelectWidth={false}
                >
                  <Option value="7" >7天</Option>
                  <Option value="15">15天</Option>
                  <Option value="30">30天</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="商品描述："
            >
            </FormItem>
            <div id="editor"><p>请输入内容</p></div>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                确定
              </Button>
            </FormItem>
          </Form>

          <button onClick={this.getHtml.bind(this)}>获得内容</button>
          <div style={{width: '180px', lineHeight: '180px', textAlign: 'center', backgroundImage: "url(//localhost:3001/image/img/6bea46b53c85f.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>
            456
          </div>
        </section>
      </div>
    )
  }

}
App = Form.create({})(App);

export default App