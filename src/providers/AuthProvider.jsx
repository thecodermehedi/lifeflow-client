import {createContext, useEffect, useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../config/firebase";

import {clearCookie, getToken} from "../api/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const createUser = (email, password) => {
    setIsUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setIsUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    setIsUserLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setIsUserLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    let updateObject = {};
    if (name) updateObject.displayName = name;
    if (photo) updateObject.photoURL = photo;
    return updateProfile(auth.currentUser, updateObject);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await getToken(currentUser?.email);
        console.log("CurrentUser-->", currentUser?.email);
      } else {
        await clearCookie();
        console.log("No user found");
      }
      setIsUserLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const values = {
    user,
    signIn,
    logOut,
    createUser,
    isUserLoading,
    resetPassword,
    updateUserProfile,
    setIsUserLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
