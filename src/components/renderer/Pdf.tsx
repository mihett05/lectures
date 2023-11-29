import React from 'react';
import { CurrentFile } from '../../lib/current-file';

import { Button, Box, useTheme, useMediaQuery } from '@mui/material';

interface PdfProps {
  file: CurrentFile;
}

function Pdf({ file }: PdfProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <object
          data={`${file.file}.${file.ext}`}
          type="application/pdf"
          style={{
            width: matches ? '100vw' : '80vw',

            height: '100vh',
          }}
        >
          <p>
            Unable to display PDF file. <a href={`${file.file}.${file.ext}`}>Download</a> instead.
          </p>
        </object>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mx: 5,
          my: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          href={`${file.file}.${file.ext}`}
          target="_blank"
          sx={{
            width: '100%',
          }}
        >
          Скачать
        </Button>
      </Box>
    </>
  );
}

export default Pdf;
