import React, { Component } from 'react';
import styles from './Microblog.css';
import { Row, Col, Button, Icon, Input } from 'antd';

const ButtonGroup = Button.Group;

class Microblog extends Component {
  render() {
    return (
      <div className={styles.content}>
        <Row>
          <Col span={3}>
            <img className={styles.head_portrait} src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4270798186,159128244&fm=26&gp=0.jpg" alt="" />
          </Col>
          <Col span={18} >
            <div className={styles.nickname}>User Name</div>
            <div className={styles.date}>2019-03-11</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}></Col>
        </Row>
        <Row>
          <div className={styles.blogtext}>
            这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。
            这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。这里是一条心情。
            </div>
        </Row>
        <Row>
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552330085399&di=3c5bc48d9fccc0048388489594c0354a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F40%2F91%2F79%2Fpic_lib%2Fs960x639%2Fcountry_field_landscape_photo_EA52058s960x639.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552924666&di=43f0194ba64cc4ee6d8f9748044004ff&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272616185715947.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552330085399&di=3c5bc48d9fccc0048388489594c0354a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F40%2F91%2F79%2Fpic_lib%2Fs960x639%2Fcountry_field_landscape_photo_EA52058s960x639.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552924666&di=43f0194ba64cc4ee6d8f9748044004ff&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272616185715947.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552330085399&di=3c5bc48d9fccc0048388489594c0354a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F40%2F91%2F79%2Fpic_lib%2Fs960x639%2Fcountry_field_landscape_photo_EA52058s960x639.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552924666&di=43f0194ba64cc4ee6d8f9748044004ff&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272616185715947.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552330085399&di=3c5bc48d9fccc0048388489594c0354a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F40%2F91%2F79%2Fpic_lib%2Fs960x639%2Fcountry_field_landscape_photo_EA52058s960x639.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552924666&di=43f0194ba64cc4ee6d8f9748044004ff&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.33lc.com%2Farticle%2FUploadPic%2F2012-7%2F201272616185715947.jpg" alt="" />
          <img className={styles.pictures} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552330085399&di=3c5bc48d9fccc0048388489594c0354a&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F40%2F91%2F79%2Fpic_lib%2Fs960x639%2Fcountry_field_landscape_photo_EA52058s960x639.jpg" alt="" />
        </Row>
        <Row>
          <Col span={24} className={styles.buttons}>
            <ButtonGroup>
              <Button><Icon type="like"></Icon></Button>
              <Button><Icon type="dislike"></Icon></Button>
              <Button><Icon type="message"></Icon></Button>
              <Button><Icon type="share-alt"></Icon></Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.likes}>
            <div>点赞人, 点赞人, 点赞人, 点赞人, 点赞人, 点赞人, 点赞人, 点赞人, 点赞人 等觉得很赞！</div>
          </Col>
        </Row>
        <Row align="Bottom" type="flex" justify="center">
          <Col span={22}>
            <Input className={styles.comment__input}></Input>
          </Col>
          <Col span={2}>
            <Button className={styles.comment__button}>评论</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Microblog;