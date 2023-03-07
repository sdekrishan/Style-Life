import { AUTH_LOGIN_ERROR, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from "./Auth.types"
import axios from 'axios'
export const loginAction = (data)=>async(dispatch) =>{
    dispatch ({type:AUTH_LOGIN_REQUEST});
    try{
        let res = await axios.post(
            "https://busy-cyan-betta-garb.cyclic.app/user/login",
            data
          );
          dispatch({type:AUTH_LOGIN_SUCCESS,payload:res.data.token})
          return res
    }catch(err){
        return dispatch({type:AUTH_LOGIN_ERROR})
    }
};

