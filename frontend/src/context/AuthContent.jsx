import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState();
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    async function getLoggedIn() {
        const loggedInRes = await axios.get("https://flashburgerapi.onrender.com/loggedIn/");
        setLoggedIn(loggedInRes.data.val);
        
        console.log('loggedIn function: ',loggedInRes);
        const newuser = await axios.get(`https://flashburgerapi.onrender.com/api/users/${loggedInRes.data.user._id._id}`);
        setUser(newuser.data);
        console.log('loggedIn user: ',user);
        console.log('loggedIn: ',loggedIn);
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return <AuthContext.Provider value={{ loggedIn, getLoggedIn, user, setUser, setToken, token }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export {AuthContextProvider};