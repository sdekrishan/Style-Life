import {
  ADMIN_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from "./Auth.types";

const token = JSON.parse(localStorage.getItem("StyleLifeUserData")) || "";
const adminToken = JSON.parse(localStorage.getItem("StyleLifeAdminData")) || "";
const initialState = {
  token: token,
  isAuth: false,
  isLoading: false,
  isError: false,
  adminToken: adminToken,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: payload,
        isAuth: true,
      };
    }
    case ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        adminToken: payload,
        isAuth: true,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
