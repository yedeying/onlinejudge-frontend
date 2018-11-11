import * as React from 'react';
import { connect } from 'react-redux';
import { fetchProblemDetail } from '$redux/actions/training';
import { AppState } from '$redux/types';
import { selectProblemNo } from '$redux/selectors/router';
import { isProblemDetailLoading, selectProblemDetail } from '$selectors/training';
import { ProblemDetail } from '$reducers/training';
import Loading from '../loading';
import Markdown from '../markdownRenderer';
import ContentWrapper from '../contentWrapper';

const { PureComponent } = React;

interface IStateProps {
  problemNo: string;
  detail: ProblemDetail | null;
  loading: boolean;
}

interface IDispatchProps {
  fetchProblemDetail: typeof fetchProblemDetail;
}

interface IProblemProps extends IStateProps, IDispatchProps {}

class Problem extends PureComponent<IProblemProps> {
  componentDidMount() {
    const { fetchProblemDetail, problemNo } = this.props;
    fetchProblemDetail(problemNo);
  }

  render() {
    const { loading, detail } = this.props;
    if (loading || !detail) {
      return (
        <ContentWrapper><Loading /></ContentWrapper>
      );
    }
    return (
      <ContentWrapper>
        <div className="content-wrapper" style={{ padding: 20, marginTop: 20 }}>
          <Markdown source={detail.get('description')} />
        </div>
      </ContentWrapper>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  state => ({
    problemNo: selectProblemNo(state),
    detail: selectProblemDetail(state),
    loading: isProblemDetailLoading(state)
  }),
  { fetchProblemDetail }
)(Problem);
