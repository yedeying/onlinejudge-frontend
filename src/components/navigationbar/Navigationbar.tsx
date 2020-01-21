import * as React from 'react';
import { Pathname } from 'history';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import classnames from 'classnames';
import { NavKey, SubNavKey } from '$constants/navigation';
import { Path } from '$constants/route';
import { Link } from 'react-router-dom';
import NavItem, { NavItemProps } from './NavItem';
import { AppState } from '$types';
import { selectPathname, selectCurrentUser, isLogin as selectIsLogin } from '$selectors';
import { UserInfo } from '$reducers/user';
import * as styles from './Navigationbar.less';
import { logout } from '$actions/user';

const { PureComponent } = React;
const { Header } = Layout;

type NavItemOptions = NavItemProps & {
  key: string;
  visible?: boolean;
  floatRight?: boolean;
  subNav?: NavItemOptions[];
};

interface INavigationbarProps {
  pathname: Pathname;
  currentUser: UserInfo | null | undefined;
  isLogin: boolean;
  logout: typeof logout;
}

class Navigationbar extends PureComponent<INavigationbarProps> {
  getNavList(): NavItemOptions[] {
    const { currentUser, logout } = this.props;
    return [{
      key: NavKey.training,
      route: Path.TRAINING,
      iconKey: 'user',
      text: 'Training',
      subNav: [{
        key: SubNavKey.problems,
        route: Path.TRAINING_PROBLEMS,
        text: 'Problems'
      }, {
        key: SubNavKey.status,
        route: Path.TRAINING_STATUS,
        text: 'Status'
      }, {
        key: SubNavKey.ranklist,
        route: Path.TRAINING_RANKLIST,
        text: 'Ranklist'
      }]
    }, {
      key: NavKey.contests,
      route: Path.CONTESTS,
      iconKey: 'team',
      text: 'Contests',
      subNav: [{
        key: SubNavKey.problems,
        route: Path.CONTESTS_PROBLEMS,
        text: 'Problems'
      }, {
        key: SubNavKey.status,
        route: Path.CONTESTS_STATUS,
        text: 'Status'
      }, {
        key: SubNavKey.ranklist,
        route: Path.CONTESTS_RANKLIST,
        text: 'Ranklist'
      }, {
        key: SubNavKey.statistics,
        route: Path.CONTESTS_STATISTICS,
        text: 'Statistics'
      }]
    }, {
      key: NavKey.issues,
      route: Path.ISSUES,
      iconKey: 'notification',
      text: 'Issues'
    }, {
      key: NavKey.register,
      route: Path.REGISTER,
      text: 'Register',
      visible: currentUser === null,
      floatRight: true
    }, {
      key: NavKey.login,
      route: Path.LOGIN,
      text: 'Login',
      visible: currentUser === null,
      floatRight: true
    }, {
      key: NavKey.logout,
      handleClick: () => {
        logout();
      },
      text: 'Logout',
      visible: !!currentUser,
      floatRight: true
    }];
  }

  getNavItemProps({ route, iconKey, text, handleClick }: NavItemOptions): NavItemProps {
    return { route, iconKey, text, handleClick };
  }

  getNavItemClass({ floatRight }: NavItemOptions): string {
    return classnames('', {
      [styles.menuRight]: floatRight
    });
  }

  getActiveNav(): NavItemOptions | null {
    const { pathname } = this.props;
    for (const navItem of this.getNavList()) {
      if (navItem.route && pathname.indexOf(navItem.route) === 0) {
        return navItem;
      }
    }
    return null;
  }

  getSubNav(activeNav: NavItemOptions | null): NavItemOptions[] {
    if (!activeNav || !activeNav.subNav) {
      return [];
    }
    if (activeNav.key === NavKey.contests) {
      return [];
    }
    return activeNav.subNav;
  }

  getActiveSubNav(): NavItemOptions | null {
    const { pathname } = this.props;
    const activeNav = this.getActiveNav();
    if (!activeNav || !activeNav.subNav) {
      return null;
    }
    for (const navItem of activeNav.subNav) {
      if (navItem.route && pathname.indexOf(navItem.route) === 0) {
        return navItem;
      }
    }
    return null;
  }

  render() {
    const activeNav = this.getActiveNav();
    const subNavList = this.getSubNav(activeNav);
    const activeSubNav = this.getActiveSubNav();
    return (
      <Header className={styles.header}>
        <div>
          <div className={styles.headerWrapper}>
            <div className={styles.brand}>
              <Link to={Path.ROOT}>OnlineJudge</Link>
            </div>
            <Menu
              className={styles.topMenu}
              theme="dark"
              mode="horizontal"
              selectedKeys={activeNav ? [activeNav.key] : []}
            >
              {this.getNavList().filter(nav => nav.visible !== false).map(nav => (
                <Menu.Item onClick={nav.handleClick} className={this.getNavItemClass(nav)} key={nav.key}>
                  <NavItem {...this.getNavItemProps(nav)} />
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>
        {subNavList.length > 0 && (
          <div className={styles.subNav}>
            <div className={styles.headerWrapper}>
              <Menu
                className={styles.subMenu}
                theme="dark"
                mode="horizontal"
                selectedKeys={activeSubNav ? [activeSubNav.key] : []}
              >
                {subNavList.map((nav: NavItemOptions) => (
                  <Menu.Item onClick={nav.handleClick} className={this.getNavItemClass(nav)} key={nav.key}>
                    <NavItem {...this.getNavItemProps(nav)} />
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          </div>
        )}
      </Header>
    );
  }
}

export default connect(
  (state: AppState) => ({
    pathname: selectPathname(state),
    currentUser: selectCurrentUser(state),
    isLogin: selectIsLogin(state)
  }),
  { logout }
)(Navigationbar);
