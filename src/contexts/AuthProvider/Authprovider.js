import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/config.firebase'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import toast from 'react-hot-toast';


const auth = getAuth(app)
export const AuthContext = createContext();

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signInWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  const verify = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
  }

  const resetPass = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem('Aero-Token')
        toast.success('Log-out successful');
      }).catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe();
  }, [])




  const authInfo = {
    user,
    createUser,
    signInWithEmail,
    updateUserProfile,
    verify,
    resetPass,
    logOut,
    setLoading
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Authprovider;