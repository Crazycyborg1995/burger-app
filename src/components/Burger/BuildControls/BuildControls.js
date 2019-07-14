import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
  ];
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price : <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            label={ctrl.label}
            key={ctrl.label}
            addIngredients={() => props.addIngredients(ctrl.type)}
            removeIngredients={() => props.removeIngredients(ctrl.type)}
            disabledInfo={props.disabledInfo[ctrl.type]} // returns true or false
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.showModal}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default buildControls;
