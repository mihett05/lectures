import React from 'react';
import { Link } from 'react-router-dom';

import { makeTitleFromFile } from './current-file';

function Menu() {
  const files = import.meta.glob('../**/*.md');
  return (
    <ul className="nav flex-column">
      {Object.keys(files)
        .filter((key) => !key.includes('..'))
        .map((key) => (
          <li className="nav-item" key={key}>
            <Link className="nav-link" to={`/${key.replace('.md', '')}`}>
              {makeTitleFromFile({
                file: key.replace('./', '').replace('.md', '').split('/')[1],
                folder: key.replace('./', '').replace('.md', '').split('/')[0],
                text: '',
              })}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default Menu;
