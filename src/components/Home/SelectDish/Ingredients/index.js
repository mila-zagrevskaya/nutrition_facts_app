import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { changeIngredientStatus, countOfTheCalorie } from 'actions/actions';

import { Ingredient } from './layout';

export class IngredientsComponent extends Component {
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
    currentProduct: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      value: PropTypes.string,
      image: PropTypes.string,
      nutrients: PropTypes.array,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          isActive: PropTypes.bool,
          image: PropTypes.string,
          nutrients: PropTypes.array,
        }),
      ),
    }),
    changeIngredientStatus: PropTypes.func,
    countOfTheCalorie: PropTypes.func,
  };

  changeIngredientStatus = (id) => {
    const { currentProduct } = this.props;
    this.props.changeIngredientStatus(id);
    this.props.countOfTheCalorie(currentProduct);
  };

  render() {
    const { ingredients } = this.props;
    return (
      <>
        {ingredients
          .filter((ingredient) => ingredient.isActive)
          .map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              id={ingredient.id}
              image={ingredient.image}
              name={ingredient.name}
              handleChange={this.changeIngredientStatus}
            />
          ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentProduct: state.appState.currentProduct,
  ingredients: state.appState.currentProduct.ingredients,
});

const mapDispatchToProps = { changeIngredientStatus, countOfTheCalorie };

export const Ingredients = connect(
  mapStateToProps,
  mapDispatchToProps,
)(IngredientsComponent);
