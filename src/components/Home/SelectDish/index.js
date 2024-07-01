import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  clearSelectedOption,
  changeSelectedOption,
  addToOrders,
  setDefaultAmountOfCalories,
} from 'actions/actions';

import { SelectComponent } from 'components/common/select';
import { Ingredients } from './Ingredients';

import './style.scss';

class SelectDishComponent extends Component {
  static propTypes = {
    currentCategory: PropTypes.object,
    products: PropTypes.arrayOf(
      PropTypes.shape({
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
    category: PropTypes.string,
    clearSelectedOption: PropTypes.func,
    addToOrders: PropTypes.func,
    changeSelectedOption: PropTypes.func,
    setDefaultAmountOfCalories: PropTypes.func,
  };

  selectHandleChange = (selectedOption) => {
    const { category } = this.props;
    this.props.changeSelectedOption(selectedOption);
    this.props.setDefaultAmountOfCalories(selectedOption);
    this.props.addToOrders(category, selectedOption);
  };

  render() {
    const { currentCategory, currentProduct, category } = this.props;
    return (
      <div className="section-container">
        <h2 className="section-title">1. select dish</h2>
        <SelectComponent
          options={currentCategory.products}
          category={category}
          currentProduct={currentProduct}
          selectHandleChange={this.selectHandleChange}
        />
        <div className="product-image">
          <img src={currentProduct.image} alt={currentProduct.label} className="main-image" />
          {currentProduct.image && (
            <span
              className="clear-select"
              onClick={() => this.props.clearSelectedOption(category, currentProduct)}>
              X
            </span>
          )}
        </div>
        {currentProduct.ingredients && (
          <div className="ingredients-container">
            <Ingredients />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCategory: state.appState.currentCategory,
  order: state.appState.order,
  currentProduct: state.appState.currentProduct,
});

const mapDispatchToProps = {
  clearSelectedOption,
  changeSelectedOption,
  addToOrders,
  setDefaultAmountOfCalories,
};

export const SelectDish = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectDishComponent);
