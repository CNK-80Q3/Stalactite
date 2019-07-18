import React, { Component } from 'react';
import { Button, Icon, Row, Col, Pagination } from 'antd';

class Catalogg extends Component {
  render() {
    return (
      <div>
        <Button type="primary" size="large"><Icon type="form"></Icon>写文章</Button>
        <Pagination></Pagination>
      </div>
    );
  }
}

export default Catalogg;