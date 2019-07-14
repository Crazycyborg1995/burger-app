import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log('[Order Summary] is updating');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span> :{' '}
          {this.props.ingredients[igKey]}{' '}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients : </p>
        <ul>{ingredientSummary}</ul>
        <p>Final Price : {this.props.totalPrice.toFixed(2)}</p>
        <Button clicked={this.props.purchaseCancelHandler} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinueHandler} btnType="Success">
          CHECKOUT
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
