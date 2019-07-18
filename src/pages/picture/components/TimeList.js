import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Icon, Modal, Upload, message, Breadcrumb } from 'antd';
import Link from 'umi/link';
import styles from './TimeList.css';
import PictureView from '../../../layouts/components/PictureView'

class TimeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  picHideHandler = () => {
    this.setState({
      visible: false
    })
    console.log(this.state.visible)
  }

  picViewHandler(index) {
    this.setState({
      visible: true,
      no: index
    })
  }
  
  render() {
    const { id, name, pictures } = this.props.location.payload;
    return (
      <div className={styles.container}>
        <div style={{ height: 40 }}>
          <div style={{ float: 'left', height: 40 }}>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/picture/page">相册</Link></Breadcrumb.Item>
              <Breadcrumb.Item>TimeList</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={styles.sametime}>
          <div className={styles.album__title}>{name}</div>
          <div className={styles.pictures__area}>
            <PictureView data={pictures} no={this.state.no} onCancel={this.picHideHandler} visible={this.state.visible} ></PictureView>
            <Row align="full" type="flex" justify="left">
              {
                pictures.map((item, index) => {
                  return (<Col key={index} onClick={this.picViewHandler.bind(this, index)} span={4}><img className={styles.picture} src={item} alt="" /></Col>)
                })
              }
            </Row>
          </div>
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

export default connect(mapStateToProps)(TimeList);