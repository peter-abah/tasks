import { AuthErrorCodes, AuthError } from "firebase/auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

type IsetError = (field: string, msg: string) => void;

export const handleErrors = (e: AuthError, setError: IsetError) => {
  switch (e.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      setError("email", "Email has been used");
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      setError("email", "Invalid email");
      break;
    case AuthErrorCodes.INVALID_PASSWORD:
      setError("password", "Password is incorrect");
      break;
    case AuthErrorCodes.USER_DELETED:
      setError("email", "Email not found");
      break;
    default:
      setError("password", e.code);
      break;
  }
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName: name });

  if (auth.currentUser?.displayName && auth.currentUser?.email) {
    return {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
    };
  } else {
    throw "invalid";
  }
};

export const signinUser = async (uEmail: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, uEmail, password);
  const { displayName, email, uid } = user;

  if (displayName && email && uid) {
    return { displayName, email, uid };
  } else {
    throw user;
  }
};
