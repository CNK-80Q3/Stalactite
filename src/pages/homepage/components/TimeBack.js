import React, { Component } from 'react';
import { Row, Col } from 'Antd';
import styles from './TimeBack.css';

class TimeBack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TBFixed: false
    }
  }

  componentDidMount = () => {
    window.onscroll = () => {
      let TBscrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      if (TBscrollTop >= 190) {
        this.setState({ TBFixed: true });
      } else if (TBscrollTop < 170) {
        this.setState({ TBFixed: false });
      }
    }
  }

  render() {
    return (
      <div>
        <div className={this.state.TBFixed ? styles.timeBack__fixed : styles.timeBack} id={'timeBack'}>
          <Row align="Bottom" type="flex" justify="center" >
            <Col span={20}>
              <div className={styles.title}>TIME BACK</div>
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
            <Col span={20}>
              <img className={styles.img1} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TimeBack;