import { connect } from 'dva';
import React, { Component } from 'react';
import styles from './Microblog.css';
import { routerRedux } from 'dva/router';
import { Row, Col, Button, Pagination } from 'antd';
import Cards from './Cards';
import Details from './Details';
import MicroblogModal from './MicroblogModal'



const ButtonGroup = Button.Group;

class Microblog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      account: "",
      nickname: "",
      content: "",
      pictures: [],
      date: "",
      like: [],
      activeCard: 0
    }
  }

  pageChangeHandler = (page) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/microblog/page',
      query: { page },
    }));
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  deleteHandler = (id) => {
    this.props.dispatch({
      type: 'microblogs/remove',
      payload: id,
    });
  }

  editHandler = (id, values) => {
    values.role === '0' ? values.role = 0 : values.role = 1;
    this.props.dispatch({
      type: 'microblogs/patch',
      payload: { id, values },
    });
  }

  createHandler = (values) => {
    values.role === '0' ? values.role = 0 : values.role = 1;
    this.props.dispatch({
      type: 'microblogs/create',
      payload: values,
    });
  }

  likeHandler = (id, like, allLike) => {
    let userInfo = sessionStorage.getItem("userInfo") ? sessionStorage.getItem("userInfo") : undefined;
    let user = sessionStorage.getItem("userInfo") ? JSON.parse(userInfo).account : undefined;
    if (!allLike.map(like => like.likeAccount).includes(user)) this.props.dispatch({
      type: 'microblogs/like',
      payload: { id, like },
    })
    // if (allLike.length) {
    //   for (var i = 0, len = allLike.length; i < len; i++) {
    //     if (allLike[i].likeAccount && user !== allLike[i].likeAccount) {
    //       continue;
    //     }
    //     else {
    //       return;
    //     }
    //   }
    //   this.props.dispatch({
    //     type: 'microblogs/like',
    //     payload: { id, like },
    //   });
    // }
    // else {
    //   this.props.dispatch({
    //     type: 'microblogs/like',
    //     payload: { id, like },
    //   });
    // }
  }

  changeDetails = (_id, account, nickname, content, pictures, date, role, like, index) => {
    this.setState({
      id: _id,
      account: account,
      nickname: nickname,
      content: content,
      pictures: pictures,
      date: date,
      role: role,
      like: like,
      activeCard: index
    });
  }

  getAllMicroblog = (page) => {
    this.props.dispatch({
      type: 'microblogs/getMicroblogData',
      payload:
        page,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log(page)
  }

  getMyMicroblog = (page) => {
    this.props.dispatch({
      type: 'microblogs/getMyMicroblogData',
      payload:
        page,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  active(index) {
    this.setState({
      activeCard: index
    })
    console.log(this.state.activeCard)
  }

  render() {
    const microblogs = this.props.list;
    const { activeCard } = this.state;
    return (
      <div className={styles.container}>
        <Row align="top" type="flex" justify="space-around">
          <Col span={10}>
            <div className={styles.create}>
              <MicroblogModal record={{}} onOk={this.createHandler}>
                <Button type="primary">发表心情</Button>
              </MicroblogModal>
            </div>
            <Details data={this.state} likeMicroblog={this.likeHandler}></Details>
          </Col>
          <Col span={12}>
            <Row align="top" type="flex" justify="start">
              <Col span={24}>
                <ButtonGroup>
                  <Button type="primary" onClick={this.getMyMicroblog}>我的心情</Button>
                  <Button type="primary" onClick={this.getAllMicroblog}>前往广场</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row align="top" type="flex" justify="space-around" className={styles.cards__container}>
              <Col span={24}>
                <Row align="top" type="flex" justify="space-between" className={styles.cardsarea}>
                  {
                    microblogs.map((item, index) => {
                      return (<Cards key={index} data={item}
                        className={activeCard === index ? styles.card__active : styles.cards}
                        getID={this.changeDetails}
                        active={this.active.bind(this, index)}
                        deleteMicroblog={this.deleteHandler}
                        editMicroblog={this.editHandler}
                      />)
                    })
                  }
                </Row>
              </Col>
              <Row align="top" type="flex" justify="space-around">
                <Col span={24}>
                  <Pagination
                    className="ant-table-pagination"
                    total={this.props.total}
                    current={this.props.current}
                    pageSize={8}
                    onChange={this.pageChangeHandler}
                  />
                </Col>
              </Row>
            </Row>
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

export default connect(mapStateToProps)(Microblog);