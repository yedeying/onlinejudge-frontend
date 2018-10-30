import * as React from 'react';
import { List } from 'immutable';
import { ApplicationState } from '../../redux/modules/root';
import { IProblemItem, IProblemTypeItem } from '../../redux/modules/training';
import { selectProblemList } from '$selectors/problemList';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

const { PureComponent } = React;
const TabPane = Tabs.TabPane;

interface IStateProps {
  problemList: List<IProblemItem>;
  problemTypeList: List<IProblemTypeItem>;
}

interface IProblemListProps extends IStateProps {}

class ProblemList extends PureComponent<IProblemListProps> {
  render() {
    const { problemList, problemTypeList } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="A" tabPosition="top" style={{ height: 220 }}>
          {problemTypeList.map(item => {
            return (
              <TabPane tab="">
              
              </TabPane>
            );
          })}
        </Tabs>
        test + {JSON.stringify(problemList)}
      </div>
    );
  }
}

const mapPropsToState = ((state: ApplicationState): IStateProps => ({
  problemList: selectProblemList(state)
}));

export default connect<IStateProps, {}, {}, ApplicationState>(
  mapPropsToState
)(ProblemList);
