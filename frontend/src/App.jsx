import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Signout from './components/Signout';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import axios from 'axios';
import AuthContext, { AuthContextProvider } from './context/AuthContent';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
  const { loggedIn } = React.useContext(AuthContext);

  return (
    <>
      {/* <div className='container h-screen w-screen'> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Users />} />
          {loggedIn === false && (
            <>
              {/* <Route path="/" element={<Users />} /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </>
          )}
          {loggedIn === true && (
            <>
              {/* <Route path="/" element={<Users />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/signout" element={<Signout />} />
            </>
          )}
        </Routes>
      {/* </div> */}
    </>
  );
}