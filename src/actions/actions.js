import * as types from 'actionTypes/actionTypes';

const setMenuRequest = (menu) => ({
  type: types.SET_MENU_REQUEST,
  payload: menu,
});

const setMenuRequestSuccess = (menu) => ({
  type: types.SET_MENU_REQUEST_SUCCESS,
  payload: menu,
});

export const setMenuWithNavigation = (url) => async (dispatch) => {
  dispatch(setMenuRequest());
  const response = await fetch(url);
  const data = await response.json();
  const menu = Object.keys(data).map((category) => data[category]);
  const initialCategory = menu[0];
  dispatch(setMenuRequestSuccess({ menu, initialCategory }));
};

export const setCurrentCategory = (payload) => ({
  type: types.SET_CURRENT_CATEGORY,
  payload,
});

export const addToOrders = (productType, selectedOption) => ({
  type: types.ADD_TO_ORDERS,
  payload: { productType, selectedOption },
});

export const setCurrentProduct = (category) => ({
  type: types.SET_CURRENT_PRODUCT,
  payload: category,
});

export const changeSelectedOption = (selectedOption) => ({
  type: types.CHANGE_SELECTED_OPTION,
  payload: selectedOption,
});

export const clearSelectedOption = (productType, currentProduct) => ({
  type: types.CLEAR_SELECTED_OPTION,
  payload: { productType, currentProduct },
});

export const changeIngredientStatus = (id) => ({
  type: types.CHANGE_INGREDIENT_STATUS,
  payload: id,
});

export const setDefaultAmountOfCalories = (nutrients) => ({
  type: types.SET_DEFAULT_AMOUNT_OF_CALORIES,
  payload: nutrients,
});
export const countOfTheCalorie = (product) => ({
  type: types.COUNT_OF_THE_CALORIE,
  payload: product,
});
