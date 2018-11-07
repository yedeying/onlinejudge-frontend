import * as React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';
import { loadingWrapper } from './Loading.less';

interface LoadingProps {
  type?: LoadingType;
  color?: string;
}

const Loading = ({ type = 'spinningBubbles', color = '#357edd' }: LoadingProps) => {
  return (
    <div className={loadingWrapper}>
      <ReactLoading type={type} color={color} />
    </div>
  );
};

export default Loading;
