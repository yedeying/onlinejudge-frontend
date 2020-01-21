import * as React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Path } from '$constants/route';

export interface NavItemProps {
  route?: Path;
  handleClick?: () => void;
  text: string;
  iconKey?: string;
}

export default ({ text, route, iconKey }: NavItemProps) => {
  if (route) {
    return (
      <Link to={route}>
        {iconKey && <Icon type={iconKey} theme="outlined" />}
        {text}
      </Link>
    );
  } else {
    return (
      <span>
        {iconKey && <Icon type={iconKey} theme="outlined" />}
        {text}
      </span>
    );
  }
};
