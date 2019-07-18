import React, { Component } from 'react';
import { Row, Col } from 'Antd';
import styles from './ArticleShort.css';

class ArticleShort extends Component {
  render() {
    return (
      <div>
            <Row>
              <Col span={24} className={styles.article__short}>
                <Row align="middle">
                  <Col span={24}><h1 className={styles.article__title}>Welcome to Sky Blue</h1></Col>
                </Row>
                <Row align="middle" type="flex" justify="space-around" >
                  <Col span={8}>
                    <img className={styles.article__picture} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551964631128&di=b6e1eb7c01925065ae49167b9727252f&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6d81800a19d8bc3e6984e66b828ba61ea9d34587.jpg" alt="" />
                  </Col>
                  <Col span={16}>
                    <div className={styles.article__text}>Blue Sky is an international marine container leasing company providing containers and related equipment on operating and finance leases to the container industry Our philosophy is to provide a professional, reliable service to our customers with efficiency, accuracy and simplicity Blue Sky also sells new and used containers globally for use in secondary and domestic markets</div>
                  </Col>
                </Row>
              </Col>
            </Row>
      </div>
    );
  }
}

export default ArticleShort;