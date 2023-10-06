import React, { useContext } from 'react';
import Menu from './Menu';
import { CurrentFilexContext } from '../lib/current-file';
import { makeTitleFromFile } from '../lib/title';

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { file } = useContext(CurrentFilexContext);
  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">{file === null ? 'Лекции' : makeTitleFromFile(file)}</span>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Menu />
          </div>
          <div className="col-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
