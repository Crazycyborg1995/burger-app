import React from 'react';
import classes from './Menu.css';

const menu = props => (
  <div className={classes.Menu} onClick={props.clicked}>
    {/* cant click on components */}
    <div />
    <div />
    <div />
  </div>
);

export default menu;
