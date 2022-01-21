import { AuthErrorCodes, AuthError } from 'firebase/auth';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type IsetError = (field: string, msg: string) => void;

export const handleErrors = (e: AuthError, setError: IsetError) => {
  switch (e.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      setError('email', 'Email has been used');
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      setError('email', 'Invalid email');
      break;
    case AuthErrorCodes.INVALID_PASSWORD:
      setError('password', 'Password is incorrect');
      break;
    default:
      setError('password', 'Unknown error');
      break;
  }
}

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
    debugger;
    throw 'Invalid';
  }
};
