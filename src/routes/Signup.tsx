import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import * as Yup from "yup";

import { signupUser, handleErrors } from "../services/user";
import { loginUser, Iuser } from "../features/users/usersSlice";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSuccess = (user: Iuser) => {
    dispatch(loginUser(user));
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string()
        .matches(emailRegex, "Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 characters minimum"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: ({ name, email, password }, { setFieldError }) => {
      signupUser(name, email, password)
        .then(handleSuccess)
        .catch((e) => handleErrors(e, setFieldError));
    },
  });

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p>{formik.errors.name}</p>
          ) : null}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation ? (
            <p>{formik.errors.passwordConfirmation}</p>
          ) : null}
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
