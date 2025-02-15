import { useState } from "react";
import API_URL from "../config";
import { Link, useNavigate } from 'react-router-dom';

function Login()
{
    // User input states
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Token state
    const [token, setToken] = useState("");

    //Function that manage the login process
    const handleLogin = async (e) =>
    {
        // Prevent the default form submission behavior
        e.preventDefault();

        //Input Validations
        if(!username.trim())
        {
            setMessage("Username Required")
            return;
        }

        if(password.length < 6)
        {
            setMessage("Invalid password, need to have at least 6 characters")
            return;
        }

        

        try {
             // Send a POST request with the user input
            const response = await fetch(`${API_URL}/auth/Login`, 
            {
               // Set the request method and headers
                method: "POST",
                headers: { "Content-Type": "application/json" },

                // Send the user input as JSON
                body: JSON.stringify({username, password}),
            });

            // We convert the response to JSON format
            const data = await response.json();

            // If the response is successful, we set the token
            if(response.ok)
            {
                setToken(data.token);

                localStorage.setItem("token", data.token);

                navigate('/dashboard')

                setMessage("Login Successful")
            } else {
                setMessage("Invalid username or password");
            }


        } catch (error) {
            setMessage("Error connecting to the server")
        }
    };

    return (
        <div className="row p-4 mx-2 d-flex justify-content-center">
            <div className="col-12 col-md-6 " >
            <h2 className="card-title text-start fs-1 fw-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <label className="form-label fs-5 w-100">Username</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="custom-input form-control border-primary text-start "
                ></input>

                <label className="form-label fs-5 w-100 mt-3" >Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input form-control border-primary text-start "
                ></input>

                <div className="d-flex justify-content-start mt-3" >
                    <button type="submit" className=" custom-btn-home2v1 btn btn-primary rounded-pill fs-5 fw-bold py-1 px-4">Login</button>
                </div>
                <hr/>
            </form>
            {message && <p>{message}</p>}
            <p className="custom-p-login">
                Don't have an account? <Link to={"/register"} className="text-decoration-none">Sign up {">"} </Link>
            </p> 
            </div>
            
        </div>
    );

}

export default Login;