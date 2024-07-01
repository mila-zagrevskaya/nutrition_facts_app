import React from 'react';
import PropTypes from 'prop-types';

import '../../ingredients.scss';

export const Ingredient = ({
  id, image, name, handleChange,
}) => (
  <div className="ingredient-wrapper">
    <div className="img-wrapper active" onClick={() => handleChange(id)}>
      <img src={image} alt={name} />
      <div className="closing-button">
        <span> X </span>
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
  handleChange: PropTypes.func,
};
