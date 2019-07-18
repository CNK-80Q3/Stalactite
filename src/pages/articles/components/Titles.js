import React, { Component } from 'react';
import styles from './Titles.css';
import { Menu, Dropdown, Row, Col, Button, Icon } from 'antd';

class Titles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onHover: false,
      onClick: false
    }
  }

  onHoverHandler = () => {
    this.setState({
      onHover: true
    })
  }

  onLeaveHandler = () => {
    this.setState({
      onHover: false
    })
  }

  onClickHandler = () => {
    this.setState({
      onClick: true
    })
  }

  render() {
    const { _id, title, content, date, like } = this.props.data;
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
          <a target="_blank" rel="noopener noreferrer" onClick={() => { this.props.deleteArticle(_id) }}>删除文章</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={() => { this.props.editArticle(_id, this.props.data) }}>修改文章</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">设置权限</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer">设为置顶</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div
        className={this.state.onHover ? styles.container__mouseOn : styles.container}
        onMouseOver={this.onHoverHandler}
        onMouseOut={this.onLeaveHandler}
        onClick={() => {
          this.props.getID(title, content, formatDateTime(date));
        }}>
        <Row>
          <Col span={11}>
            <h3>{title}</h3>
          </Col>
          <Col span={8}>
            <h3>{formatDateTime(date)}</h3>
          </Col>
          <Col span={2}>
            <h3>点赞{like}</h3>
          </Col>
          <Col span={1}>
            <Button shape="circle" size="small" type="primary" className={styles.edit} onClick={() => { this.props.editArticle(_id, this.props.data) }}><Icon type="edit" ></Icon></Button>
          </Col>
          <Col span={1}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button shape="circle" size="small" type="primary" className={styles.edit}><Icon type="ellipsis"></Icon></Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Titles;