import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import { useAppDispatch } from "../app/hooks";
import * as Yup from "yup";

import { signinUser, handleErrors } from "../services/user";
import { loginUser, Iuser } from "../features/users/usersSlice";
import { updateAppLoading } from "../features/ui/uiSlice";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSuccess = (user: Iuser) => {
    dispatch(loginUser(user));
    navigate("/");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .matches(emailRegex, "Invalid email address")
          .required("Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Password is too short - should be 8 characters minimum"),
      })}
      onSubmit={({ email, password }, { setFieldError }) => {
        dispatch(updateAppLoading(true));
        signinUser(email, password)
          .then(handleSuccess)
          .catch((e) => handleErrors(e, setFieldError));
      }}
    >
      <div className="flex flex-col w-screen max-w-xs mx-auto my-16 px-4 py-8 shadow-lg rounded-xl h-fit">
        <h1 className="text-2xl font-bold pb-4">Sign in</h1>
        <Form>
          <FormField
            label="Email:"
            name="email"
            type="email"
            placeholder="peter@email.com"
          />

          <FormField label="Password:" name="password" type="password" />

          <button
            className="block w-full px-3 py-1 mb-3 border-emerald-700 border-2 rounded-lg mx-auto mt-4 text-lg transition-transform active:scale-95 hover:bg-emerald-700"
            type="submit"
          >
            Sign in
          </button>
          <Link
            className="block w-full px-3 py-1 text-center border-emerald-700 border-2 rounded-lg mx-auto mt-4 text-lg transition-transform active:scale-95 hover:bg-emerald-700"
            to="/signup"
          >
            Sign up
          </Link>
        </Form>
      </div>
    </Formik>
  );
};

export default Signin;
