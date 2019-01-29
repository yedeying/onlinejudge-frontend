import * as React from 'react';
import Loading from '../loading';
import ContentWrapper from '../contentWrapper';

const { PureComponent } = React;

interface IStatusProps {
  loading: boolean;
}

class StatusList extends PureComponent<IStatusProps> {
  componentDidMount() {
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <ContentWrapper><Loading /></ContentWrapper>
      );
    }
    return (
      <ContentWrapper>
        <p>shshs</p>
      </ContentWrapper>
    );
  }
}

export default StatusList;
