import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinners from '../../components/UI/Spinners/Spinners';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    // fetch ingredients
    this.props.onInitIngredients();
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  showModal = () => {
    // always arrow function if you're using 'this' in the method
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseContinueHandler = () => {
    // if this called on checkout page the content will already be rendered and the state wont be in effect, so we call it right before entering checkout page
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  render() {
    // Disable Button
    let disabledInfo = { ...this.props.ings };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // {meat : true, salad : false}
    }

    // Load Ingredients
    let burger = this.props.error ? (
      <p>Failed to Load Ingredients</p>
    ) : (
      <Spinners />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredients={this.props.onIngredientAdded}
            removeIngredients={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            totalPrice={this.props.price}
            isAuth={this.props.isAuthenticated}
            purchasable={this.updatePurchaseState(this.props.ings)}
            showModal={this.showModal}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.price}
          ingredients={this.props.ings}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredients(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
