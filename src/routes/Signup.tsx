import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import { useAppDispatch } from "../app/hooks";
import { updateAppLoading } from "../features/ui/uiSlice";

import { signupUser, handleErrors } from "../services/user";
import { loginUser, Iuser } from "../features/users/usersSlice";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        dispatch(updateAppLoading(true));
        signupUser(name, email, password)
          .then(handleSuccess)
          .catch((e) => handleErrors(e, setFieldError));
      }}
    >
      <div className="flex flex-col w-screen max-w-xs h-fit mx-auto my-16 px-4 py-6 shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold pb-4">Sign up</h1>
        <Form>
          <FormField
            label="Name:"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Peter"
          />

          <FormField
            label="Email:"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="peter@email.com"
          />

          <FormField
            label="Password:"
            name="password"
            type="password"
            autoComplete="new-password"
          />

          <FormField
            label="Confirm Password:"
            name="passwordConfirmation"
            autoComplete="new-password"
            type="password"
          />

          <button
            className="w-full block px-3 py-1 border-emerald-700 border-2 rounded-lg mx-auto mt-4 text-lg shadow-md active:scale-95 hover:bg-emerald-700"
            type="submit"
          >
            Sign up
          </button>

          <Link
            className="block w-full px-3 py-1 text-center border-emerald-700 border-2 rounded-lg mx-auto mt-4 text-lg transition-transform active:scale-95 hover:bg-emerald-700"
            to="/signin"
          >
            Sign in
          </Link>
        </Form>
      </div>
    </Formik>
  );
};

export default Signup;
