import * as React from 'react';
import StatusFilter from '../statusFilter';
// import StatusList from '../StatusList';
import ContentWrapper from '../contentWrapper';

const { PureComponent } = React;

class StatusDashboard extends PureComponent {
  render() {
    return (
      <ContentWrapper>
        <StatusFilter />
        {/* <StatusList /> */}
      </ContentWrapper>
    );
  }
}

export default StatusDashboard;
