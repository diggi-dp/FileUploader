"use client"
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { redirect } from 'next/navigation';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
          redirect('/dashboard')
        }
    }, [])

    return (
        <>
            {!isLogin ? <Login /> : <Signup />}
            <p className="mt-4 text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <span
                    className="ml-2 text-indigo-600 cursor-pointer"
                    onClick={toggleForm}
                >
                    {!isLogin ? "Sign up" : "Login"}
                </span>
            </p>
        </>
    )
};

export default AuthPage;
