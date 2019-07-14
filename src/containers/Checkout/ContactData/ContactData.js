import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinners/Spinners';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 6,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'slowest', displayValue: 'Slowest' }
          ]
        },
        value: 'fastest',
        validation: {}, // for removing the error
        valid: true // for removing the error
      }
    },
    formIsValid: false
  };

  submitOrder = event => {
    event.preventDefault();

    const orders = {};
    for (let formElementIdentifier in this.state.orderForm) {
      // map values of each ele to a seperate object and send that object to firebase
      // formElementIdentifier is the key like email, name, street
      orders[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const orderData = {
      ingredients: this.props.ings,
      price: this.props.price,
      orders: orders,
      userId: this.props.userId
    };
    this.props.onOrderBurger(orderData, this.props.token);
  };

  checkValidity(value, rules) {
    let isValid = true;
    // if there is a required prop
    // by setting isValid true each condition needs to be true for isValid to return true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    // while cloning you only 1-d props, if the prop is nested then it is refernced rather than cloning, to avoid this wwe have to deep clone.
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    // update the input value
    updatedFormElement.value = event.target.value;

    // we are changing state and not updatedFormEle coz the valid property needs to be updated immediately when it changes
    this.state.orderForm[inputIdentifier].valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.valid = this.state.orderForm[inputIdentifier].valid;
    updatedFormElement.touched = true;

    // check if form is valid by looping through valid state of each input. Also make formIsValid true at initial stage so when formIsValid is false it should return false
    let formIsValid = true;
    for (let formElementIdentifier in this.state.orderForm) {
      formIsValid =
        this.state.orderForm[formElementIdentifier].valid && formIsValid;
    }

    // this is done to avoid immutability
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form action="">
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={event => this.inputChangeHandler(event, formElement.id)}
            isValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            value={formElement.config.value}
          />
        ))}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.submitOrder}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.burgerPurchase(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
