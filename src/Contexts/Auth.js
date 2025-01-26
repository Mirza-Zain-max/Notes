// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { auth, fireStore } from '/Config/firebase';
// import { auth, fireStore } from 'Config/fireBase';
// // import Screenloader from 'Pages/Frontend/Screenloader';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { message } from 'antd';
// import { doc, getDoc } from 'firebase/firestore';
// import Screenloader from 'Components/ScreenLoader/ScreenLoader';

// const AuthContext = createContext({
//     isAuth: false, user: {},
//     isAppLoading: true,
//     dispatch: () => { },
//     handleLogout: () => {
//         message.success('Logout failed');
//     },
// });

// const initialState = { isAuth: false, user: {} };

// const AuthProvider = ({ children }) => {

//     // const userId = localStorage.getItem('user-uid');
//     const [state, dispatch] = useState(initialState);
//     const [isAppLoading, setIsAppLoading] = useState(true);

//     const readProfile = useCallback(async (user) => {

//         const docSnap = await getDoc(doc(fireStore, "users", user.uid));

//         if (docSnap.exists()) {
//             const user = docSnap.data()
//             console.log(' firestore user', user)
//             dispatch(s => ({ ...s, isAuth: true, user }));

//         } else {
//             // docSnap.data() will be undefined in this case
//         }
//         setIsAppLoading(false);
//     }, []);

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log('user data', user)
//                 // dispatch(s => ({ ...s, isAuth: true, user }));
//                 readProfile(user);
//                 // console.log('User logged in:', user);
//             } else {
//                 // dispatch(s => ({ ...s, isAuth: false, user: {} }));
//                 setIsAppLoading(false);
//             }
//         });
//     }, [readProfile]);
//     const handleLogout = () => {
//         dispatch({ isAuth: false, user: {} });
//         signOut(auth)
//             .then(() => {
//                 message.success('Logout successful');
//                 localStorage.removeItem('user-login');
//                 localStorage.removeItem('user-uid');
//             })
//             .catch(() => {
//                 message.error('Something went wrong while logging out');
//             });
//     };

//     return (
//         <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
//             {isAppLoading ? <Screenloader /> : children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => useContext(AuthContext);

// export default AuthProvider;

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

// import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, fireStore } from 'Config/fireBase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { message } from 'antd';
// import { doc, getDoc } from 'firebase/firestore';
// import Screenloader from 'Components/ScreenLoader/ScreenLoader';

// const AuthContext = createContext({
//     isAuth: false, user: {},
//     isAppLoading: true,
//     dispatch: () => { },
//     handleLogout: () => {
//         message.success('Logout failed');
//     },
// });

// const initialState = { isAuth: false, user: {} };

// const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const [state, dispatch] = useState(initialState);
//     const [isAppLoading, setIsAppLoading] = useState(true);

//     const readProfile = useCallback(async (user) => {
//         try {
//             const docSnap = await getDoc(doc(fireStore, "users", user.uid));
//             if (docSnap.exists()) {
//                 const user = docSnap.data();
//                 console.log('firestore user', user);
//                 dispatch(s => ({ ...s, isAuth: true, user }));
//                 navigate('/'); // Navigate to home page upon successful login
//             } else {
//                 console.log('No such document!');
//             }
//         } catch (error) {
//             if (error.code === 'unavailable') {
//                 message.error('Network issue: Failed to get document because the client is offline.');
//             } else {
//                 message.error('Error fetching user profile: ' + error.message);
//             }
//         } finally {
//             setIsAppLoading(false);
//         }
//     }, [navigate]);

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log('user data', user);
//                 readProfile(user);
//             } else {
//                 setIsAppLoading(false);
//             }
//         });
//     }, [readProfile]);

//     const handleLogout = () => {
//         dispatch({ isAuth: false, user: {} });
//         signOut(auth)
//             .then(() => {
//                 message.success('Logout successful');
//                 localStorage.removeItem('user-login');
//                 localStorage.removeItem('user-uid');
//                 navigate('/auth/login'); // Navigate to login page upon logout
//             })
//             .catch(() => {
//                 message.error('Something went wrong while logging out');
//             });
//     };

//     return (
//         <AuthContext.Provider value={{ ...state, isAppLoading, dispatch, handleLogout }}>
//             {isAppLoading ? <Screenloader /> : children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => useContext(AuthContext);

// export default AuthProvider;

// import { auth } from 'Config/fireBase';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { auth } from 'Confi'; // Ensure this path is correct

// const AuthContext = createContext();

// export const useAuthContext = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from 'Config/fireBase'; // Ensure this path is correct

// const AuthContext = createContext();

// export const useAuthContext = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;