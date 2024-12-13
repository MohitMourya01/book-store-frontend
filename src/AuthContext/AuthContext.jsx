// Context for the authentication 

import { createContext, useContext, useState, useEffect } from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebase/firebase.config.js'
const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider()
export const useAuth = () => {
    return useContext(AuthContext)
}

// AuthProvider

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // register a user
    const registerUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const signInWithGoogle = async () => {
        return signInWithPopup(auth, googleProvider)
    }

    // Logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)
            if(user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })
        return  () => unsubscribe()
    }, []);
    const  value = {
          currentUser,
          loading,
          registerUser,
          loginUser,
          signInWithGoogle,
          logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}