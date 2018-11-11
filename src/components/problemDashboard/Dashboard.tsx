import * as React from 'react';
import PageList from '../pageList';
import ContentWrapper from '../contentWrapper';
import ProblemList from '$components/problemList';

const { PureComponent } = React;

class Dashboard extends PureComponent {
  render() {
    return (
      <ContentWrapper>
        <PageList />
        <ProblemList />
      </ContentWrapper>
    );
  }
}

export default Dashboard;
