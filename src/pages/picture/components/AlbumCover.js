import React, { Component } from 'react';
import { Row, Col, Button, Popconfirm, Icon, Modal, Upload, message, TreeSelect, Link } from 'antd';
import styles from './AlbumCover.css';
import AlbumModal from './AlbumModal'
class AlbumCover extends Component {
  handleEdit = (_id) => {
    return (e) => {
      e.stopPropagation()
      this.props.editAlbumInfo(_id, this.props.data)
    }
  }
  handleGo = (_id, name, pictures) => {
    return () => this.props.goToAlbum(_id, name, pictures)
  }

  deleteAlbum = (_id) => {
    return (e) => {
      e.stopPropagation()
      this.props.deleteAlbum(_id, this.props.data)
    }
  }
  render() {
    const { _id, account, nickname, date, name, pictures, role, like } = this.props.data;
    const values = this.props.data
    const formatDateTime = (da) => {
      let date = new Date(da);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      // let h = date.getHours();
      // let minute = date.getMinutes();
      // minute = minute < 10 ? ('0' + minute) : minute;
      return y + '年' + m + '月' + d + '日';
    };
    return (
      <Col span={4} onClick={this.handleGo(_id, name, pictures)}>
        <div className={styles.album__cover}>
          <div className={styles.album__pictureSpace}>
            <img className={styles.album__picture} src={pictures[0]} alt="" />
            <Button className={styles.album__edit} shape="circle" size="small" ghost="true" type="default" icon="edit" onClick={this.handleEdit(_id)}></Button>
            <Popconfirm placement="topLeft" title="确定删除此相册?" trigger="hover" onConfirm={(e) => { e.stopPropagation(); this.props.deleteAlbum(_id) }} okText="确定" cancelText="取消">
              <Button className={styles.album__delete} shape="circle" size="small" ghost="true" type="default" icon="delete"></Button>
            </Popconfirm>
            <div className={styles.album__count}>{pictures.length}</div>
          </div>
          <div className={styles.album__name}>{name}</div>
          <div className={styles.album__date}>{formatDateTime(date)}更新</div>
        </div>
      </Col>
    );
  }
}

export default AlbumCover;