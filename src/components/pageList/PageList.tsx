import * as React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';

import history from '$store/history';
import { PageItem } from '$reducers/training';
import { AppState } from '$types';
import { Path } from '$constants/route';
import { selectPageList } from '$selectors/training';
import { selectActivePage } from '$selectors/router';
import { fetchPageList } from '$actions/training';
import Page from './Page';
import * as styles from './Page.less';

const { PureComponent } = React;

interface IPageListProps {
  pageList: List<PageItem>;
  actionPage: string;
  fetchPageList: typeof fetchPageList;
}

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

export default connect(
  (state: AppState) => ({
    pageList: selectPageList(state),
    actionPage: selectActivePage(state)
  }),
  { fetchPageList }
)(PageList);
