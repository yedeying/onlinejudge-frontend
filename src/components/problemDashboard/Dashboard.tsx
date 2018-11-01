import * as React from 'react';
import ProblemNoList from '../problemNoList';
import ProblemList from '../problemList';

const { PureComponent } = React;

class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <ProblemNoList />
        <ProblemList />
      </div>
    );
  }
}

export default Dashboard;
