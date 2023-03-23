import {
  ADMIN_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from "./Auth.types";
import axios from "axios";
export const loginAction = (data) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_REQUEST });
  try {
    let res = await axios.post(
      "https://busy-cyan-betta-garb.cyclic.app/user/login",
      data
    );
    if (res.data.msg === "Admin login successful") {
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: res.data.token });
    } else {
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data.token });
    }
    return res;
  } catch (err) {
    return dispatch({ type: AUTH_LOGIN_ERROR });
  }
};
