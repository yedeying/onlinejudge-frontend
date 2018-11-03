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
  // activeNoKey: string;
}

interface IProblemNoListProps extends IStateProps {}

class ProblemNoList extends PureComponent<IProblemNoListProps> {
  handleActiveNo = (key: string) => {
    console.log('key', key);
  }

  render() {
    const { problemNoList } = this.props;
    return (
      <Tabs
        defaultActiveKey="A"
        tabPosition="top"
        style={{ height: 220 }}
        onChange={this.handleActiveNo}
      >
        {problemNoList.toJS().map((no: IProblemNoItem) => {
          return (
            <TabPane tab={no.id} key={no.id}>{this.props.children}</TabPane>
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
