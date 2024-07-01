import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { changeIngredientStatus, countOfTheCalorie } from 'actions/actions';

import { AddIngredients } from './Ingredients';

import './style.scss';

export class AddOnsComponent extends Component {
  static propTypes = {
    changeIngredientStatus: PropTypes.func,
    countOfTheCalorie: PropTypes.func,
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
    ingredients: PropTypes.PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        isActive: PropTypes.bool,
        image: PropTypes.string,
        nutrients: PropTypes.array,
      }),
    ),
  };

  handleChange = (id, isActive) => {
    const { currentProduct } = this.props;
    if (!isActive) this.props.changeIngredientStatus(id);
    this.props.countOfTheCalorie(currentProduct.ingredients);
  };

  render() {
    const { currentProduct } = this.props;
    const { ingredients } = currentProduct;
    return (
      <>
        {currentProduct && (
          <div className="section-container">
            <h2 className="section-title">2. add-ons</h2>
            {ingredients && (
              <div className="add-ons-ingredient-container">
                <div className="scrollbar" id="style">
                  <div className="force-overflow"></div>
                  <AddIngredients
                    ingredients={ingredients}
                    changeIngredientStatus={this.handleChange}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.appState.order,
  currentProduct: state.appState.currentProduct,
});

const mapDispatchToProps = { changeIngredientStatus, countOfTheCalorie };

export const AddOns = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddOnsComponent);
