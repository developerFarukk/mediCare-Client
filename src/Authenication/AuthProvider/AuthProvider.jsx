import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import useAxiosPublic from "../../Hooks/Axiospablic/useAxiosPublic";


const auth = getAuth(app);
export const AuthContext = createContext(null);

// Social Auth Provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // Creat a New user with Password then Registation
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update User Profile
    const updateUserProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    //  Password and Email Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Login
    const googleLogIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // Logout section
    const logOut = () => {
        setLoading(false);
        return signOut(auth);
    }

    // UseState changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }

        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])


    const userInfo = {
        user,
        createUser,
        loading,
        signInUser,
        googleLogIn,
        updateUserProfile,
        logOut,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;