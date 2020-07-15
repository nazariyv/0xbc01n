import React, {useContext, useState} from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExploreIcon from '@material-ui/icons/Explore';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import {ROUTES} from '../types/type';
import {ApplicationContext} from '../controller/context';
import {getUserName} from '../utils/utils';
import Filter from './filter';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  profileButton: {
    maxWidth: 150, 
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  fixedHeight: {
    height: 240,
  },
}));

const Header: React.FC = () => {
  const history = useHistory();
  const {handleLogIn, user, handleLogOut} = useContext(ApplicationContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleExplorePage = () => history.push(ROUTES.MAIN);
  const handleDashboardPage = () => history.push(ROUTES.USER_DASHBOARD);
  const handleCreateBountyPage = () => history.push(ROUTES.CREATE);
  const handleOpenProfile = () => {
    setAnchorEl(null);
    history.push(ROUTES.USER_PROFILE);
  };

  return (
      <>
        <AppBar position="absolute" className={classes.appBarShift}>
          <Toolbar className={classes.toolbar}>
            <Button
              color="inherit"
              onClick={handleCreateBountyPage}
            >
              Create bounty
            </Button>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                &nbsp;
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
              </Badge>
            </IconButton>
            {user === undefined && (
              <Button color="inherit" onClick={handleLogIn}>Login</Button>
            )}
            {user && (
              <div>
                <Button
                  color="inherit"
                  aria-controls="user-menu" 
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <Typography className={classes.profileButton}>
                    {getUserName(user)}
                  </Typography>
                </Button>
                <Menu id='user-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={true}
        >
          <div className={classes.toolbarIcon}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                0xbc01n
            </Typography>
          </div>
          <Divider />
          <List>
            {user && (
              <ListItem button onClick={handleDashboardPage}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
            <ListItem button onClick={handleExplorePage}>
              <ListItemIcon>
                  <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
          </List>
          <Divider />
          <Filter/>
        </Drawer>
      </>
  );
};

export default Header;
