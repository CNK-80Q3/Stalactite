import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Icon, Modal, Upload, message } from 'antd';
import AlbumCover from './AlbumCover';
import styles from './Picture.css';
import { Menu, Dropdown } from 'antd';
import PicturesUpload from '../../../layouts/components/PicturesUpload';
import AlbumModal from './AlbumModal';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

const ButtonGroup = Button.Group;

class Picture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false, 
      value: undefined,
      albumVisible: false,
      callback: undefined,
      record: {}
    }
    this.child = React.createRef();
  }

  hideModelHandler = () => {
    this.setState({ albumVisible: false })
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

  createHandler = (values) => {
    const handle = (values) => {
      values.role === '0' ? values.role = 0 : values.role = 1;
      this.props.dispatch({
        type: 'pictures/create',
        payload: values,
      });
    } 
    this.setState({ albumVisible: true, callback: handle, record: {} }) 
  }

  getMyAlbums = (page) => {
    this.props.dispatch({
      type: 'pictures/getMyAlbumsData',
      payload:
        page,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getMyPictures = (id, name, pictures) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/picture/components/TimeList',
      payload: { id, name, pictures },
    }))
  }

  editHandler = (id, data) => {
    const handle = (values) => {
      values.role === '0' ? values.role = 0 : values.role = 1;
      this.props.dispatch({
        type: 'pictures/patch',
        payload: { id, values },
      });
    }
    this.setState({ albumVisible: true, callback: handle, record: data }) 
  }

  deleteHandler = (id) => {
    this.props.dispatch({
      type: 'pictures/remove',
      payload: id,
    });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { form } = this.props
    const pictures = this.props.list;
    console.log(this.props.list)
    return (
      <div className={styles.container}>
        <Button type="primary" onClick={this.showModal} ><Icon type="upload"></Icon>上传图片</Button>
        <Modal
          title="图片上传"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          bodyStyle={{height:"140px"}}
          width="720px"
          height="720px"
          centered={true}
          okText="确定"
          cancelText="取消"
        >
          <Row align="top" type="flex" justify="space-around">
            <Col span={24}>
              <Dropdown overlay={menu}>
                <span>
                  选择相册 <Icon type="down" />
                </span>
              </Dropdown>
            </Col>
          </Row>
          <Row align="middle" type="flex" justify="space-around">
            <Col span={7}>
              <PicturesUpload form={form} num={100} formItemLayout={formItemLayout} />
            </Col>
          </Row>
        </Modal>
        <AlbumModal ref={this.child} hideModelHandler={this.hideModelHandler} visible={this.state.albumVisible} record={this.state.record} onOk={this.state.callback}>
          <Button type="primary" onClick={this.createHandler}>创建相册</Button>
        </AlbumModal>
        
        <div>
          <Row align="Bottom" type="flex" justify="left">
            {
              pictures.map((item, index) => {
                return (<AlbumCover key={index} 
                  data={item}
                  deleteAlbum={this.deleteHandler}
                  editAlbumInfo={this.editHandler}
                  goToAlbum={this.getMyPictures}
                />)
              })
            }
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.pictures;
  return {
    list,
    loading: state.loading.models.pictures,
  };
}

export default connect(mapStateToProps)(Picture);