import * as React from 'react';
import { contentWrapper } from './ContentWrapper.less';

const { PureComponent } = React;

interface ContentWrapperProps {
  children: JSX.Element[] | JSX.Element;
}

export default class ContentWrapper extends PureComponent<ContentWrapperProps> {
  render() {
    const { children } = this.props;
    return (
      <div className={contentWrapper}>
        {children}
      </div>
    );
  }
}
