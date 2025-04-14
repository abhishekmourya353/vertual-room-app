
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            navigate('/login');
        } else {
            setLoggedInUser(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:4000/products", {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch products');

            const result = await response.json();
            setProducts(result);
            console.log(result);
        } catch (err) {
            handleError(err.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>

            <div style={{ marginTop: '20px' }}>
                <h2>Products</h2>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name} : ${item.price}</li>
                        </ul>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;














// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';

// function Home() {
//     const [loggedInUser, setLoggedInUser] = useState('');
//     const [products, setProducts] = useState('');
//     const navigate = useNavigate();
//     useEffect(() => {
//         setLoggedInUser(localStorage.getItem('loggedInUser'))
//     }, [])

//     const handleLogout = (e) => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('loggedInUser');
//         handleSuccess('User Loggedout');
//         setTimeout(() => {
//             navigate('/login');
//         }, 1000)
//     }

//     const fetchProducts = async () => {
//         try {
//             const url = "http://localhost:4000/products";
//             const headers = {
//                 headers: {
//                     'Authorization': localStorage.getItem('token')
//                 }
//             }
//             const response = await fetch(url, headers);
//             const result = await response.json();
//             console.log(result);
//             setProducts(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }
//     useEffect(() => {
//         fetchProducts()
//     }, [])

//     return (
//         <div>
//             <h1>Welcome {loggedInUser}</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <div>
//                 {
//                     products && products?.map((item, index) => (
//                         <ul key={index}>
//                             <span>{item.name} : {item.price}</span>
//                         </ul>
//                     ))
//                 }
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Home
