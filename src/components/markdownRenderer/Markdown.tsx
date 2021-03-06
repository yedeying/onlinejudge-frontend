import * as React from 'react';
import * as Markdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import { InlineMath, BlockMath } from 'react-katex';
import * as styles from './Markdown.less';
import 'katex/dist/katex.min.css';

const { PureComponent } = React;

export default class MarkdownRenderer extends PureComponent<{ source: string }> {
  render() {
    const { source } = this.props;
    const uc = '\0';
    const markdownProps = {
      source: source
        .replace(/\$\$\$/g, uc.repeat(3))
        .replace(/\0\0\0(.*)\$(.*)\0\0\0/g, `${uc.repeat(3)}$1\\${uc}$2${uc.repeat(3)}`)
        .replace(/\0/g, '$')
        .replace(/\$\$\$/g, '$'),
      plugins: [
        RemarkMathPlugin
      ],
      renderers: {
        math: (props: {value: string}) => <BlockMath math={props.value} />,
        inlineMath: (props: {value: string}) => <InlineMath math={props.value} />
      } as any
    };
    return <Markdown className={styles.markdown} {...markdownProps} />;
  }
}
