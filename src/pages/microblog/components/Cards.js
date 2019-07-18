import React, { Component } from 'react';
import styles from './Cards.css';
import { Row, Col, Menu, Dropdown, Button, Icon } from 'antd';
import MicroblogModal from './MicroblogModal'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { _id, account, nickname, date, content, pictures, role, like } = this.props.data;
    const formatDateTime = (da) => {
      let date = new Date(da);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    };

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => { this.props.deleteMicroblog(_id) }}>删除心情</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">设置权限</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">设为置顶</a>
        </Menu.Item>
      </Menu>
    );

    let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
    let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;

    return (
      <Col span={12} className={this.props.className}
        onClick={() => {
          this.props.getID(_id, account, nickname, content, pictures, formatDateTime(date), role, like);
          this.props.active()
        }}
      >
        <Row align="middle" type="flex" justify="space-between" >
          <Col span={24}>
            {
              account === user ?
                <Row align="middle" type="flex" justify="space-between" className={styles.cards__myheader}>
                  <Col span={8}><div className={styles.cards__nickname}>{nickname}</div></Col>
                  <Col span={12}><div className={styles.cards__date}>{formatDateTime(date)}</div></Col>
                  <Col span={2}>
                    <MicroblogModal record={this.props.data} onOk={(values) => { this.props.editMicroblog(_id, values) }}>
                      <Button shape="circle" size="small" ghost="true" type="default" icon="edit"></Button>
                    </MicroblogModal>
                  </Col>
                  <Col span={2}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                      <Button shape="circle" size="small" ghost="true" type="default" icon="ellipsis"></Button>
                    </Dropdown>
                  </Col>
                </Row>
                :
                <Row align="middle" type="flex" justify="space-between" className={styles.cards__header}>
                  <Col span={8}><div className={styles.cards__nickname}>{nickname}</div></Col>
                  <Col span={11}><div className={styles.cards__date}>{formatDateTime(date)}</div></Col>
                </Row>
            }
            <Row align="middle"><Col span={24}><div className={styles.cards__text}>{content}</div></Col></Row>
            <Row align="Bottom" type="flex" justify="start">
              {
                pictures.slice(0, 3).map((item, index) => {
                  return (<div key={index} className={styles.cards__pictureWrap}><img className={styles.cards__picture} src={item} alt={item.id} /></div>)
                })
              }
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Cards;