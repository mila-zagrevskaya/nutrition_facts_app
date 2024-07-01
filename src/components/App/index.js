import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setMenuWithNavigation, setCurrentCategory, setCurrentProduct } from 'actions/actions';

import { BASE_URL } from 'constants/resource_URS';
import { Loader } from 'components/common/Loader';

import { Header } from 'components/Header';
import { Home } from 'components/Home';

import './style.scss';

class AppComponent extends Component {
  static propTypes = {
    setMenuWithNavigation: PropTypes.func,
    setCurrentCategory: PropTypes.func,
    setCurrentProduct: PropTypes.func,
    isFetching: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    menu: PropTypes.array,
  };

  initialPage = () => {
    const { menu } = this.props;
    this.props.setMenuWithNavigation(`${BASE_URL}`, menu);
  };

  getCurrentData = (category) => {
    this.props.setCurrentCategory(category);
    this.props.setCurrentProduct(category);
  };

  componentDidMount() {
    this.initialPage();
  }

  render() {
    const { history, menu, isFetching } = this.props;
    return (
      <Loader flag={isFetching}>
        {menu && (
          <>
            <Header menu={menu} />
            <Home history={history} />
          </>
        )}
      </Loader>
    );
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props;
    const { pathname } = history.location;
    const category = pathname.split('/')[1];

    if (prevProps.history.location.pathname === pathname) {
      this.getCurrentData(category);
    }
  }
}

const mapStateToProps = (state) => ({
  menu: state.appState.menu,
  isFetching: state.appState.isFetching,
});

const mapDispatchToProps = {
  setMenuWithNavigation,
  setCurrentCategory,
  setCurrentProduct,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);
