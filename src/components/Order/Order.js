import React from 'react';
import classes from './Order.css';

const order = props => {
  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName]
    });
  }
  const ingredientOutput = ingredients.map(ig => {
    return (
      <span style={style}>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {ingredientOutput}</p>
      <p>
        Price : <strong>{props.price.toFixed(2)} USD</strong>
      </p>
    </div>
  );
};

const style = {
  border: '1px solid #333',
  textTransform: 'capitalize',
  display: 'inline-block',
  padding: '5px',
  margin: '0 8px'
};

export default order;
