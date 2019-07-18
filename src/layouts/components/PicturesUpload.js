import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Upload, Icon, Modal } from 'antd';
import CosCloud from 'cos-js-sdk-v5';
import styles from './PicturesUpload.css'

const FormItem = Form.Item;
const config = {
  Bucket: 'liqiu-1251740680',
  Region: 'ap-beijing'
}

class PicturesUpload extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }


  uploadFile = file => {
    const { dispatch } = this.props
    var cos = new CosCloud({
      getAuthorization: function (options, callback) {
        // 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/edit/master/scope.md
        dispatch({
          type: 'microblogs/getToken'
        })
          .then(data => callback({
            TmpSecretId: data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials.tmpSecretKey,
            XCosSecurityToken: data.credentials.sessionToken, // 需要提供把 sessionToken 传给 
            ExpiredTime: data.expiredTime,
            ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
          }))
      }
    })


    cos.putObject({
      Bucket: config.Bucket, /* 必须 */
      Region: config.Region,    /* 必须 */
      Key: file.name,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: file, // 上传文件对象
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      }
    }, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      file.url = `https://liqiu-1251740680.cos.ap-beijing.myqcloud.com/${file.name}`
      file.status = 'done'

      this.setState({ fileList: [...this.state.fileList, file] })
    });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );

    const { form: { getFieldDecorator }, formItemLayout, num, lable  } = this.props
    return (

      <FormItem
        {...formItemLayout}
        label={lable}
      >
        <div className="clearfix">
          {
            getFieldDecorator('picture', {
              valuePropName: 'files',
            })(
              <Upload
                className=""
                action={this.uploadFile}
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
              >
                {fileList.length >= num ? null : uploadButton}
              </Upload>
            )
          }
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ maxWidth: '400px', maxHeight: '400px'}} src={previewImage} />
          </Modal>
        </div>
      </FormItem>
    );
  }
}

function mapStateToProps(state) {
  const { token } = state.microblogs;
  console.log(state.microblogs)
  return { token };
}

export default connect(mapStateToProps)(PicturesUpload);
