import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { useAuth } from '../src/context/Authprovider';
import { Link } from 'react-router-dom';
const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [authuser, setauthUser] = useAuth();
    const onSubmit = (data) => {
        const userinfo = {
           
            email: data.Email,
            password: data.password,
            
        };
        console.log(userinfo);
        axios.post('http://localhost:3002/api/user/signin', userinfo)
            .then((res) => {
                console.log(res.data);
                if(res.data){
                    alert("logged in successfully");
                }
                localStorage.setItem('messenger', JSON.stringify(res.data));
                setauthUser(res.data);
            }
            ).catch((err) => {
                if(err.response){
                    alert(err.response.data.message);
                }
            });
    };
   

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            {/* Container */}
            <div className="flex flex-col items-center space-y-4">
                {/* Main Signin Card */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-80">
                    <h1 className="text-3xl font-bold text-center mb-3 font-serif">Picturegram</h1>
                    <p className="text-gray-500 text-center mb-4 text-sm">
                        Log in to see photos and videos from your friends.
                    </p>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-sm text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Email Input */}
                        <div>
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register("Email", { required: "Email is required" })}
                            />
                            {errors.Email && (
                                <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-all"
                        >
                            Log In
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <div className="text-center mt-4">
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-semibold hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>
                </div>

                {/* Signup Prompt */}
                <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md w-80 text-center">
                    <p>
                         have an account?{" "}
                        <Link to={"/Signup"}href="#" className="text-blue-500 font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
