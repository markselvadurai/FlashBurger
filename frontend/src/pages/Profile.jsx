import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AuthContext from '../context/AuthContent'
import Spinner from '../components/Spinner';

const Profile = () => {

    const { user } = useContext(AuthContext);
    console.log('user: ', user);


    return (
        <div>
            {!user ? (
                <Spinner />
            ) : (
                <p>
                    Username: {user.username}
                    <br/>
                    Email: {user.email}
                    <br/>
                    Created: {user.created}
                </p>
            )}
        </div>
    )
}

export default Profile
