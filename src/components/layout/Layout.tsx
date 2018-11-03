import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import * as Loadable from 'react-loadable';
import { Layout } from 'antd';
import { Path } from '../../constants/route';
import Navigationbar from '../navigationbar';
import Footer from '../footer';
import ProblemDashboard from '../problemDashboard';
import { mainContentWrapper } from './Layout.less';

const { Content } = Layout;
const { Component } = React;

// const ProblemList = Loadable({
//   loader: () => import('../problemList'),
//   loading() {
//     return <div>Loading</div>;
//   }
// });

class AppLayout extends Component {
  render() {
    return (
      <Layout>
        <Navigationbar />
        <Content className={mainContentWrapper}>
          <Route exact path={Path.ROOT} render={() => <Redirect to={Path.TRAINING} />} />
          <Route exact path={Path.TRAINING} render={() => <Redirect to={Path.TRAINING_PROBLEMS} />} />
          <Route exact path={Path.TRAINING_PROBLEMS} render={() => <Redirect to={Path.TRAINING_PROBLEMS_NO.replace(':no', 'A')} />} />
          <Route exact path={Path.TRAINING_PROBLEMS_NO} render={({ match }) => <ProblemDashboard {...match} />} />
        </Content>
        <Footer />
      </Layout>
    );
  }
}

export default AppLayout;
