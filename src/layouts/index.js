import { Layout } from 'antd';
import withRouter from 'umi/withRouter';
import Logoarea from './components/Logoarea';
import CtrlButton from './components/CtrlButton';

const { Content, Footer } = Layout;

function BasicLayout({ dispatch, children, location }) {
  if ((location.pathname === '/login/page') | (location.pathname === '/register/page')) {
    return (
      <Layout className="layout">

        <Content style={{ padding: '0 100px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 500, minWidth: 1000 }}>
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
    return (
      <div>
        <Layout className="layout">
          <Logoarea></Logoarea>
          <Content style={{ padding: "0" }}>
            <div style={{ background: 'linear-gradient(45deg, #00e4d0, #5983e8)', paddingTop: '165px', minHeight: 780 }}>
              {children}            </div>
            <CtrlButton></CtrlButton>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
}

export default withRouter(BasicLayout);


