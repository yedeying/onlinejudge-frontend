import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import history from '../../redux/store/history';
import { IProblemNoItem } from '../../redux/reducers/training';
import { AppState } from '../../redux/types';
import { selectProblemNoList } from '../../redux/selectors/problemList';
import { selectionActivePage } from '../../redux/selectors/route';

const { PureComponent } = React;
const TabPane = Tabs.TabPane;

interface IStateProps {
  problemNoList: List<IProblemNoItem>;
  actionPage: string;
}

interface IProblemNoListProps extends IStateProps {}

class ProblemNoList extends PureComponent<IProblemNoListProps> {
  handleActiveNo = (key: string) => {
    history.push(`/training/problems/${key}`);
  }

  render() {
    const { problemNoList, actionPage } = this.props;
    return (
      <Tabs
        defaultActiveKey={actionPage}
        tabPosition="top"
        style={{ width: '100%' }}
        onChange={this.handleActiveNo}
      >
        {problemNoList.toJS().map((no: IProblemNoItem) => {
          return (
            <TabPane tab={no.id} key={no.id}>
              {this.props.children}
            </TabPane>
          );
        })}
      </Tabs>
    );
  }
}

const mapPropsToState = (state: AppState): IStateProps => ({
  problemNoList: selectProblemNoList(state),
  actionPage: selectionActivePage(state)
});

export default connect<IStateProps, {}, {}, AppState>(
  mapPropsToState
)(ProblemNoList);
