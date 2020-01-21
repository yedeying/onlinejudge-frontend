import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Table } from 'antd';
import classNames from 'classnames';

import Loading from '../loading';
import { AppState } from '$types';
import { columns } from './consts';
import { ProblemItem } from '$reducers/training';
import { selectProblemList, isProblemListLoading } from '$selectors/training';
import { selectActivePage } from '$selectors/router';
import { fetchProblemList } from '$actions/training';
import * as styles from './ProblemList.less';

const { PureComponent } = React;

interface IProblemListProps {
  problemList: List<ProblemItem>;
  actionPage: string;
  isLoading: boolean;
  fetchProblemList: typeof fetchProblemList;
}

class ProblemList extends PureComponent<IProblemListProps> {
  componentDidUpdate(prevProps: IProblemListProps) {
    const { actionPage, fetchProblemList } = this.props;
    if (actionPage !== prevProps.actionPage) {
      fetchProblemList(actionPage);
    }
  }

  componentDidMount() {
    const { fetchProblemList, actionPage } = this.props;
    fetchProblemList(actionPage);
  }

  render() {
    const { problemList, isLoading } = this.props;

    const loadingCls = classNames(styles.loading, {
      [styles.hide]: !isLoading
    });
    const tableCls = classNames('content-wrapper', styles.problemList);

    return (
      <div className={tableCls} style={{ marginTop: 20 }}>
        <div className={loadingCls}>
          <Loading />
        </div>
        <Table
          columns={columns}
          dataSource={problemList.toJS()}
          locale={{ filterConfirm: 'Confirm', filterReset: 'Reset' }}
          size="small"
          pagination={{ pageSize: 25, size: 'middle' }}
        />
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    problemList: selectProblemList(state),
    actionPage: selectActivePage(state),
    isLoading: isProblemListLoading(state)
  }),
  { fetchProblemList }
)(ProblemList);
