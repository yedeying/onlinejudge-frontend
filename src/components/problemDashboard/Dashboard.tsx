import * as React from 'react';
import ProblemNoList from '../problemNoList';
import { contentWrapper } from './Dashboard.less';

const { PureComponent } = React;

class Dashboard extends PureComponent {
  render() {
    return (
      <div className={contentWrapper}>
        <ProblemNoList />
      </div>
    );
  }
}

export default Dashboard;
