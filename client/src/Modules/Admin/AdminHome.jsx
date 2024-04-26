import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Users from './Components/Users';
import Seller from './Components/Seller';
import Reports from './Components/Reports';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#F44336',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: '#2196F3',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#F44336',
    color: '#fff',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop:"80px"

  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    setOpenDrawer(false);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Users':
        return <Users />;
      case 'Sellers':
        return <Seller />;
      case 'Reports':
        return <Reports />;
      case 'Logout':
        return Logout();
      default:
        return <Typography variant="h4" align="center" gutterBottom style={{color:"black"}}>Welcome to Online Sports Equipment Store</Typography>;
    }
  };

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear("user");
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      {/* Navbar */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin Dashboard
          </Typography>
          {/* <Avatar className={classes.avatar}>
            A
          </Avatar> */}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} style={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Users', 'Sellers', 'Reports', 'Logout'].map((text, index) => (
            <ListItem button key={text} onClick={() => handleItemClick(text)}>
              <ListItemIcon>{text === 'Users' ? <PersonIcon /> : text === 'Service Centers' ? <BusinessIcon /> : text === 'Reports' ? <AssessmentIcon /> : <ExitToAppIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
