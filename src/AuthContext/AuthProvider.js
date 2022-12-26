import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
import { getAuth,createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,onAuthStateChanged,signOut,GoogleAuthProvider } from 'firebase/auth';
const auth = getAuth(app);
export const AuthContext = createContext(app);
const googleAuth=new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const loginUser=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut=()=>{
        setLoading(true);
        signOut(auth);
    }
    const signInWithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleAuth);
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return ()=>unsubscribe();
    },[])
    const authInfo = {
           createUser,loginUser,user,logOut,signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;