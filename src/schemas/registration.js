import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const RegisterSchema = yup.object().shape({
  username: yup.string("please enter valid username").min(4).max(10).required(),
  email: yup.string().email("please enter a valid email address").required(),
  password1: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" }),
  password2: yup.string().oneOf([yup.ref("password1"), null], 'Password must match'),
});
