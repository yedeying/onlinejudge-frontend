import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tag, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';

import Loading from '../loading';
import { Path } from '../../constants/route';
import { AppState } from '../../redux/types';
import { IProblemItem, ProblemItem } from '../../redux/reducers/training';
import { selectProblemList, isProblemListLoading } from '../../redux/selectors/training';
import { selectActivePage } from '../../redux/selectors/router';
import { fetchProblemList } from '../../redux/actions/training';

const { PureComponent } = React;

const TitleContent = (value: string, record: IProblemItem) => {
  return {
    children: (<Link to={Path.TRAINING_PROBLEM.replace(':problemNo', record.no)}>{value}</Link>)
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

const columns: ColumnProps<IProblemItem>[] = [{
  title: 'No',
  dataIndex: 'no',
  sorter: (a, b) => parseInt(a.no.slice(1), 10) - parseInt(b.no.slice(1), 10),
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
  // key: 'difficulity',
  filters: [
    { text: 'Easy', value: 'easy' },
    { text: 'Medium', value: 'medium' },
    { text: 'Hard', value: 'hard' }
  ],
  onFilter: (value, record) => {
    const str = record.difficulity || '';
    return str.indexOf(value) === 0;
  }
}];

interface IStateProps {
  problemList: List<ProblemItem>;
  actionPage: string;
  isLoading: boolean;
}

interface IDispatchProps {
  fetchProblemList: typeof fetchProblemList;
}

interface IProblemListProps extends IStateProps, IDispatchProps {
  pageId: string;
}

class ProblemList extends PureComponent<IProblemListProps> {
  componentDidUpdate(prevProps: IProblemListProps) {
    const { actionPage, pageId, fetchProblemList } = this.props;
    if (actionPage !== prevProps.actionPage && actionPage === pageId) {
      fetchProblemList(actionPage);
    }
  }

  componentDidMount() {
    const { fetchProblemList, actionPage } = this.props;
    fetchProblemList(actionPage);
  }

  render() {
    const { problemList, isLoading } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <Table columns={columns}
          dataSource={problemList.toJS()}
          locale={{ filterConfirm: 'Confirm', filterReset: 'Reset' }}
          size="middle"
          pagination={false}
        />
      </div>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  state => ({
    problemList: selectProblemList(state),
    actionPage: selectActivePage(state),
    isLoading: isProblemListLoading(state)
  }),
  { fetchProblemList }
)(ProblemList);
