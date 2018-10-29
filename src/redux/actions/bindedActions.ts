import store from '../store';
import { bindActionCreators } from 'redux';
import * as training from './training';

export default bindActionCreators(
  {
    ...training,
  },
  store.dispatch
);
