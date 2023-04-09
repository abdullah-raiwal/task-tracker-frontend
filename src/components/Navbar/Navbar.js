import React, { useState } from "react";
import Card from "../UI/Card";
import {
  login,
  logout,
  LoginFormTrue,
  LoginFormFalse,
  UnsetAccessToken,
  RegFormFalse,
  RegFormTrue,
} from "../../Reducers/AuthReducer";
import RegisterForm from "../RegistrationForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/expenseApi";
import { deleteToken } from "../../services/setJWTKeys";

const Navbar = (props) => {
  const auth_status = useSelector((state) => state.auth.access_token);
  const login_form_status = useSelector((state) => state.auth.isLoginForm);
  const isRegisterForm = useSelector((state) => state.auth.isRegForm);
  const [logoutUser] = useLogoutMutation();

  const dispatch = useDispatch();

  const formHandler = () => {
    dispatch(LoginFormTrue());
    // setRegisterform(false);
    dispatch(RegFormFalse());
    console.log("form :" + login_form_status, "register: " + isRegisterForm);
  };

  const hideFormHandler = () => {
    // setRegisterform(false);
    dispatch(RegFormFalse());
    dispatch(LoginFormFalse());
  };

  const logoutHandler = async () => {
    try {
      const response = await logoutUser();

      dispatch(UnsetAccessToken());
      deleteToken();
      
    } catch (error) {
      console.log(error);
    }
  };
  {
    console.log("reg :", isRegisterForm, "login :", login_form_status);
  }

  if (isRegisterForm === false && login_form_status === false) {
    return (
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li tabIndex={0}></li>
              <li>
                <a>
                  {auth_status ? (
                    <Card>
                      <button onClick={logoutHandler}>logout</button>
                    </Card>
                  ) : (
                    <div>
                      <Card>
                        <button onClick={formHandler}>login</button>
                      </Card>
                    </div>
                  )}
                </a>
                <a>
                  {!auth_status && (
                    <Card>
                      <button onClick={() => dispatch(RegFormTrue())}>
                        register
                      </button>
                    </Card>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  if (isRegisterForm === true) {
    return <RegisterForm hideForm={hideFormHandler}></RegisterForm>;
  }

  if (login_form_status === true) {
    return <LoginForm hideForm={hideFormHandler}></LoginForm>;
  }
};

export default Navbar;
