import { useTheme, useMediaQuery } from '@mui/material';
import React from 'react';

interface ImageProps {
  src?: string;
  alt?: string;
}

function Image({ src, alt }: ImageProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <img
      src={src}
      alt={alt}
      style={
        matches
          ? {
              width: '100%',
              height: '100%',
            }
          : {}
      }
    />
  );
}

export default Image;
