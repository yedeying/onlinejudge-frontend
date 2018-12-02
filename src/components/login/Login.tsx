import * as React from 'react';
import { connect } from 'react-redux';
import { Path } from '$constants/route';
import { Link } from 'react-router-dom';
import { login, register } from '$actions';
import { message } from 'antd';

import * as style from './Login.less';

const { PureComponent } = React;

interface ILoginProps {
  mode: 'login' | 'register';
  login: typeof login;
  register: typeof register;
}

interface ILoginState {
  username: string;
  password: string;
  email: string;
}

class Login extends PureComponent<ILoginProps, ILoginState> {
  state = {
    username: '',
    password: '',
    email: ''
  };

  private validate(type: keyof ILoginState, value: string, message: string) {
    const regex = {
      username: /^[a-zA-Z\d._+-|$#%/\\@]{4,50}$/,
      password: /^[a-zA-Z\d._+-|$#%/\\@]{4,50}$/,
      email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
    if (!regex[type].test(value)) {
      throw new Error(message);
    }
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { mode, login, register } = this.props;
    const isLogin = mode === 'login';
    const { username, password, email } = this.state;
    try {
      this.validate('username', username, 'Format of username is invalid');
      this.validate('password', password, 'Format of password is invalid');
      !isLogin && this.validate('email', email, 'Format of email is invalid');
    } catch (e) {
      message.warning(e.message, 1);
      return;
    }

    if (isLogin) {
      login(username, password);
    } else {
      register(username, password, email);
    }
  }

  private handleChange = (field: keyof ILoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ [field]: value } as Pick<ILoginState, keyof ILoginState>);
  }

  render() {
    const { mode } = this.props;
    const { username, password, email } = this.state;
    const isLogin = mode === 'login';

    return (
      <div className={style.loginWrapper}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <div className={style.login}>
            <div className={style.title}>Online Judge</div>
            <input
              className={style.value}
              type="text"
              placeholder="Username"
              value={username}
              onChange={this.handleChange('username')}
            />
            <input
              className={style.value}
              type={isLogin ? 'password' : 'text'}
              placeholder="Password"
              value={password}
              onChange={this.handleChange('password')}
            />
            {!isLogin && (
              <input
                className={style.value}
                type="text"
                placeholder="Email"
                value={email}
                onChange={this.handleChange('email')}
              />
            )}
            <input className={style.confirm} type="submit" value={isLogin ? 'Login' : 'Register'} />
            {isLogin && (
              <Link className={style.jump} to={Path.REGISTER}>Register An Account</Link>
            ) || (
              <div className={style.jump}>
                <span style={{ marginRight: 4 }}>Have an account?</span>
                <Link to={Path.LOGIN}>Login</Link>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  login, register
})(Login);
