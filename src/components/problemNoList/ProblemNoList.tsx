import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { IProblemNoItem } from '../../redux/reducers/training';
import { AppState } from '../../redux/types';
import { selectProblemNoList } from '../../redux/selectors/problemList';

const { PureComponent, Fragment } = React;
const TabPane = Tabs.TabPane;

interface IStateProps {
  problemNoList: List<IProblemNoItem>;
}

interface IProblemNoListProps extends IStateProps {}

class ProblemNoList extends PureComponent<IProblemNoListProps> {
  render() {
    const { problemNoList } = this.props;
    return (
      <Fragment>
        {problemNoList.map(item => {
          return (
            <TabPane tab={item.id} key={item.id}>{item.title}</TabPane>
          );
        })}
      </Fragment>
    );
  }
}

const mapPropsToState = (state: AppState): IStateProps => ({
  problemNoList: selectProblemNoList(state)
});

export default connect<IStateProps, {}, {}, AppState>(
  mapPropsToState
)(ProblemNoList);
