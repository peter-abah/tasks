import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
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
    navigate("/");
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
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
      })}
      onSubmit={({ name, email, password }, { setFieldError }) => {
        signupUser(name, email, password)
          .then(handleSuccess)
          .catch((e) => handleErrors(e, setFieldError));
      }}
    >
      <div className="flex flex-col w-screen max-w-xs mx-auto my-16 p-4 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold pb-4">Sign up</h1>
        <Form>
          <FormField
            label="Name:"
            name="name"
            type="text"
            placeholder="Peter"
          />

          <FormField
            label="Email:"
            name="email"
            type="email"
            placeholder="peter@email.com"
          />

          <FormField label="Password:" name="password" type="password" />

          <FormField
            label="Confirm Password:"
            name="passwordConfirmation"
            type="password"
          />

          <button className="block px-3 py-1 bg-emerald-700 rounded-lg mx-auto mt-4 text-lg shadow-md" type="submit">Sign up</button>
        </Form>
      </div>
    </Formik>
  );
};

export default Signup;
