import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
    // when props or children is updated then only run modal
    //nextProps is the latest props and this.props is prevProps
  }
  componentWillUpdate() {
    console.log('[Modal] will update');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.closed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
