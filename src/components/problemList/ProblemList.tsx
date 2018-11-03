import * as React from 'react';
import { List } from 'immutable';
import { AppState } from '../../redux/types';
import { ProblemItem } from '../../redux/reducers/training';
import { selectProblemList } from '../../redux/selectors/problemList';
import { connect } from 'react-redux';
import { Tag, Table } from 'antd';

const { PureComponent } = React;
// const TabPane = Tabs.TabPane;

const TitleContent = (value:string) => {
  return {
    children: (<a href="#">{value}</a>)
  };
};

const DifficulityContent = (value:string) => {
  let tpl;
  switch (value) {
    case 'easy':
      tpl = (<Tag color="cyan">Easy</Tag>);
      break;
    case 'medium':
      tpl = (<Tag color="orange">Medium</Tag>);
      break;
    case 'hard':
      tpl = (<Tag color="red">Hard</Tag>);
      break;
    default:
      tpl = (<Tag color="blue">uncategorized</Tag>);
  }
  return {
    children: tpl
  };
};

const columns = [{
  title: 'No',
  dataIndex: 'no',
  sortr: true,
  width: '10%',
  key: 'no'
}, {
  title: 'Title',
  dataIndex: 'title',
  width: '40%',
  render: TitleContent,
  key: 'title'
}, {
  title: 'Acceptance',
  dataIndex: 'acceptance',
  key: 'acceptance'
}, {
  title: 'Difficulity',
  dataIndex: 'difficulity',
  render: DifficulityContent,
  key: 'difficulity',
  filters: [
    { text: 'Easy', value: 'easy' },
    { text: 'Medium', value: 'medium' },
    { text: 'Hard', value: 'hard' }
  ]
}];

interface IStateProps {
  problemList: List<ProblemItem>;
}

interface IProblemListProps extends IStateProps {}

class ProblemList extends PureComponent<IProblemListProps> {
  render() {
    const { problemList } = this.props;

    return (
      <div>
        <Table columns={columns} dataSource={problemList.toJS()} locale={{ filterConfirm: 'Confirm', filterReset: 'Reset' }} />
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
