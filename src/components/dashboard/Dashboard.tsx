import * as React from 'react';
import ProblemNoList from '../problemNoList';
import ProblemList from '../problemList';

const { PureComponent } = React;

interface IDashboardProp {}

class Dashboard extends PureComponent<IDashboardProp> {
  render() {
    return (
      <div>
        <ProblemNoList />
        <ProblemList />
      </div>
    );
  }
}

export default IDashboardProp;
