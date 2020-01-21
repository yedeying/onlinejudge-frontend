import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Loading from '../loading';
import { Path } from '$constants/route';
import { AppState } from '$types';
import { IStatusItem, StatusItem } from '$reducers/training';
import { selectStatusList, isStatusListLoading } from '$selectors/training';
import { fetchStatusList } from '$actions/training';
import { selectActivePage } from '$selectors/router';
import { DateTime } from 'luxon';
import ContentWrapper from '../contentWrapper';
import * as styles from './StatusList.less';

const { PureComponent } = React;

const ProblemContent = (value: string, { title }: IStatusItem) => ({
  children: (
    <Link
      to={
        Path.TRAINING_PROBLEM.replace(':problemNo', value)
      }
    >
      {value} - {title}
    </Link>
  )
});

const UserContent = (value: string, { userId }: IStatusItem) => ({
  children: (
    <Link to={Path.USER_DETAIL.replace(':userId', userId.toString())}>
      {value}
    </Link>
  )
});

const columns: ColumnProps<IStatusItem>[] = [{
  title: 'Run ID',
  dataIndex: 'id',
  width: '10%',
  key: 'id'
}, {
  title: 'Problem',
  dataIndex: 'problemNo',
  width: '40%',
  render: ProblemContent,
  key: 'problemNo'
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status'
}, {
  title: 'User',
  dataIndex: 'username',
  render: UserContent,
  key: 'username'
}, {
  title: 'Language',
  dataIndex: 'language',
  key: 'language'
}, {
  title: 'CPU',
  dataIndex: 'usedTime',
  key: 'usedTime'
}, {
  title: 'Memory',
  dataIndex: 'usedMemory',
  key: 'usedMemory'
}, {
  title: 'Length',
  dataIndex: 'codeLength',
  key: 'codeLength'
}, {
  title: 'Time',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
  render: (value: Date) => DateTime.fromJSDate(value).toFormat('yyyy-MM-dd hh:mm:ss')
}];

interface IStatusListProps {
  statusList: List<StatusItem>;
  actionPage: number;
  isLoading: boolean;
  fetchStatusList: typeof fetchStatusList;
}

const PAGE_SIZE = 50;

class StatusList extends PureComponent<IStatusListProps> {
  componentDidUpdate(prevProps: IStatusListProps) {
    const { actionPage, fetchStatusList } = this.props;
    if (actionPage !== prevProps.actionPage) {
      fetchStatusList(actionPage, PAGE_SIZE);
    }
  }

  componentDidMount() {
    const { fetchStatusList, actionPage } = this.props;
    fetchStatusList(actionPage, PAGE_SIZE);
  }

  render() {
    const { statusList, isLoading } = this.props;

    const loadingCls = classNames(styles.loading, {
      [styles.hide]: !isLoading
    });
    const tableCls = classNames('content-wrapper', styles.statusList);

    return (
      <ContentWrapper>
        <div className={tableCls} style={{ marginTop: 20 }}>
          <div className={loadingCls}>
            <Loading />
          </div>
          <Table
            columns={columns}
            dataSource={statusList.toJS()}
            locale={{ filterConfirm: 'Confirm', filterReset: 'Reset' }}
            size="small"
            pagination={statusList.size < PAGE_SIZE ? false : { pageSize: PAGE_SIZE, size: 'middle' }}
          />
        </div>
      </ContentWrapper>
    );
  }
}

export default connect(
  (state: AppState) => ({
    statusList: selectStatusList(state),
    actionPage: parseInt(selectActivePage(state), 10) || 1,
    isLoading: isStatusListLoading(state)
  }),
  { fetchStatusList }
)(StatusList);
