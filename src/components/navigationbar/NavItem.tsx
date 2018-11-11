import * as React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Path } from '$constants/route';

export interface NavItemProps {
  route: Path;
  text: string;
  iconKey?: string;
}

export default ({ text, route, iconKey }: NavItemProps) => (
  <Link to={route}>
    {iconKey && <Icon type={iconKey} theme="outlined" />}
    {text}
  </Link>
);
