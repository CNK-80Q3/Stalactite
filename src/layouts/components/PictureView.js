import React, { Component } from 'react';
import { Row, Col, Button, Icon, Modal, Upload, message, TreeSelect, Link } from 'antd';
import styles from './PictureView.css';

class PictureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    const { data, no, visible } = this.props
    console.log(visible)
    return (
      <Modal
        visible={visible}
        onCancel={() => this.props.onCancel()}
        className={styles.modal}
        width="auto"
        height="auto"
        padding="0px"
        keyboard="true"
        maskClosable="true"
        footer={null}
        bodyStyle={{ background: 'linear-gradient(120deg, #00e4d0, #5983e8)', padding: '0px', maxHeight: '600px', minWidth: '700px'}}
      >
        <Row align="middle" type="flex" justify="center" >
          <Col>
            <button className={styles.pictureView__btn} onClick={this.forwordHandler}>上一张</button>
          </Col>
          <Col>
            <img className={styles.pictureView} src={data[no]} alt={data.id} />
          </Col>
          <Col>
            <button className={styles.pictureView__btn} onClick={this.backwordHandler}>下一张</button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default PictureView;
