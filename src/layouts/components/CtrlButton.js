import React, { Component } from 'react';
import { Button, Icon, Input, Popover, Row, Col } from 'antd';
import styles from './CtrlButton.css';

const { TextArea } = Input;
const text = <span>请编辑您的内容</span>;
const content = (
  <div>
    <Row align="middle" type="flex" justify="space-between">
      <Col span={24}>
        <Row align="middle" type="flex" justify="space-between" gutter={20}>
          <Col>
            <TextArea
              value="请在此处编辑您的内容，请在此处编辑您的内容，请在此处编辑您的内容，请在此处编辑您的内容，请在此处编辑您的内容，请在此处编辑您的内容"
              style={{width:"480px", height:"240px"}}
            >
              
            </TextArea>
          </Col>
        </Row>
        <Row align="middle" type="flex" justify="space-around" style={{ "padding-left": "230px", "padding-top": "15px" }}>
          <Col><Button shape="circle" size="default">
            <Icon type="eye-invisible" theme="twoTone" />
          </Button>
          </Col>
          <Col><Button shape="circle" size="default">
            <Icon type="highlight" theme="twoTone" />
          </Button>
          </Col>
          <Col><Button shape="circle" size="default">
            <Icon type="picture" theme="twoTone" />
          </Button>
          </Col>
          <Col><Button shape="circle" size="default">
            <Icon type="setting" theme="twoTone" />
          </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

class CtrlButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false
    }
  }

  render() {
    return (
      <div className={styles.buttonContent}>
        <Row align="middle" type="flex" justify="end">
          <Col span={20}>
            <Popover placement="topLeft" title={text} content={content}>
              <Button shape="circle" size="large">
                <Icon type="edit" theme="twoTone" />
              </Button>
            </Popover>
          </Col>
          <Col span={4}>

          </Col>
        </Row>
      </div>
    );
  }
}

export default CtrlButton;