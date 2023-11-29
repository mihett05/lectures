import React from 'react';
import Markdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';

// eslint-disable-next-line
// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex';

import 'katex/dist/katex.min.css';

import Image from '../Image';

import { CurrentFile } from '../../lib/current-file';

interface KatexProps {
  file: CurrentFile;
}

function Katex({ file }: KatexProps) {
  return (
    <Markdown
      remarkPlugins={[RemarkMathPlugin]}
      components={{
        code: (value) => {
          if (value.className?.includes('math-inline')) {
            return <InlineMath>{value.children}</InlineMath>;
          } else if (value.className?.includes('math-display')) {
            return <BlockMath>{value.children}</BlockMath>;
          }
          return <code>{value.children}</code>;
        },
        img: (value) => {
          return <Image src={value.src} alt={value.alt} />;
        },
      }}
    >
      {file.text}
    </Markdown>
  );
}

export default Katex;
