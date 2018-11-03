import * as React from 'react';
import ProblemNoList from '../problemNoList';
import ProblemList from '../problemList';
import { contentWrapper } from './Dashboard.less';

const { PureComponent } = React;

class Dashboard extends PureComponent {
  render() {
    return (
      <div className={contentWrapper}>
        <ProblemNoList>
          <ProblemList />
        </ProblemNoList>
      </div>
    );
  }
}

export default Dashboard;
