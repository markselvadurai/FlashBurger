import axios from 'axios'
import React from 'react'
import { useState, useContext } from 'react'
import AuthContext from '../context/AuthContent';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const history = useNavigate();
    const {setUser} = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    async function login(e) {
        e.preventDefault();

        try {
            const registerData = {
                username,
                password
            };

            const response = await axios.post("http://localhost:3000/auth/signin", registerData);
            console.log(response);
            setUser(response.data.user);

            await getLoggedIn();
            history('/');

        } catch(err) {
            console.log(err);
        }
    }

  return (

    <div className="page-height flex flex-col items-center justify-center w-auto bg-gray-200 text-gray-700">
        <h1 className="font-bold text-2xl">Sign in</h1>
	    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={login}>

	    	<label className="font-semibold text-xs">Username</label>
	    	<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>

	    	<label className="font-semibold text-xs mt-3">Password</label>
	    	<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

	    	<button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
            
	    </form>
    </div>
  );
}

export default Signin