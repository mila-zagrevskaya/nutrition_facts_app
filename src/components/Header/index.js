import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { HOME } from 'constants/pathnames';

import './style.scss';

export class Header extends Component {
  static propTypes = {
    menu: PropTypes.array,
  };

  render() {
    const { menu } = this.props;
    return (
      <header className="header">
        <div className="header-wrapper">
          <nav className="nav">
            <ul className="nav-list">
              {menu.map((el) => (
                <li className="nav-item " key={el.id}>
                  <NavLink to={`${HOME}${el.category}`} activeClassName="active">
                    <div className="nav-img-container ">
                      <img src={el.icon} alt={el.title} />
                    </div>
                    {el.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
