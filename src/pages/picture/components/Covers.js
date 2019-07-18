import React, { Component } from 'react';
import styles from './Covers.css';

class Covers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onHover: false
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

  render() {
    return (
      <div className={styles.cover}>
        <img className={this.state.onHover ? styles.img1__transform : styles.img1} onMouseOver={this.onHoverHandler} onMouseOut={this.onLeaveHandler} src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1551632905&di=ed8e5aec4b4336d66a388b75c14e4078&src=http://img5.duitang.com/uploads/blog/201409/02/20140902122810_uR3Mc.thumb.700_0.jpeg" alt="" />
        <img className={this.state.onHover ? styles.img2__transform : styles.img2} onMouseOver={this.onHoverHandler} onMouseOut={this.onLeaveHandler} src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1551632994&di=be0543ee02c620e987b5ba266cb7056f&src=http://uploads.5068.com/allimg/1803/1IU44195-6.jpg" alt="" />
        <div className={this.state.onHover ? styles.cover__space__transform : styles.cover__space}>
          <img onMouseOver={this.onHoverHandler} onMouseOut={this.onLeaveHandler} className={this.state.onHover ? styles.img3__transform : styles.img3} onMouseOver={this.onHoverHandler} onMouseOut={this.onLeaveHandler} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551642970447&di=c90cb85db223a129613793b71428c26e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F02%2F20150102161348_UrLTW.jpeg" alt="" />
          <div onMouseOver={this.onHoverHandler} onMouseOut={this.onLeaveHandler} className={this.state.onHover ? styles.message__transform : styles.message}>
            <div className={styles.cover__text}>
              <h2>卡通动漫</h2>
              <h3>56张图片</h3>
              <h3>更新时间：2018-09-09</h3>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Covers;