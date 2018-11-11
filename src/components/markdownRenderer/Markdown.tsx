import * as React from 'react';
import * as Markdown from 'react-markdown';
const RemarkMathPlugin = require('remark-math');
const { InlineMath, BlockMath } = require('react-katex');

const { PureComponent } = React;

export default class MarkdownRenderer extends PureComponent<{ source: string }> {
  render() {
    const { source } = this.props;
    const markdownProps = {
      source,
      plugins: [
        RemarkMathPlugin
      ],
      renderers: {
        math: (props: {value: string}) => <BlockMath>{props.value}</BlockMath>,
        inlineMath: (props: {value: string}) => <InlineMath>{props.value}</InlineMath>
      } as any
    };
    return <Markdown {...markdownProps} />;
  }
}
