import * as React from 'react';
import { List } from 'immutable';
import { ApplicationState } from '../../redux/modules/root';
import { IProblemItem } from '../../redux/modules/training';
import { selectProblemList } from '$selectors/problemList';
import { connect } from 'react-redux';

const { PureComponent } = React;

interface IStateProps {
  problemList: List<IProblemItem>;
}

interface IProblemListProps extends IStateProps {}

class ProblemList extends PureComponent<IProblemListProps> {
  render() {
    const { problemList } = this.props;
    return (
      <div>
        test + {JSON.stringify(problemList)}
      </div>
    );
  }
}

const mapPropsToState = ((state: ApplicationState): IStateProps => ({
  problemList: selectProblemList(state)
}));

export default connect<IStateProps, {}, {}, ApplicationState>(
  mapPropsToState
)(ProblemList);
