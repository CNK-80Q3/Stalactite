import React, { Component } from 'react';
import styles from './Logoarea.css';
import { Menu, Row, Col } from 'antd';
import Link from 'umi/link';
import Navigation from './Navigation';

class Logoarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needFixed: false
    }
  }

  logoutHandler = () => {
    window.g_app._store.dispatch({
      type: "userLogin/doLogout"
    })
  }

  // componentDidMount = () => {
  //   const fixedTop = document.getElementById('nav').offsetTop;
  //     //   window.onscroll = () => {
  //     let scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  //       //     //控制元素块A随鼠标滚动固定在顶部
  //     if (scrollTop >= fixedTop) {
  //       this.setState({ needFixed: true });
  //     } else if (scrollTop < fixedTop) {
  //       this.setState({ needFixed: false });
  //     }
  //   }
  // }
  
  render() {
    let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
    let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).nickname : undefined;
    let avatar = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).avatar : undefined;
    return (
      <div>
        <div className={styles.container}>
          <Row align="Bottom" type="flex" justify="space-between">
            <Col span={18}>
              <div className={styles.logo}>
                <span style={{ color: '#4b81ae' }}>S</span>
                <span style={{ color: '#4c8dab' }}>k</span>
                <span style={{ color: '#4d95ab' }}>y</span>
                <span style={{ color: '#4ea0a8'}}>B</span>
                <span style={{ color: '#4d95ab' }}>l</span>
                <span style={{ color: '#4c8dab' }}>u</span>
                <span style={{ color: '#4b81ae' }}>e</span>
                <span style={{ color: '#4a74b1' }}>.</span>
              </div>
              <div className={styles.slogan}>
                <span style={{ color: '#e6a32e', fontSize: '18px' }}>L</span>
                <span style={{ color: '#e69c2e', fontSize: '24px' }}>i</span>
                <span style={{ color: '#e68d2e', fontSize: '22px' }}>f</span>
                <span style={{ color: '#e6752e', fontSize: '28px' }}>e</span> 
                <span style={{ color: '#e6652e', fontSize: '34px' }}> i</span>
                <span style={{ color: '#e6502e', fontSize: '36px' }}>s</span> 
                <span style={{ color: '#e0402e', fontSize: '32px' }}> F</span>
                <span style={{ color: '#e6502e', fontSize: '36px' }}>a</span>
                <span style={{ color: '#e6652e', fontSize: '32px' }}>n</span>
                <span style={{ color: '#e2652e', fontSize: '26px' }}>t</span>
                <span style={{ color: '#e0752e', fontSize: '28px' }}>a</span>
                <span style={{ color: '#e68d2e', fontSize: '26px' }}>s</span>
                <span style={{ color: '#e68d2e', fontSize: '20px' }}>t</span>
                <span style={{ color: '#e69c2e', fontSize: '22px' }}>i</span>
                <span style={{ color: '#e6a32e', fontSize: '20px' }}>c</span>

                {/* <span style={{ color: '#e6a32e' }}>L</span>
                <span style={{ color: '#e69c2e' }}>i</span>
                <span style={{ color: '#e68d2e' }}>f</span>
                <span style={{ color: '#e6752e' }}>e</span>
                <span style={{ color: '#e6652e' }}> i</span>
                <span style={{ color: '#e6502e' }}>s</span>
                <span style={{ color: '#e0402e' }}> F</span>
                <span style={{ color: '#e6502e' }}>a</span>
                <span style={{ color: '#e6652e' }}>n</span>
                <span style={{ color: '#e2652e' }}>t</span>
                <span style={{ color: '#e0752e' }}>a</span>
                <span style={{ color: '#e68d2e' }}>s</span>
                <span style={{ color: '#e68d2e' }}>t</span>
                <span style={{ color: '#e69c2e' }}>i</span>
                <span style={{ color: '#e6a32e' }}>c</span> */}
              </div>
            </Col>
            <div className={styles.username}>{user}</div>
            <img className={styles.portrait} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4270798186,159128244&fm=26&gp=0.jpg" alt="" />
          </Row>
        </div>
        <div className={this.state.needFixed ? styles.nav__fixed : styles.nav} id={'nav'}>
          <Row align="middle" type="flex" justify="end">
            <Col span={1}>
              {
                sessionStorage.getItem("userInfo") ? <Link to="/login/page" onClick={this.logoutHandler}>登出</Link> : <Link to="/login/page">登录</Link>
              }
            </Col>
          </Row>
        </div>
        <Navigation></Navigation>
      </div>
      
    );
  }
}

export default Logoarea;