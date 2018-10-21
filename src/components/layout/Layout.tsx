import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Loadable from 'react-loadable';
import { Layout } from 'antd';
import { Path } from '$constants/route';
import Navigationbar from '../navigationbar';
import Footer from '../footer';
import './Layout.less';

const { Content } = Layout;
const { Component } = React;
// import { route } from '$constants';

// const LoadingMask = () => (
//   <div className="layout-column layout-main-cross-center flex">
//     Loading...
//   </div>
// );

// const SamplePage = Loadable({
//   loader: () => import('components/samplePage'),
//   loading: LoadingMask,
// });

class AppLayout extends Component {
  render() {
    return (<Layout>
      <Navigationbar />
      <Content>
        <Route exact path={Path.ROOT} render={() => <Redirect to={Path.TRAINING} />} />
        <Route exact path={Path.TRAINING} render={() => <Redirect to={Path.TRAINING_PROBLEMS} />} />
      </Content>
      <Footer />
    </Layout>);
  }
}

export default AppLayout;
