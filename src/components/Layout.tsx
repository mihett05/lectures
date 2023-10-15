import React, { useContext, useState } from 'react';

import Menu from './Menu';
import { CurrentFilexContext } from '../lib/current-file';
import { makeTitleFromFile } from '../lib/title';
import { AppBar, Toolbar, IconButton, Typography, Box, Divider, Drawer } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MenuIcon from '@mui/icons-material/Menu';

interface DrawerMenuProps {
  handleDrawerToggle: () => void;
}

function DrawerMenu({ handleDrawerToggle }: DrawerMenuProps) {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <Menu />
    </Box>
  );
}

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { file } = useContext(CurrentFilexContext);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {file === null ? 'Лекции' : makeTitleFromFile(file)}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
          }}
        >
          <DrawerMenu handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
      <Grid container spacing={2}>
        <Grid
          xs={2}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Menu />
        </Grid>
        <Grid xs={10}>{children}</Grid>
      </Grid>
    </>
  );
}

export default Layout;
