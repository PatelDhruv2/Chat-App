import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../src/context/Authprovider';

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [authuser, setauthUser] = useAuth();
    const password = watch("password");

    const validateConfirmPassword = (value) => {
        return value === password || "Passwords do not match";
    };

    const onSubmit = async (data) => {
        const userinfo = {
            name: data.name,
            email: data.Email,
            password: data.password,
            confirmpassword: data.confirmpassword
        };
        await axios.post('http://localhost:3002/api/user/signup', userinfo)
            .then((res) => {
                console.log(res.data);
                if(res.data){
                    alert("User created successfully");
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
                {/* Main Signup Card */}
                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-80">
                    <h1 className="text-3xl font-bold text-center mb-3 font-serif">Picturegram</h1>
                    <p className="text-gray-500 text-center mb-4 text-sm">
                        Sign up to chat with your friends.
                    </p>

                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
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

                        {/* Full Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Password */}
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

                        {/* Confirm Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register("confirmpassword", {
                                    required: "Confirm Password is required",
                                    validate: validateConfirmPassword
                                })}
                            />
                            {errors.confirmpassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</p>
                            )}
                        </div>

                        {/* Styled Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
                        >
                            Sign up
                        </button>
                    </form>
                </div>

                {/* Already have an account */}
                <div className="border border-gray-300 p-4 rounded-lg shadow-md w-80 text-center bg-white">
                    <p>
                        Have an account?{" "}
                        <Link to={"/Signin"}className="ml-1 underline text-blue-500 font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
