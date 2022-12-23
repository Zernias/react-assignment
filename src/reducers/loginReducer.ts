import { loginConstants } from "../constants/loginConstants";

const { SET_USERNAME, SET_PASSWORD, LOGIN, LOGIN_SUCCESS , LOGIN_FAIL, LOGOUT} = loginConstants

const initialState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLogged: false,
  token: "",
};

export const loginReducer = (
  state: LoginState = initialState,
  action: Action
): LoginState => {
  switch (action.type) {
    case SET_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      };
    }
    case LOGIN: {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        error: "",
        isLoading: false,
        isLogged: true,
        token: action.payload,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        error: "Invalid username or password",
        isLoading: false,
        isLogged: false,
        username: "",
        password: "",
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLogged: false,
        username: "",
        password: "",
      };
    }
    default:
      return state;
  }
};
