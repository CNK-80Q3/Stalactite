import React, { Component } from 'react';
import { Row, Col } from 'Antd';
import styles from './Homepage.css';
import ArticleShort from './ArticleShort';
import TimeBack from './TimeBack';
import FriendsList from './FriendsList';
import Microblog from './Microblog';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class Homepage extends Component {

  render() {
    const articleShorts = this.props.list;
    return (
      <div>
        <Row align="Bottom" type="flex" justify="start" >
          <Col span={13} className={styles.article}>
            <ArticleShort></ArticleShort>
            <ArticleShort></ArticleShort>
            <ArticleShort></ArticleShort>
            <ArticleShort></ArticleShort>
            <ArticleShort></ArticleShort>
          </Col>
          <Col span={5}>
            <FriendsList></FriendsList> 
          </Col>
          <Col span={5}>
            <TimeBack></TimeBack>
          </Col>
        </Row>
        <Row align="Bottom" type="flex" justify="start" >
          <Col span={18}>
            <div className={styles.blogArea}>
              <Microblog></Microblog>
              <Microblog></Microblog>
              <Microblog></Microblog>
              <Microblog></Microblog>
              <Microblog></Microblog>
            </div>
          </Col>
          <Col span={5}>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.microblogs;
  return {
    list,
    total,
    page,
    loading: state.loading.models.microblogs,
  };
}
export default connect(mapStateToProps)(Homepage);
