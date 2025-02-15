import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom it let us change the url without reloading the page

// Navbar with LINKS to the different pages
function NavBar()
{   
    const [haveToken, setHaveToken] = useState(false);

    useEffect( () => {
        const token = localStorage.getItem("token");
        setHaveToken(!!token);
    }, []);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setHaveToken(false);
        navigate('/');
        window.location.reload();
    };


            return (
                <div className='mx-3 mt-2 mb-5 d-flex justify-content-between'>  
                    <h1 className='mt-3 fs-1 fw-bold' >SpotMe</h1>    
                </div>

            );
}
    

export default NavBar;  //exporting the component