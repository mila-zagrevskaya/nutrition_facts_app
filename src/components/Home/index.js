import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SelectDish } from './SelectDish';
import { AddOns } from './AddOns';
import { NutritionFacts } from './NutritionFacts';

import './style.scss';

class HomeComponent extends Component {
  static propTypes = {
    history: PropTypes.object,
    pathname: PropTypes.string,
    menu: PropTypes.array,
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
  };

  render() {
    const { history, currentCategory } = this.props;
    const category = history.location.pathname.split('/')[1];
    return (
      <>
        {currentCategory && (
          <div className="wrapper">
            <>
              <SelectDish category={category} />
              <AddOns />
              <NutritionFacts category={category} />
            </>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  currentCategory: state.appState.currentCategory,
});

const mapDispatchToProps = {};

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
