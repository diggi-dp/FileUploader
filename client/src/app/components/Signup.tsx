"use client"
import React, { useState } from 'react';

const Signup = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    // const [submitted, setSubmitted] = useState(false);

    const handleUserNameFieldChange = (event: { target: { value: any; }; }) => {
        setValues({ ...values, username: event.target.value });
    };

    const handlePasswordFieldChange = (event: { target: { value: any; }; }) => {
        setValues({ ...values, password: event.target.value });
    };

    const handleConfirmPasswordFieldChange = (event: { target: { value: any; }; }) => {
        setValues({ ...values, confirmPassword: event.target.value });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    
        // Validate username, password, and confirm password
        let errorsCopy = { ...errors };
        if (!values.username) {
            errorsCopy = { ...errorsCopy, username: "Please enter a username" };
        } else {
            errorsCopy = { ...errorsCopy, username: "" };
        }
        if (!values.password) {
            errorsCopy = { ...errorsCopy, password: "Please enter a password" };
        } else {
            errorsCopy = { ...errorsCopy, password: "" };
        }
        if (!values.confirmPassword) {
            errorsCopy = { ...errorsCopy, confirmPassword: "Please confirm your password" };
        } else if (values.password !== values.confirmPassword) {
            errorsCopy = { ...errorsCopy, confirmPassword: "Passwords do not match" };
        } else {
            errorsCopy = { ...errorsCopy, confirmPassword: "" };
        }
    
        // Update the errors state
        setErrors(errorsCopy);
    
        // Your signup logic goes here
    };
    
    

    return (
        <div className="w-full sm:w-2/5">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-indigo-500">Signup</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={values.username}
                            onChange={handleUserNameFieldChange}
                        />
                        {errors.username && !values.username && (
                            <p className="text-red-500 text-xs italic">{errors.username}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handlePasswordFieldChange}
                        />
                        {errors.password && !values.password && (
                            <p className="text-red-500 text-xs italic">{errors.password}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
                            onChange={handleConfirmPasswordFieldChange}
                        />
                        {errors.confirmPassword && !values.confirmPassword && (
                            <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
