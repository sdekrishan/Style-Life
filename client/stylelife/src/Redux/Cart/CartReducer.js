import {
  GET_CART_ERROR,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "./Cart.action";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_CART_SUCCESS: {
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    }
    case GET_CART_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
