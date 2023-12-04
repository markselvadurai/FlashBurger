import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signout() {
    const history = useNavigate();
    const {getLoggedIn} = useContext(AuthContext);

    async function logOut() {
        await axios.get("http://localhost:3000/auth/signout");
        await getLoggedIn();
        history('/signin');
    }

    return (
        <a href='' onClick={logOut} className="font-medium text-md">
            Log out
        </a>
    )
}

export default Signout