import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import './style.scss';

export class SelectComponent extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(
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
    selectHandleChange: PropTypes.func,
  };

  handleChange = (selectedOption) => {
    this.props.selectHandleChange(selectedOption);
  };

  render() {
    const { options, currentProduct } = this.props;
    return (
      <Select
        options={options}
        value={currentProduct}
        onChange={this.handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    );
  }
}
