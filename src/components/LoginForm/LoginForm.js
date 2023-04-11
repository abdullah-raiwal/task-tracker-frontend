import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useLoginMutation } from "../../services/expenseApi";
import { storeToken, getToken } from "../../services/setJWTKeys";
import {
  login,
  LoginFormFalse,
  setAccessToken,
} from "../../Reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../schemas/login";
import { useFormik } from "formik";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const [loginUser] = useLoginMutation();
  const [serverError, setServerError] = useState({});

  const { values, errors, touched, handleblur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        const data = new FormData();
        data.append("username", values.username);
        data.append("password", values.password);

        const actual_data = {
          username: data.get("username"),
          password: data.get("password"),
        };
        try {
          const response = await loginUser(actual_data).unwrap();
          const token = {
            access: response.access_token,
            refresh: response.refresh_token,
            user_id: response.user_id,
          };
          console.log("in login", token)
          storeToken(token);
          dispatch(setAccessToken({ access: token.access }));
          dispatch(LoginFormFalse());
        } catch (error) {
          console.log(error);
          setServerError(error);
        }
      },
    });

  return (
    <div>
      <Card className="mt-1 mb-2 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 bg-slate-900 mx-auto">
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col mx-10 py-1">
            <label className="my-1 text-white font-sans font-bold-400">
              Username
            </label>
            <input
              type="text"
              className="rounded-md py-1"
              placeholder="Enter username"
              name="username"
              id="username"
              onChange={handleChange}
              onBlur={handleblur}
            />
            {serverError.status ? (
              <p>{serverError.data.non_field_errors}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col mx-10 py-1">
            <label className="my-1 text-white font-sans font-bold-400">
              Password
            </label>
            <input
              type="password"
              className="rounded-md py-1"
              placeholder="Enter password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleblur}
            />
            {serverError.status ? (
              <p>{serverError.data.non_field_errors}</p>
            ) : (
              ""
            )}
          </div>
          <button
            // onClick={props.hideForm}
            className="mb-2 mt-2 bg-slate-600 mx-10 rounded-md text-white"
            onClick={props.hideForm}
          >
            Cancel
          </button>
          <button
            className="mb-2 mt-2 bg-slate-600 mx-10 rounded-md text-white"
            type="submit"
          >
            Log In
          </button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
