import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { makeTitleFromFile, FOLDERS_TRANSLATIONS } from '../lib/title';
import { CurrentFilexContext } from '../lib/current-file';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { Link, Typography } from '@mui/material';

const createLectures = (files: Record<string, unknown>): [string, string, string][] =>
  Object.keys(files)
    .filter((key) => key.includes('public'))
    .map((key) => key.replace('/public/', ''))
    .map((key) => [key.split('/')[0], ...key.split('/')[1].split('.')] as [string, string, string]);

const createNodes = (items: [string, string, string][]) => {
  const categories = items.reduce((prev, [folder]) => ({ ...prev, [folder]: FOLDERS_TRANSLATIONS[folder] }), {});
  const itemsByCategories = items.reduce(
    (prev, [folder, filename, ext]) => ({
      ...prev,
      [folder]: [
        ...(prev[folder] !== undefined ? prev[folder] : []),
        { folder, filename, ext, title: makeTitleFromFile(folder, filename) },
      ],
    }),
    {} as {
      [key: string]: {
        folder: string;
        filename: string;
        ext: string;
        title: string;
      }[];
    },
  );

  let nodeId = 1;
  return Object.keys(categories).map((category) => ({
    nodeId: `${nodeId++}`,
    title: FOLDERS_TRANSLATIONS[category],
    nodes: itemsByCategories[category].map((item) => ({
      title: item.title,
      nodeId: `${nodeId++}`,
      url: `/${item.folder}/${item.filename}_${item.ext}`,
    })),
  }));
};

interface MenuProps {
  onOpen?: () => unknown;
}

function Menu({ onOpen }: MenuProps) {
  const files = import.meta.glob('/**/*.(md|pdf)');

  const navigate = useNavigate();
  const { file } = useContext(CurrentFilexContext);

  const nodes = createNodes(createLectures(files));

  return (
    // <List component="nav">
    //   {items.map(([folder, filename, ext], i) => (
    //     <ListItemButton
    //       key={`${folder}_${filename}_${ext}`}
    //       onClick={() => navigate(`/${folder}/${filename}_${ext}`)}
    //       selected={file !== null && folder === file.folder && filename === file.file && ext === file.ext}
    //     >
    //       {makeTitleFromFile({
    //         file: filename,
    //         folder,
    //         text: '',
    //         ext,
    //       })}
    //     </ListItemButton>
    //   ))}
    // </List>
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {nodes.map((category) => (
        <TreeItem
          nodeId={category.nodeId}
          label={<Typography variant="h6">{category.title}</Typography>}
          key={category.nodeId}
        >
          {category.nodes.map((node) => (
            <TreeItem
              nodeId={node.nodeId}
              label={
                <Link
                  onClick={() => {
                    onOpen && onOpen();
                    navigate(node.url);
                  }}
                >
                  <Typography variant="subtitle1">{node.title}</Typography>
                </Link>
              }
              key={category.nodeId}
            />
          ))}
        </TreeItem>
      ))}
      {/* {Object.keys(categories).map((key, i) => (
        <TreeItem nodeId={`${i + 1}`} label={categories[key as keyof typeof categories]}>
          {itemsByCategories[key as keyof typeof itemsByCategories].map((title, j) => (
            <TreeItem nodeId={`${i * 100 + j + 1}`} label={title} />
          ))}
        </TreeItem>
      ))} */}
    </TreeView>
  );
}

export default Menu;
