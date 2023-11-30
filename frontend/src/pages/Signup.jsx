import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    async function login(e) {
        e.preventDefault();

        try {
            const registerData = {
                username,
                email,
                password
            };

            await axios.post("http://localhost:3000/api/users", registerData);

        } catch(err) {
            console.log(err);
        }
    }

  return (
    <div className="page-height flex flex-col items-center justify-center w-screen bg-gray-200 text-gray-700 bottom-0">
        <h1 className="font-bold text-2xl">Sign up</h1>
	    <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={login}>

	    	<label className="font-semibold text-xs">Username</label>
	    	<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>

            <label className="font-semibold text-xs">Email</label>
	    	<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>

	    	<label className="font-semibold text-xs mt-3">Password</label>
	    	<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

	    	<button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
            
	    </form>
    </div>
  );
}

export default Signup