import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { IProblemNoItem } from '../../redux/modules/training';
import { ApplicationState } from '../../redux/modules/root';
import { selectProblemNoList } from '$selectors/problemList';

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

const mapPropsToState = (state: ApplicationState): IStateProps => ({
  problemNoList: selectProblemNoList(state)
});

export default connect<IStateProps, {}, {}, ApplicationState>(
  mapPropsToState
)(ProblemNoList);
