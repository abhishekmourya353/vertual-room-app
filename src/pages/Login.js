import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password, role } = loginInfo;

        if (!email || !password || !role) {
            return handleError('Email, password, and role are required');
        }

        try {
            const response = await fetch(`http://localhost:4000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error?.details?.length) {
                handleError(error.details[0].message);
            } else {
                handleError(message);
            }

            console.log("Frontend login result:", result);
        } catch (err) {
            handleError("Network or server error");
            console.error("Login error:", err);
        }
    };

    console.log("Frontend loginInfo:", loginInfo); // ✅ moved here

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='role'>Role</label>
                    <input
                        type='text'
                        name='role'
                        placeholder='Enter your role...'
                        value={loginInfo.role}
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Login</button>
                <span>
                    Don't have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;





// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Login() {

//     const [loginInfo, setLoginInfo] = useState({
//         email: '',
//         password: '',
//         role:''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copyLoginInfo = { ...loginInfo };
//         copyLoginInfo[name] = value;
//         setLoginInfo(copyLoginInfo);
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { email, password,role } = loginInfo;
//         if (!email || !password || !role) {
//             return handleError('email , password ,role are required')
//         }
//         try {
//             const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();
//             const { success, message, jwtToken, name, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 localStorage.setItem('token', jwtToken);
//                 localStorage.setItem('loggedInUser', name);
//                 setTimeout(() => {
//                     navigate('/home')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }

//     return (
//         <div className='container'>
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={loginInfo.email}
//                     />
//                 </div>


//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={loginInfo.password}
//                     />
//                 </div>

//                 <div>
//                    <label htmlFor='role'>Role</label>
//                     <input
//                    onChange={handleChange}
//                     type='text'
//                      name='role'
//                      placeholder='Enter your role...'
//                       value={loginInfo.role}
//                      />
//                      </div>
//                 <button type='submit'>Login</button>
//                 <span>Does't have an account ?
//                     <Link to="/signup">Signup</Link>
//                 </span>
               
//             </form>
//             console.log("Frontend loginInfo:", loginInfo);
//             <ToastContainer />
//         </div>
//     )
// }

// //console.log(Login);

// export default Login
