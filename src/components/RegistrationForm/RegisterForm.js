import React, { useState } from "react";
import Card from "../UI/Card";
import { useRegisterMutation } from "../../services/expenseApi";
import { LoginFormTrue, RegFormFalse } from "../../Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { RegisterSchema } from "../../schemas/registration";

const RegisterForm = (props) => {
  const [registerUser] = useRegisterMutation();
  const [serverError, setServerError] = useState({});
  const dispatch = useDispatch();

  const { values, errors, touched, handleblur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },

      validationSchema: RegisterSchema,

      onSubmit: async (values, action) => {
        const data = new FormData();
        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password1", values.password1);
        data.append("password2", values.password2);

        const actual_data = {
          username: data.get("username"),
          email: data.get("email"),
          password1: data.get("password1"),
          password2: data.get("password2"),
        };

        try {
          const response = await registerUser(actual_data).unwrap();
          console.log(response);

          dispatch(LoginFormTrue());
          dispatch(RegFormFalse());
        } catch (error) {
          setServerError(error);
          console.log(error)
        }
      },
    });

  
  return (
    <div>
      <Card className="mt-1 mb-2 w-1/3 sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4 bg-slate-900 mx-auto">
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col mx-10 py-1 ">
            <label className="my-1 text-white font-sans font-bold-400">
              Username
            </label>
            <input
              type="text"
              className="rounded-md py-1"
              placeholder="Enter username"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleblur}
            />
            {errors.username || touched.username ? (
              <p className="text-red-900"> {errors.username} </p>
            ) : null}
            {serverError.status ? <p>{serverError.data.username[0]}</p> : ""}
          </div>
          <div className="flex flex-col mx-10 py-1">
            <label className="my-1 text-white font-sans font-bold-400">
              Email
            </label>
            <input
              type="email"
              className="rounded-md py-1"
              placeholder="Enter email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleblur}
            />
            {errors.email || touched.email ? (
              <p className="text-red-900"> {errors.email} </p>
            ) : null}

            {serverError.status ? <p>{serverError.data.email[0]}</p> : ""}
          </div>
          <div className="flex flex-col mx-10 py-1">
            <label className="my-1 text-white font-sans font-bold-400">
              Password
            </label>
            <input
              type="password"
              className="rounded-md py-1"
              placeholder="Enter password"
              id="password1"
              name="password1"
              value={values.password1}
              onChange={handleChange}
              onBlur={handleblur}
            />
            {errors.password1 || touched.password1 ? (
              <p className="text-red-900"> {errors.password1} </p>
            ) : null}

            {serverError.status ? <p>{serverError.data.password1[0]}</p> : ""}
          </div>
          <div className="flex flex-col mx-10 py-1">
            <label className="my-1 text-white font-sans font-bold-400">
              Confirm Password
            </label>
            <input
              type="password"
              className="rounded-md py-1"
              placeholder="Confirm password"
              id="password2"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleblur}
            />
            {errors.password2 || touched.password2 ? (
              <p className="text-red-900"> {errors.password2} </p>
            ) : null}

            {serverError.status ? <p>{serverError.data.password2[0]}</p> : ""}
          </div>
          
          <button
            className="mb-2 mt-2 bg-slate-600 mx-10 rounded-md text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
