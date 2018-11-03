import * as React from 'react';
import { List } from 'immutable';
import { AppState } from '../../redux/types';
import { IProblemItem } from '../../redux/reducers/training';
import { selectProblemList } from '../../redux/selectors/problemList';
import { connect } from 'react-redux';
// import { Tabs } from 'antd';

const { PureComponent } = React;
// const TabPane = Tabs.TabPane;

const TitleContent = (value:string, row: IProblemItem, index: number) => {
  return {
    children: (<a href="#">{value}</a>)
  }
}

const columns = [{
  title: 'No',
  dataIndex: 'no',
  sortr: true,
  width: '10%',
}, {
  title: 'Title',
  dataIndex: 'id',
  width: '40%',
  render: TitleContent
}];

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

const mapPropsToState = (state: AppState): IStateProps => ({
  problemList: selectProblemList(state)
});

export default connect<IStateProps, {}, {}, AppState>(
  mapPropsToState
)(ProblemList);
