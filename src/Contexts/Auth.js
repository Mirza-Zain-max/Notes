import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { auth, fireStore } from 'Config/fireBase'; // Correct import path
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { message } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import Screenloader from 'Components/ScreenLoader/ScreenLoader';

const AuthContext = createContext({
    isAuth: false, user: {},
    isAppLoading: true,
    dispatch: () => { },
    handleLogout: () => {
        message.success('Logout failed');
    },
});

const initialState = { isAuth: false, user: {} };

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useState(initialState);
    const [isAppLoading, setIsAppLoading] = useState(true);

    const readProfile = useCallback(async (user) => {
        try {
            const docSnap = await getDoc(doc(fireStore, "users", user.uid));
            if (docSnap.exists()) {
                const user = docSnap.data();
                console.log('firestore user', user);
                dispatch(s => ({ ...s, isAuth: true, user }));
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setIsAppLoading(false);
        }
    }, []);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user data', user);
                readProfile(user);
            } else {
                setIsAppLoading(false);
            }
        });
        return () => unsubscribe();
    }, [readProfile]);

    const handleLogout = () => {
        dispatch({ isAuth: false, user: {} });
        signOut(auth)
            .then(() => {
                message.success('Logout successful');
                localStorage.removeItem('user-login');
                localStorage.removeItem('user-uid');
            })
            .catch(() => {
                message.error('Something went wrong while logging out');
            });
    };

    return (
        <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
            {isAppLoading ? <Screenloader /> : children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
