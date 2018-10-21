import * as React from 'react';
import { Layout } from 'antd';
import './Footer.less';

const { Component } = React;
const { Footer } = Layout;

export default class Navigationbar extends Component {
  render() {
    return (
      <Footer className="footer">
        <div>Shenzhen Universify Online Judge 1.0</div>
        <div>Copyright © 2015-2018 SZU ACM Team. All Rights Reserved.</div>
      </Footer>
    );
  }
}
