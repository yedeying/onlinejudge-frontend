import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tag, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { AppState } from '../../redux/types';
import { ProblemItem } from '../../redux/reducers/training';
import { selectProblemList } from '../../redux/selectors/training';
import { selectionActivePage } from '../../redux/selectors/route';
import { fetchProblemList } from '../../redux/actions/training';

const { PureComponent } = React;

const TitleContent = (value: string) => {
  return {
    children: (<a href="#">{value}</a>)
  };
};

const DifficulityContent = (value: string) => {
  let tpl;
  switch (value) {
    case 'easy':
      tpl = <Tag color="cyan">Easy</Tag>;
      break;
    case 'medium':
      tpl = (<Tag color="orange">Medium</Tag>);
      break;
    case 'hard':
      tpl = (<Tag color="red">Hard</Tag>);
      break;
    default:
      tpl = (<Tag color="blue">Uncategorized</Tag>);
  }
  return {
    children: tpl
  };
};

const columns: ColumnProps<{}>[] = [{
  title: 'No',
  dataIndex: 'no',
  sorter: true,
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
  actionPage: string;
}

interface IDispatchProps {
  fetchProblemList: typeof fetchProblemList;
}

interface IProblemListProps extends IStateProps, IDispatchProps {}

class ProblemList extends PureComponent<IProblemListProps> {
  componentDidMount() {
    const { fetchProblemList, actionPage } = this.props;
    fetchProblemList(actionPage);
  }

  render() {
    const { problemList } = this.props;

    return (
      <div>
        <Table columns={columns}
          dataSource={problemList.toJS()}
          locale={{ filterConfirm: 'Confirm', filterReset: 'Reset' }}
        />
      </div>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  state => ({
    problemList: selectProblemList(state),
    actionPage: selectionActivePage(state)
  }),
  { fetchProblemList }
)(ProblemList);
