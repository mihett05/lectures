import React, { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import markdown from 'markdown-it';

// eslint-disable-next-line
// @ts-ignore
import math from 'markdown-it-texmath';
import katex from 'katex';
import Layout from '../components/Layout';

import { CurrentFilexContext } from '../lib/current-file';
import { loadFile } from '../lib/loader';

const md = markdown({ html: true }).use(math, {
  engine: katex,
  delimiters: 'dollars',
});

function LecturePage() {
  // const file = useLoaderData() as CurrentFile;
  const params = useParams();
  const { setFile } = useContext(CurrentFilexContext);

  const ref = useRef(null);

  useEffect(() => {
    async () => {};
  }, []);

  useEffect(() => {
    (async () => {
      const loadedFile = await loadFile(params.folder as string, params.file as string);
      setFile(loadedFile);
      // eslint-disable-next-line
      // @ts-ignore
      ref.current.innerHTML = md.render(loadedFile.text);
    })();
  }, [params]);

  return (
    <Layout>
      <div ref={ref}></div>
    </Layout>
  );
}

export default LecturePage;
