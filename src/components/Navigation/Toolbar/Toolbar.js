import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';

const toolbar = props => (
  <div className={classes.Toolbar}>
    <Menu clicked={props.toggleSideDrawer} />
    <div className={classes.Logo}>
      {/* Method 2 */}
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </div>
);

export default toolbar;
