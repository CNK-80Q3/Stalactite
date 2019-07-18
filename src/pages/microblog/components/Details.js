import React, { Component } from 'react';
import styles from './Details.css';
import { Row, Col, Button, Icon, Input } from 'antd';
import Comments from '../../../layouts/components/Comments';
import PictureView from '../../../layouts/components/PictureView'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const { TextArea } = Input;
const ButtonGroup = Button.Group;

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hitCount: 0,
      likeList: this.props.data.like,
      active: this.props.data,
      visible: false,
      commentVisible: false
    }
  }

  // likeCount = () => {
  //   var c = 0;
  //   let tid;
  //   let btn = window.document.getElementById("LikeButton");
  //   btn.onclick = function (e) {
  //     c++;
  //     btn.innerHTML = c;
  //   };
  //   btn.onmousedown = function (e) {
  //     tid = setInterval(function num () {
  //       c++;
  //       btn.innerHTML = c;
  //     }, 200);
  //   };
  //   btn.onmouseup = function (e) {
  //     clearInterval(tid);
  //   }
  //   btn.onmouseout = function (e) {
  //     clearInterval(tid);
  //   }
  // }
  getLike = () => {
    const { id } = this.props.data;
    let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
    let userAccount = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;
    let userName = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).nickname : undefined;
    const like = {
      MicroblogId: id,
      likeAccount: userAccount,
      likeName: userName,
      hitCount: 1,
    }
    this.props.likeMicroblog(this.props.data.id, like, this.props.data.like)
    if (this.props.data.like.length > 0) {
      for (var i = 0, len = this.props.data.like.length; i < len; i++) {
        if (this.props.data.like[i].likeAccount && userAccount !== this.props.data.like.likeAccount) {
          continue;
        }
        else {
          return;
        }
      }
      this.props.data.like.push(like)
    }
    else {
      this.props.data.like.push(like)
    }
  }

  picViewHandler(index) {
    this.setState({
      visible: true,
      no: index
    })
  }

  picHideHandler = () => {
    this.setState({
      visible: false
    })
    console.log(this.state.visible)
  }

  showCommentInput = () => {
    this.setState({
      commentVisible: !this.state.commentVisible
    })
  }

  hideCommentInput = () => {
    this.setState({
      commentVisible: false
    })
  }

  commentHandler = (value) => {
    this.props.dispatch({
      type: 'microblogs/comment',
      payload: { value },
    });
    console.log(value)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    const { id, account, nickname, date, content, pictures, like, role } = this.props.data;

    return (
      <div className={styles.content}>
        <Row>
          <Col span={5}>
            <img className={styles.head_portrait} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4270798186,159128244&fm=26&gp=0.jpg" alt="" />
          </Col>
          <Col span={18} >
            <div className={styles.nickname}>{nickname}</div>
            <div className={styles.date}>{date}</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}></Col>
        </Row>
        <Row>
          <div className={styles.blogtext}>
            {content}
          </div>
        </Row>
        <Row>
          <Row>
            <PictureView data={pictures} no={this.state.no} onCancel={this.picHideHandler} visible={this.state.visible} ></PictureView>
            {
              pictures.map((item, index) => {
                return (
                  <div key={index} onClick={this.picViewHandler.bind(this, index)} className={pictures.length >> 1 ? styles.details__pictureWrap : {}}>
                    <img className={pictures.length >> 1 ? styles.details__picture : styles.details__picture1} src={item} alt={item.id} />
                  </div>)
              })
            }
          </Row>
        </Row>
        <Row>
          <Col span={24} className={styles.buttons}>
            <ButtonGroup>{
              <Button icon="like" id="LikeButton" onClick={this.getLike} type="primary"></Button>
            }
              <Button icon="message" type="primary" onClick={this.showCommentInput}></Button>
              <Button icon="share-alt" type="primary"></Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.likes}>
            <div>
              {
                like.map((item, index) => {
                  console.log(item.likeName)
                  return (<p key={index} style={{ display: "inline" }}>{item.likeName}，</p>)
                })
              }等{like.length}人表示赞同!
            </div>
          </Col>
        </Row>

        <div className={this.state.commentVisible ? {} : styles.commentInputArea}>
          <Row align="bottom" type="flex" justify="space-between" >
            <Col span={24}>
              <TextArea onPressEnter={(value) => this.commentHandler(value)} autosize></TextArea>
            </Col>
            <Col span={24} style={{ marginTop: "10px" }}>
              <Button type="primary">发布</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.commentArea}>
          <Row align="bottom" type="flex" justify="space-between" >
            <Col span={24}>
              <Comments></Comments>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.microblogs;
  return {
    list,
    loading: state.loading.models.microblogs,
  };
}

export default connect(mapStateToProps)(Details);