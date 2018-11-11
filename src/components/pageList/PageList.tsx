import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import history from '$redux/store/history';
import { PageItem } from '$redux/reducers/training';
import { AppState } from '$redux/types';
import { Path } from '$constants/route';
import { selectPageList } from '$redux/selectors/training';
import { selectActivePage } from '$redux/selectors/router';
import { fetchPageList } from '$redux/actions/training';
import Page from './Page';
import * as styles from './Page.less';

const { PureComponent } = React;

interface IStateProps {
  pageList: List<PageItem>;
  actionPage: string;
}
interface IDispatchProps {
  fetchPageList: typeof fetchPageList;
}

interface IPageListProps extends IStateProps, IDispatchProps {}

class PageList extends PureComponent<IPageListProps> {
  componentDidMount() {
    this.props.fetchPageList();
  }

  private handleActivePage = (page: PageItem) => {
    history.push(Path.TRAINING_PROBLEMS_PAGE.replace(':pageId', page.get('id')));
  }

  render() {
    const { actionPage, pageList } = this.props;
    return (
      <div className={`${styles.pageList} content-wrapper`}>
        {pageList.map(page => (
          <Page
            key={page.get('id')}
            selected={actionPage === page.get('id')}
            page={page}
            onChange={this.handleActivePage}
          />
        ))}
      </div>
    );
  }
}

export default connect<IStateProps, IDispatchProps, {}, AppState>(
  state => ({
    pageList: selectPageList(state),
    actionPage: selectActivePage(state)
  }),
  { fetchPageList }
)(PageList);
