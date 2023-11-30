import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Signout from './Signout'
import AuthContext from '../context/AuthContent';
import axios from 'axios';

const Navbar = () => {
    const { getLoggedIn, loggedIn, user } = useContext(AuthContext);

    console.log(user);


    return (
        <div className='bg-slate-600 sticky top-0 z-[20] mx-auto flex w-full items-center justify-between border-2 shadow-lg border-slate-950 p-8'>
            <div className=''>
                <div className='flex align-baseline space-x-20'>
                    <NavLink to="/" className='font-medium text-lg align-baseline mr-10'>FlashBurger</NavLink>
                    {loggedIn === false && (
                        <>
                            <NavLink to="/signup" className='font-medium text-md'>Sign up</NavLink>
                            <NavLink to="/signin" className='font-medium text-md'>Sign in</NavLink>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <NavLink to="/" className='font-medium text-md'>Users</NavLink>
                            <NavLink to="/profile" className='font-medium text-md'>My Profile</NavLink>
                            <Signout />
                            {user ? (
                                <p>Hello, {user.username}</p>
                            ) : (
                                <p>Hello, Guest</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar