import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '$redux/types';
import { isStatusListLoading } from '$redux/selectors/status';
import Loading from '../loading';
import ContentWrapper from '../contentWrapper';

const { PureComponent } = React;

interface IStatusFilterProps {
  isLoading: boolean;
}

class StatusFilter extends PureComponent<IStatusFilterProps> {
  componentDidMount() {
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <ContentWrapper><Loading /></ContentWrapper>
      );
    }
    return (
      <ContentWrapper>
        <p>test</p>
      </ContentWrapper>
    );
  }
}

export default connect(
  (state: AppState) => ({
    isLoading: isStatusListLoading(state)
  })
)(StatusFilter);
