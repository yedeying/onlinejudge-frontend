import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import history from '../../redux/store/history';
import ProblemList from '../problemList';
import { ProblemNoItem } from '../../redux/reducers/training';
import { AppState } from '../../redux/types';
import { Path } from '../../constants/route';
import { selectProblemNoList } from '../../redux/selectors/training';
import { selectActivePage } from '../../redux/selectors/router';
import { fetchNoList } from '../../redux/actions/training';

const { PureComponent } = React;
const TabPane = Tabs.TabPane;

interface IStateProps {
  problemNoList: List<ProblemNoItem>;
  actionPage: string;
}
interface IDispatchProps {
  fetchNoList: typeof fetchNoList;
}

interface IProblemNoListProps extends IStateProps, IDispatchProps {}

class ProblemNoList extends PureComponent<IProblemNoListProps> {
  componentDidMount() {
    const { fetchNoList } = this.props;
    fetchNoList();
  }

  handleActiveNo = (key: string) => {
    history.push(Path.TRAINING_PROBLEMS_NO.replace(':no', key));
  }

  render() {
    const { problemNoList, actionPage } = this.props;
    return (
      <Tabs
        defaultActiveKey={actionPage}
        animated={false}
        tabPosition="top"
        style={{ width: '100%' }}
        onChange={this.handleActiveNo}
      >
        {problemNoList.map(no => {
          return (
            <TabPane tab={no.get('id')} key={no.get('id')}>
              <ProblemList pageId={no.get('id')} />
            </TabPane>
          );
        })}
      </Tabs>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  state => ({
    problemNoList: selectProblemNoList(state),
    actionPage: selectActivePage(state)
  }),
  { fetchNoList }
)(ProblemNoList);
