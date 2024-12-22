import React from 'react';
import Left from './home/left/left/left';
import Right from './home/left/right/right';
import Logout from './home/left/left1/Logout';
import Signup from '../Components/Signup';
import Signin from '../Components/Signin';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../src/context/Authprovider';
import Loading from '../Components/Loading';
const App = () => {
    const [authuser, setauthUser] = useAuth();
    return (
        <>
        
            <Routes>
                <Route path="/" element={
                    authuser ? (
                        <div className="flex h-screen">
                            <Logout />
                            <Left />
                            <Right />
                        </div>
                    ) : (
                        <Navigate to="/Signin" />
                    )
                } />



                <Route path="/Signin" element={authuser ? <Navigate to={"/"} /> : <Signin />} />
                <Route path="/Signup" element={authuser ? <Navigate to={"/"} /> : <Signup />} />
            </Routes>

        </>
    );
}
export default App;