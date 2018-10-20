import store from '$store';
import { bindActionCreators } from 'redux';
// import * as sampleActions from './sample';

export default bindActionCreators(
  {
    // ...sampleActions,
  },
  store.dispatch
);
