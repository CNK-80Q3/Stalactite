import React, { Component } from 'react';
import styles from './ArticleView.css';

class ArticleView extends Component {
  render() {
    const { title, content, date, like } = this.props.data;
    return (
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.article}><div dangerouslySetInnerHTML={{
          __html: `${content}`
        }} /></div>
        <div className={styles.comment}>{date}</div>
      </div>
    );
  }
}

export default ArticleView;