import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user' // default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = signupInfo;

        if (!name || !email || !password || !role) {
            return handleError('All fields are required');
        }

        try {
            const url = `http://localhost:4000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message || 'Signup successful!');
                setTimeout(() => navigate('/login'), 1000);
            } else if (error?.details?.length) {
                handleError(error.details[0].message);
            } else {
                handleError(message || 'Signup failed');
            }

            console.log("Signup result:", result);
        } catch (err) {
            console.error("Signup error:", err);
            handleError("Something went wrong during signup");
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                        onChange={handleChange}
                        autoFocus
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='role'>Role</label>
                    <select
                        name='role'
                        value={signupInfo.role}
                        onChange={handleChange}
                    >
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <button type='submit'>Signup</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;



























// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: '',
//          role: ''
//     })

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password,role } = signupInfo;
//         if (!name || !email || !password || !role) {
//             return handleError('name, email and password are required')
//         }
//         try {
//             const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login')
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
//             <h1>Signup</h1>
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label htmlFor='name'>Name</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='name'
//                         autoFocus
//                         placeholder='Enter your name...'
//                         value={signupInfo.name}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={signupInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={signupInfo.password}
//                     />
//                     </div>
//                    <div>
//                     <label htmlFor='role'>Role</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='role'
//                         autoFocus
//                         placeholder='Enter your role...'
//                         value={signupInfo.role}
//                     />
//                 </div>
                
//                 <button type='submit'>Signup</button>
//                 <span>Already have an account ?
//                     <Link to="/login">Login</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Signup
