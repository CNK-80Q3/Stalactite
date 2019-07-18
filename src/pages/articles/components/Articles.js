import React, { Component } from 'react';
import { Button, Icon, Row, Col, Pagination, Modal, Input } from 'Antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Articles.css';
import Titles from './Titles';
import ArticleView from './ArticleView';

const Search = Input.Search;

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      date: "",
      like: ""
    }
  }

  createHandler = () => {
    this.props.dispatch(routerRedux.push('/articles/components/ArticleEdit'))
  }

  deleteHandler = (id) => {
    this.props.dispatch({
      type: 'articles/remove',
      payload: id,
    });
    console.log(id)
  }

  editHandler = (articleID, values) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/articles/components/ArticleEdit',
      body: { articleID, values },
    }))
  }

  changeDetails = (title, content, date, like) => {
    this.setState({
      title: title,
      content: content,
      date: date,
      like: like
    });
  }
  
  pageChangeHandler = (page) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/articles/page',
      query: { page },
    }));
  }

  searchArticles = (value) => {
    this.props.dispatch({
      type: 'articles/search',
      payload: { value },
    });
    console.log(value)
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  //   info = (title, content, date, like) =>{
  //   Modal.info({
  //     title: `${title}`,
  //     content: (
  //       <div dangerouslySetInnerHTML={{
  //         __html: `${content}`
  //       }} />
  //     ),
  //     onOk() { },
  //   });
  // }
  render() {
    const articles = this.props.list;
    console.log(articles)
    return (
      <div>
        {/* <Row align="Bottom" type="flex" justify="start" >
          <Col span={12}>
            <Button type="primary" onClick={this.createHandler}><Icon type="form" ></Icon>写文章</Button>
          </Col>
        </Row> */}
        <Row align="Bottom" type="flex" justify="space-around" >
          <Col span={2} className={styles.detail__container}>
            <div styles={styles.todolist}>
              <ArticleView data={this.state}></ArticleView>
            </div>
          </Col>
          <Col span={12} className={styles.catalog__container}>
            <div>
              <div>
                <Button type="primary" onClick={this.createHandler}><Icon type="form" ></Icon>写文章</Button>
                <Row align="bottom" type="flex" justify="end" >
                  <Search placeholder="文章搜索" onSearch={(value) => this.searchArticles(value)}  enterButton style={{marginTop: "10px"}}/>
                  <Col span={24} className={styles.catalog}>
                    {
                      articles.map((item, index) => {
                        return (<Titles
                          key={index} data={item}
                          onClick={() => this.changeDetails(item)}
                          getID={this.changeDetails}
                          deleteArticle={this.deleteHandler}
                          editArticle={this.editHandler}
                        />)
                      })
                    }
                  </Col>
                </Row>
                <Row align="middle" type="flex" justify="end" >
                  <Col span={15} className={styles.pagination}>
                    <Pagination
                      className="ant-table-pagination"
                      total={this.props.total}
                      current={this.props.current}
                      pageSize={8}
                      onChange={this.pageChangeHandler}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.articles;
  return {
    list,
    total,
    page,
    loading: state.loading.models.articles,
  };
}

export default connect(mapStateToProps)(Articles);
