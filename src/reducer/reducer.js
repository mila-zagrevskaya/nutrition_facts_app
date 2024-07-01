import * as types from 'actionTypes/actionTypes';

const initialState = {
  menu: [],
  currentCategory: {},
  currentProduct: {},
  orderedProductsNutrients: [],
  order: {},
  isFetching: false,
};

export const getItemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    /** _______setMenuWithNavigationItems______ */
    case types.SET_MENU_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.SET_MENU_REQUEST_SUCCESS: {
      const { menu, initialCategory } = payload;
      return {
        ...state,
        isFetching: false,
        menu,
        currentCategory: initialCategory,
      };
    }

    /** _______set products of category _____ */
    case types.SET_CURRENT_CATEGORY: {
      const { menu } = state;
      const category = payload;
      const products = menu.filter((productType) => category === productType.category);
      const currentCategory = products[0];
      return {
        ...state,
        currentCategory,
      };
    }

    /** _______selected option_______ */
    case types.CHANGE_SELECTED_OPTION: {
      return {
        ...state,
        currentProduct: payload,
      };
    }

    /** _______clear selected option_______ */
    case types.CLEAR_SELECTED_OPTION: {
      const { productType, currentProduct } = payload;
      const { order } = state;
      order[productType] = order[productType].filter((product) => product.id !== currentProduct.id);
      return {
        ...state,
        currentProduct: {},
      };
    }

    /** _______check location and set current page_______ */
    case types.SET_CURRENT_PRODUCT: {
      const { order } = state;
      const selectedProduct = order.hasOwnProperty(payload) ? order[payload][0] : {};
      const currentProductCalories = selectedProduct.nutrients
        ? selectedProduct.nutrients[0].value
        : 0;
      return {
        ...state,
        order,
        currentProduct: selectedProduct,
        currentProductCalories,
      };
    }

    /** _______add dish to orders_______ */
    case types.ADD_TO_ORDERS: {
      const { productType, selectedOption } = payload;
      const { order } = state;
      // eslint-disable-next-line no-unused-expressions
      order.hasOwnProperty(productType)
        ? order[productType].push(selectedOption)
        : (order[productType] = [selectedOption]);
      return {
        ...state,
        order,
      };
    }
    /** _______change status of ingredient isActive_______ */
    case types.CHANGE_INGREDIENT_STATUS: {
      const selectedProduct = state.currentProduct;
      const newIngredients = selectedProduct.ingredients.map((ingredient) => {
        const newStateIngredient = ingredient;
        if (ingredient.id === payload) newStateIngredient.isActive = !newStateIngredient.isActive;
        return {
          ...ingredient,
          isActive: newStateIngredient.isActive,
        };
      });
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          ingredients: newIngredients,
        },
      };
    }

    /** _____count of the calorie of current dish ___________ */
    case types.SET_DEFAULT_AMOUNT_OF_CALORIES: {
      const orderedProductsNutrients = [
        {
          productName: payload.label,
          nutrients: { title: payload.nutrients[0].title, value: payload.nutrients[0].value },
        },
      ];
      return {
        ...state,
        orderedProductsNutrients,
      };
    }
    case types.COUNT_OF_THE_CALORIE: {
      const { orderedProductsNutrients } = state;
      const activeIngredients = payload.ingredients.filter((ingredient) => ingredient.isActive);
      const nutrients = activeIngredients.map((ingredient) => ingredient.nutrients[0]);
      const productCalories = nutrients.reduce(
        (sum, current) => {
          const sumValues = sum.value + current.value;
          return { title: current.title, value: sumValues };
        },
        { title: '', value: 0 },
      );
      orderedProductsNutrients.push({
        productName: payload.label,
        nutrients: productCalories,
      });

      return {
        ...state,
        orderedProductsNutrients,
      };
    }

    default:
      return state;
  }
};
