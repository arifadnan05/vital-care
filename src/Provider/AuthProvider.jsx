import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import auth from '../firebase/firebase.config'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // sing in with google

    const googleProvider = new GoogleAuthProvider();
    const googleSingIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Register email and password

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sing in with Github
    const githubProvider = new GithubAuthProvider();
    const githubSingIn = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // Update user name and photo 

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    // login user
    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout function

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const authInfo = {
        user,
        loading,
        googleSingIn,
        createUser,
        githubSingIn,
        updateUserProfile,
        logInUser,
        logOut

    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
                
            </AuthContext.Provider>
        </div>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.object
}
export default AuthProvider