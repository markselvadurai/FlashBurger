import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import AuthContext from '../context/AuthContent'
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate();

    const { user } = useContext(AuthContext);
    // console.log('user: ', user);
    const { getLoggedIn } = useContext(AuthContext);

    async function logOut() {
        await axios.get("https://flashburgerapi.onrender.com/auth/signout");
        await getLoggedIn();
        history('/signin');
    }

    async function Delete(e) {
        e.preventDefault();

        try {
            await axios.delete(`https://flashburgerapi.onrender.com/api/users/${user._id}`);
            logOut();
        }
        catch (err) { console.log(err); }

    }

    async function Update(e) {

        e.preventDefault();
        // const config = {
        //     headers: { Authorization: `Bearer ${token}` }
        // };
        console.log(user);
        const body = {
            username: username,
            password: password
        }
        try { await axios.put(`https://flashburgerapi.onrender.com/api/users/${user._id}`, body); }
        catch (err) { console.log(err); }
    }

    return (
        <div className='container w-auto px-16 items-center justify-center flex flex-col'>
            {!user ? (
                <Spinner />
            ) : (

                <form className='border shadow-lg leading-loose text-left p-12 mt-12' onSubmit={Update}>
                    <div className='border shadow-lg p-4'>
                        <p className="font-semibold text-lg"> Username: {user.username}</p>
                        <label className="font-semibold text-lg">New Username</label>
                        <input className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" onChange={(e) => { setUsername(e.target.value) }} value={username} />
                    </div>
                    <br />
                    <div className='border shadow-lg p-4'>
                        <p className="font-semibold text-lg">New Password: </p>
                        <input className="flex items-center h-10 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    </div>
                    <br />
                    <p className="font-semibold text-lg">Created: {new Date().toLocaleDateString('en-us', user.created)}</p>
                    <br />
                    <div className='justify-between flex'>
                        <button className='bg-blue-300 px-2 rounded-sm'>Update Account</button>
                        <button to="/" type="button" className='bg-red-400 px-3 rounded-sm' onClick={Delete}>Delete Account</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Profile
