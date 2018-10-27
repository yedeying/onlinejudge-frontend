import { Map } from 'immutable';
import configureStore from './configureStore';

const store = configureStore(Map({}));

export default store;
