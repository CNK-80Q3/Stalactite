import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import Covers from '../../picture/components/Covers';
import styles from './Videos.css';

class Videos extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className={styles.container}>
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

    );
  }
}

export default Videos;