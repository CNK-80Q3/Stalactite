import React, { Component } from 'react';
import { Row, Col, Button, Icon, Modal, Upload, message, TreeSelect } from 'antd';
import Covers from './Covers';
import styles from './Picture.css';
import PicturesUpload from '../../../layouts/components/PicturesUpload';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
          }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}];

class Pictures extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false, 
      value: undefined
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
        this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
        this.setState({
      visible: false,
    });
  }

  onChange = (value) => {
        this.setState({ value });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { form } = this.props
    return (
      <div className={styles.container}>
        <Button type="primary" size="large" onClick={this.showModal} ><Icon type="upload"></Icon>上传图片</Button>
        <Modal
          title="图片上传"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={8}>
              <TreeSelect
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                treeData={treeData}
                placeholder="选择相册"
                treeDefaultExpandAll
                onChange={this.onChange}
              />
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
            </Col>
            <Col span={12}>
              <PicturesUpload form={form} formItemLayout={formItemLayout} />
            </Col>
            <Col span={6}>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
            <Col span={8}>
            </Col>
          </Row>
        </Modal>
        <Button type="ghost" size="large">创建相册</Button>
        <div>
          <Row>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
            <Col span={6}>
              <Covers></Covers>
            </Col>
          </Row>
        </div>
      </div>


    );
  }
}

export default Pictures;