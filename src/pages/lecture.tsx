import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout';

import { CurrentFilexContext } from '../lib/current-file';
import { loadFile, parseUrl } from '../lib/loader';
import Loader from '../components/renderer/Loader';

function LecturePage() {
  const params = useParams();
  const { file, setFile } = useContext(CurrentFilexContext);

  useEffect(() => {
    (async () => {
      const parsed = parseUrl({
        folder: params.folder as string,
        filename: params.file as string,
      });
      const loadedFile = await loadFile({ ...parsed, dontLoad: parsed.ext === 'pdf' });
      setFile(loadedFile);
    })();
  }, [params, setFile]);

  return <Layout>{file && <Loader file={file} />}</Layout>;
}

export default LecturePage;
