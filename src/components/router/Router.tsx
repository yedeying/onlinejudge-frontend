import * as React from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { onLocationChanged } from '$actions/router';
import { AppState } from '$types';
import { History, Location, Action } from 'history';

const { PureComponent } = React;

interface IAppRouterProps {
  action: Action;
  location: Location;
  onLocationChanged: typeof onLocationChanged;
  history: History;
}

class AppRouter extends PureComponent<IAppRouterProps> {
  private inTimeTravelling = false;

  private unlisten: () => void;

  constructor(props: IAppRouterProps) {
    super(props);

    this.inTimeTravelling = false;

    const {
      pathname: pathnameInStore,
      search: searchInStore,
      hash: hashInStore
    } = props.location;
    // Extract history's location
    const {
      pathname: pathnameInHistory,
      search: searchInHistory,
      hash: hashInHistory
    } = props.history.location;

    // If we do time travelling, the location in store is changed but location in history is not changed
    if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
      this.inTimeTravelling = true;
      // Update history's location to match store's location
      props.history.push({
        pathname: pathnameInStore,
        search: searchInStore,
        hash: hashInStore
      });
    }

    const handleLocationChange = (location: Location, action: Action) => {
      // Dispatch onLocationChanged except when we're in time travelling
      if (!this.inTimeTravelling) {
        props.onLocationChanged(location, action);
      } else {
        this.inTimeTravelling = false;
      }
    };

    // Listen to history changes
    this.unlisten = props.history.listen(handleLocationChange);
    // Dispatch a location change action for the initial location
    handleLocationChange(props.history.location, props.history.action);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { history, children } = this.props;

    return (
      <Router history={history}>
        { children }
      </Router>
    );
  }
}

export default connect(
  (state: AppState) => ({
    action: state.getIn(['router', 'action']),
    location: state.getIn(['router', 'location'])
  }),
  { onLocationChanged }
)(AppRouter);
