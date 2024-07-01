import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Ingredient } from './layout';

export class AddIngredients extends Component {
  static propTypes = {
    ingredients: PropTypes.PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        isActive: PropTypes.bool,
        image: PropTypes.string,
        nutrients: PropTypes.array,
      }),
    ),
    changeIngredientStatus: PropTypes.func,
  };

  handleChange = (id, isActive) => {
    const { changeIngredientStatus } = this.props;
    if (!isActive) changeIngredientStatus(id);
  };

  render() {
    const { ingredients } = this.props;
    return (
      <>
        {ingredients && (
          <>
            {ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.id}
                id={ingredient.id}
                isActive={ingredient.isActive}
                image={ingredient.image}
                name={ingredient.name}
                handleChange={this.handleChange}
              />
            ))}
          </>
        )}
      </>
    );
  }
}
