import React from 'react';
import PropTypes from 'prop-types';

import '../../ingredients.scss';

export const Ingredient = ({
  id, isActive, image, name, handleChange,
}) => (
  <div className="ingredient-wrapper">
    <div
      className={isActive ? 'img-wrapper disabled' : 'img-wrapper active'}
      onClick={() => handleChange(id, isActive)}>
      <img src={image} alt={name} />
      <div className="closing-button">
        <span>{isActive ? 'X' : '+'}</span>
      </div>
    </div>
    <h4>{name}</h4>
  </div>
);

Ingredient.propTypes = {
  ingredients: PropTypes.array,
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.bool,
  handleChange: PropTypes.func,
};
