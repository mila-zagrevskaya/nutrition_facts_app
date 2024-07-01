import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './style.scss';

export class NutritionFactsComponent extends Component {
  static propTypes = {
    category: PropTypes.string,
    label: PropTypes.string,
    order: PropTypes.object,
    currentProduct: PropTypes.object,
    orderedProductsNutrients: PropTypes.array,
  };

  render() {
    const { orderedProductsNutrients } = this.props;
    return (
      <div className="section-container">
        <h2 className="section-title">3. nutrition facts</h2>
        <div className="general-information">
          <h4>
            All Calories <span>{0}</span>
          </h4>
        </div>

        <div className="amount-per-serving">
          <h4>Amount per serving</h4>
          <div>
            {orderedProductsNutrients.length
              && orderedProductsNutrients.map((dish, index) => (
                <p key={index}>
                  {dish.productName}
                  <span> {dish.nutrients.value} </span>
                </p>
              ))}
          </div>
        </div>
        <div className="next-dish-button" onClick={this.showDataOfOrder}>
          Next dish
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.appState.order,
  currentProduct: state.appState.currentProduct,
  currentCategory: state.appState.currentCategory,
  orderedProductsNutrients: state.appState.orderedProductsNutrients,
});

const mapDispatchToProps = {};

export const NutritionFacts = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NutritionFactsComponent);
