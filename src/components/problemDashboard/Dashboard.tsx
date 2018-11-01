import * as React from 'react';
import ProblemNoList from '../problemNoList';
import ProblemList from '../problemList';
import './Dashboard.less';

const { PureComponent } = React;

class Dashboard extends PureComponent {
  render() {
    return (
      <div className="content-wrapper">
        <ProblemNoList />
        <ProblemList />
      </div>
    );
  }
}

export default Dashboard;
