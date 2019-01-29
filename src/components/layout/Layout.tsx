import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { Layout } from 'antd';
import { Path } from '$constants/route';
import Navigationbar from '../navigationbar';
import Footer from '../footer';
import Problem from '../problem';
import Login from '../login';
import { mainContentWrapper } from './Layout.less';
import { appInit } from '$actions';
import store from '$store';

const { Content } = Layout;
const { Component } = React;

const ProblemDashboard = Loadable({
  loader: () => import('../problemDashboard'),
  loading() {
    return <div>Loading</div>;
  }
});

const StatusDashboard = Loadable({
  loader: () => import('../statusDashboard'),
  loading() {
    return <div>Loading</div>;
  }
});

export default class AppLayout extends Component {
  componentDidMount() {
    store.dispatch(appInit());
  }

  render() {
    return (
      <Layout>
        <Navigationbar />
        <Content className={mainContentWrapper}>
          <Route exact path={Path.ROOT} render={() => <Redirect to={Path.TRAINING} />} />
          <Route exact path={Path.TRAINING} render={() => <Redirect to={Path.TRAINING_PROBLEMS} />} />
          <Route exact path={Path.TRAINING_PROBLEMS} render={() => <Redirect to={Path.TRAINING_PROBLEMS_PAGE.replace(':pageId', 'A')} />} />
          <Route exact path={Path.TRAINING_PROBLEMS_PAGE} render={() => <ProblemDashboard />} />
          <Route exact path={Path.TRAINING_PROBLEM} render={() => <Problem />} />
          <Route exact path={Path.TRAINING_STATUS} render={() => <StatusDashboard />} />
          <Route exact path={Path.LOGIN} render={() => <Login mode="login" />} />
          <Route exact path={Path.REGISTER} render={() => <Login mode="register" />} />
        </Content>
        <Footer />
      </Layout>
    );
  }
}
