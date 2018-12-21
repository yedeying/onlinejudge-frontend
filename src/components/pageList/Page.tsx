import * as React from 'react';
import { PageItem } from '$reducers/training';
import * as styles from './Page.less';
import classNames from 'classnames';

const { PureComponent } = React;

interface IPageProps {
  selected: boolean;
  page: PageItem;
  onChange: (page: PageItem) => void;
}

export default class Page extends PureComponent<IPageProps> {
  render() {
    const { page, selected, onChange } = this.props;
    const cls = classNames(styles.pageItem, {
      [styles.active]: selected
    });
    return (<span className={cls} onClick={() => onChange(page)}>
      {page.get('text')}
    </span>);
  }
}
