import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  loginSuccess,
  loginFail,
  setUsername,
  setPassword,
} from "../../actions/loginActions/loginActions";
import { typeRootReducer } from "../../reducers/rootReducer";
import { validateLogin, generateToken } from "../../utils/loginValidation";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { username, password, isLoading, error } = useSelector<
    typeRootReducer,
    LoginState
  >((state) => state.login);

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
    const encodedPassword = window.btoa(password);
    try {
      await validateLogin({ username, encodedPassword });
      const loginToken = generateToken({ username, encodedPassword }) || false;
      dispatch(loginSuccess(loginToken));
      navigate("/notes");
    } catch (error) {
      dispatch(loginFail());
    }
  };

  return (
    <div
      className="row d-flex justify-content-center mt-5"
      data-testid="login-page"
    >
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card py-3 px-2">
          <div className="division">
            <div className="row">
              <div className="jumbotron">
                <h1 className="display-3">Hello!</h1>
                <p className="lead">Please log into your account</p>
              </div>
            </div>
          </div>
          <form className="myform" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="email"
                value={username}
                onChange={(e) => dispatch(setUsername(e.target.value))}
              />
            </div>

            <div className="form-group ">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
            </div>

            <div className="row d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-block btn-primary btn-lg"
                disabled={isLoading}
                data-testid="submit-button"
              >
                <small>{isLoading ? "Verifying..." : "Login"}</small>
              </button>
              {error && (
                <p
                  className="alert alert-danger mt-4"
                  data-testid="error-message"
                >
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
