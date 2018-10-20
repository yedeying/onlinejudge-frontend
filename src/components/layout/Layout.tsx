import * as React from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '..//navigationbar';

const { Component } = React;
// import Loadable from 'react-loadable';
// import { route } from '$constants';
// import './Layout.less';

// const LoadingMask = () => (
//   <div className="layout-column layout-main-cross-center flex">
//     Loading...
//   </div>
// );

// const SamplePage = Loadable({
//   loader: () => import('components/samplePage'),
//   loading: LoadingMask,
// });

class Layout extends Component {
  static displayName = 'Layout';

  render() {
    return (
      <div id="mainContainer" className="main-container">
        <div className="">
          <Route
            path="/"
            render={() => <NavigationBar />}
          />
          <Route path="/" render={() => <div>Welcome</div>} />
          { /* <Route
            path={route.PATH.SAMPLE_PAGE}
            render={() => <SamplePage />}
          /> */ }
        </div>
      </div>
    );
  }
}

export default Layout;
