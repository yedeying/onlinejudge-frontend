import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { IProblemNoItem } from '../../redux/reducers/training';
import { AppState } from '../../redux/types';
import { selectProblemNoList } from '../../redux/selectors/problemList';

const { PureComponent } = React;
const TabPane = Tabs.TabPane;

interface IStateProps {
  problemNoList: List<IProblemNoItem>;
}

interface IProblemNoListProps extends IStateProps {}

class ProblemNoList extends PureComponent<IProblemNoListProps> {
  render() {
    const { problemNoList } = this.props;
    console.log('ss', problemNoList.toJS());
    return (
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{ height: 220 }}
      >
        {problemNoList.toJS().map((no: IProblemNoItem) => {
          return (
            <TabPane tab={no.id} key={no.id}>{no.title}</TabPane>
          );
        })}
      </Tabs>
    );
  }
}

const mapPropsToState = (state: AppState): IStateProps => ({
  problemNoList: selectProblemNoList(state)
});

export default connect<IStateProps, {}, {}, AppState>(
  mapPropsToState
)(ProblemNoList);
