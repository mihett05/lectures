import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { makeTitleFromFile } from '../lib/title';
import { CurrentFilexContext } from '../lib/current-file';
import { List, ListItemButton } from '@mui/material';

function Menu() {
  const files = import.meta.glob('/**/*.md');
  const navigate = useNavigate();
  const { file } = useContext(CurrentFilexContext);
  return (
    <List component="nav">
      {Object.keys(files)
        .filter((key) => key.includes('public'))
        .map((key) => key.replace('/public/', ''))
        .map((key) => (
          <ListItemButton
            key={key}
            onClick={() => navigate(`/${key.replace('.md', '')}`)}
            selected={file !== null && key.split('/')[0] === file.folder && key.split('/')[1] === file.file}
          >
            {makeTitleFromFile({
              file: key.replace('.md', '').split('/')[1],
              folder: key.replace('.md', '').split('/')[0],
              text: '',
            })}
          </ListItemButton>
        ))}
    </List>
  );
}

export default Menu;
