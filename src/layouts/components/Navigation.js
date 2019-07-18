import styles from './Navigation.css';
import React, { Component } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import Link from 'umi/link';

const { Header } = Layout;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  showHeader = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <Drawer
          placement="top"
          maskClosable={true}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          style={{ "padding": "0px" }}
          height={64}
        >
          <Header onMouseLeave={this.onClose} style={{ "padding": "0px" }}>
            <div className={styles.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              mask="false"
              style={{ lineHeight: '64px', fontSize: '15px', background: 'linear-gradient(120deg, #00e4d0, #5983e8)' }}
          >
              <Menu.Item key="1">
                <Link to="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/microblog/page">心情</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/articles/page">文章</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/picture/page">图片</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/videos/page">视频</Link>
              </Menu.Item>
              {/* <Menu.Item key="6">
                <Link to="/picture/components/TimeList">TimeList</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/articles/components/ArticleEdit">Edit</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/userinfo/components/Users">user</Link>
              </Menu.Item> */}
              <Menu.Item key="8">
                <Link to="/login/page">登录</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/register/page">注册</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Drawer>
        <div onMouseOver={this.showHeader} className={styles.lightline}></div>
      </div>
    );
  }
}

export default Navigation;


