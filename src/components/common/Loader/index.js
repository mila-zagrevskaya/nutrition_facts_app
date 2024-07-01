import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export const Loader = ({ children, flag }) => (flag ? (
    <div className="loader-box">
      <img
        className="loader"
        src="http://www.thesquarebarandgrill.co.uk/images/Preloader.gif"
        alt="Loading"
      />
    </div>
) : (
  children
));

Loader.propTypes = {
  children: PropTypes.any,
  flag: PropTypes.bool,
};
