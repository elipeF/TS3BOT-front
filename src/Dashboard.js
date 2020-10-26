import React, { Component, Suspense } from 'react';
import clsx from 'clsx';
import i18n from "./i18n";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import * as LangMenu from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GTranslateIcon from '@material-ui/icons/GTranslate';

import routes from './views/routes'
import Spinner from './ui/Spinner';
import NotFound from './views/404';
import Menu from './menu/Menu';
import { connect } from 'react-redux';
import { getConfig, updateConfig } from './redux/actions/ConfigActions';
import NotificationDisplay from './NotificationDisplay';
import { MenuItem } from '@material-ui/core';

const drawerWidth = 240;

const style = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
  },
  fixedHeight: {
    height: 240,
  },
});

class Dashboard extends Component {

  state = {
    open: true,
    openLangMenu: null,
    component: <Spinner />
  }

  renderComponent(name, loaded = false) {
    const cfgentry = routes.find(comp => comp.cfgname === name);
    if (cfgentry) {
      if (loaded && this.props.element === name) {
        this.setState((state) => {
          return {
            ...state,
            component: <cfgentry.component send={(params) => this.sendConfig(name, params)} data={this.props.data} />
          }
        })
      } else {
        this.props.onConfFetch(cfgentry.cfgname)
        this.setState((state) => {
          return {
            ...state,
            component: <Spinner />
          }
        })
      }
    } else {
      this.setState((state) => {
        return {
          ...state,
          component: <NotFound />
        }
      })
    }
  }

  sendConfig(name, config) {
    this.props.onConfUpdate(name, config)
  }

  componentDidMount() {
    this.renderComponent(this.props.match.params.cfgname)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.cfgname !== this.props.match.params.cfgname) {
      this.renderComponent(this.props.match.params.cfgname)
    }

    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === false) {
        this.renderComponent(this.props.match.params.cfgname, true)
      }
    }
  }

  handleDrawer() {
    this.setState((state) => {
      return {
        ...state,
        open: !state.open
      }
    })
  }

  handleLangMenuOpen(event) {
    this.setState({
      ...this.state,
      openLangMenu: event.currentTarget
    })
  }

  handleLangMenuClose(lang) {
    i18n.changeLanguage(lang)
    this.setState({
      ...this.state,
      openLangMenu: null
    })
  }

  render() {
    const { open } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NotificationDisplay />
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => this.handleDrawer()}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              TS3BOT
          </Typography>
            <IconButton onClick={(e) => this.handleLangMenuOpen(e)} color="inherit">
              <GTranslateIcon />
            </IconButton>
            <LangMenu.Menu
              id="simple-menu"
              anchorEl={this.state.openLangMenu}
              keepMounted
              open={Boolean(this.state.openLangMenu)}
              onClose={() => this.handleLangMenuClose()}
            >
              <MenuItem onClick={() => this.handleLangMenuClose('pl')}>Polski</MenuItem>
              <MenuItem onClick={() => this.handleLangMenuClose('en')}>English</MenuItem>
            </LangMenu.Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={() => this.handleDrawer()}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Menu />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
              <Suspense fallback={<Spinner />}>
                {this.state.component}
              </Suspense>
            </Grid>
          </Container>
        </main>
      </div >
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.config.loading,
    data: state.config.data,
    element: state.config.element
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConfFetch: (name) => dispatch(getConfig(name)),
    onConfUpdate: (name, conf) => dispatch(updateConfig(name, conf))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard))
