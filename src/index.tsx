import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import store from './redux/store';
import history from './redux/store/history';
import App from './components/app';
// import registerServiceWorker from './registerServiceWorker';
import './styles/index.less';
import 'antd/dist/antd.less';

window.addEventListener('unhandledrejection', evt => {
  console.error(evt);
});

const MOUNT_NODE = document.getElementById('main');

const render = (Component: typeof React.Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    MOUNT_NODE
  );
};

render(App);
// registerServiceWorker();
