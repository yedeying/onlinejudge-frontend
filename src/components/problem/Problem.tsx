import * as React from 'react';
import { fetchProblemDetail } from '../../redux/actions/training';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { selectProblemNo } from '../../redux/selectors/router';
import { isProblemDetailLoading, selectProblemDetail } from '$selectors/training';
import { ProblemDetail } from '$reducers/training';
import { InlineMath, BlockMath } from 'react-katex';
import RemarkMathPlugin from 'remark-math';
import Loading from '../loading';
import * as Markdown from 'react-markdown';
import 'katex/dist/katex.min.css';

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
      return <Loading />;
    }
    const markdownProps = {
      source: detail.get('description'),
      plugins: [
        RemarkMathPlugin
      ],
      renderers: {
        math: (props: {value: string}) =>
          <BlockMath>{props.value}</BlockMath>,
        inlineMath: (props: {value: string}) =>
          <InlineMath>{props.value}</InlineMath>
      }
    };
    return <Markdown {...markdownProps} />;
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
