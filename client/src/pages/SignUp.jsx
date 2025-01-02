import React, { useState } from 'react';
import {  createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate,Navigate } from 'react-router-dom';
import Navbarlogin from '../components/Navbarlogin';


import { useAuth } from '.././Authcontext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { currentUser, loading } = useAuth();

  if (currentUser) {
    // Redirect them to the evaluator page, but save the current location they were trying to go to
    return <Navigate to="/evaluator" replace />;
  }
  
 
  const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            console.log("User created successfully");
            navigate("/login")
            return updateProfile(user, {
              displayName: name
            }).then(() => {
              console.log("Profile updated successfully!");
              console.log(user.displayName); // Now this should be 'John Doe'
            });
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            var errorMessage = error.message;
         
            console.log(errorCode, errorMessage);
            setError(errorCode);
            // ..
        });
 
   
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign in logic here
    console.log(email, password);
  };

  return (
    <div>
        <Navbarlogin currentPage="signup"/>
    <div className="min-h-90vh flex items-center justify-center bg-gray-100">
       
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Full name
              </div>
              <input
                id="name"
                name="name"
                type="name"
                
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Email
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
            <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Password
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          {error && 
                <div className="error-message flex justify-center">
                    <p>{error}</p>
                </div>
          }
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
