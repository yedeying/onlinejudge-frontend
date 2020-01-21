import * as React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { IProblemItem } from '$reducers/training';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { Path } from '$constants/route';

const TitleContent = (value: string, record: IProblemItem) => {
  return {
    children: (
      <Link to={Path.TRAINING_PROBLEM.replace(':problemNo', record.no)}>{value}</Link>
    )
  };
};

const DifficulityContent = (value: string) => {
  let tpl;
  switch (value) {
    case 'easy':
      tpl = <Tag color="cyan">Easy</Tag>;
      break;
    case 'medium':
      tpl = (<Tag color="orange">Medium</Tag>);
      break;
    case 'hard':
      tpl = (<Tag color="red">Hard</Tag>);
      break;
    default:
      tpl = (<Tag color="blue">Uncategorized</Tag>);
  }
  return {
    children: tpl
  };
};

export const columns: ColumnProps<IProblemItem>[] = [{
  title: 'No',
  dataIndex: 'no',
  width: '10%',
  key: 'no'
}, {
  title: 'Title',
  dataIndex: 'title',
  width: '40%',
  render: TitleContent,
  key: 'title'
}, {
  title: 'Acceptance',
  dataIndex: 'acceptance',
  key: 'acceptance'
}, {
  title: 'Difficulity',
  dataIndex: 'difficulity',
  render: DifficulityContent,
  // key: 'difficulity',
  filters: [
    { text: 'Easy', value: 'easy' },
    { text: 'Medium', value: 'medium' },
    { text: 'Hard', value: 'hard' }
  ],
  onFilter: (value, record) => {
    const str = record.difficulity || '';
    return str.indexOf(value) === 0;
  }
}];
