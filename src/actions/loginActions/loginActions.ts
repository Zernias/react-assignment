import { loginConstants } from "../../constants/loginConstants";

const {
  SET_USERNAME: USERNAME_INPUT,
  SET_PASSWORD: PASSWORD_INPUT,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} = loginConstants;

export function setUsername(inputValue: string) {
  return {
    type: USERNAME_INPUT,
    payload: inputValue,
  };
}

export function setPassword(inputValue: string) {
  return {
    type: PASSWORD_INPUT,
    payload: inputValue,
  };
}

export function login(): Action {
  return {
    type: LOGIN,
  };
}

export function loginSuccess(token: string | boolean): Action {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
}

export function loginFail(): Action {
  return {
    type: LOGIN_FAIL,
  };
}

export function logout(): Action {
  return {
    type: LOGOUT,
  };
}
