import { AuthErrorCodes, AuthError } from "firebase/auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { updateProject } from './projects';

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

const addDefaultData = async (uid: string) => {
  const project = {title: 'Default', id: 'default'};
  await updateProject(uid, project);
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
  await Promise.all([
    updateProfile(userCredential.user, { displayName: name }),
    addDefaultData(userCredential.user.uid),
  ]);

  if (
    auth.currentUser?.displayName &&
    auth.currentUser?.email &&
    auth.currentUser.uid
  ) {
    return {
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
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
