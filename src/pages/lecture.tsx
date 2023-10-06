import React, { useContext, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';

import markdown from 'markdown-it';

// eslint-disable-next-line
// @ts-ignore
import math from 'markdown-it-texmath';
import katex from 'katex';
import Layout from '../Layout';

import { CurrentFilexContext, type CurrentFile } from '../current-file';

const md = markdown({ html: true }).use(math, {
  engine: katex,
  delimiters: 'dollars',
});

function LecturePage() {
  const file = useLoaderData() as CurrentFile;
  const { setFile } = useContext(CurrentFilexContext);

  const ref = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    ref.current.innerHTML = md.render(file.text);
    setFile(file);
  }, [file]);

  return (
    <Layout>
      <div ref={ref}></div>
    </Layout>
  );
}

export default LecturePage;
