import { useState } from "react"; //import useState to manage the states, this is a hook in react
import API_URL from "../config";
import { Link, useNavigate } from 'react-router-dom';


function Register()
{
    //useState to manage the <form> data
    const [username, setUsername] = useState(""); //username state
    const [password, setPassword] = useState(""); //password state
    const [message, setMessage] = useState(""); //message state to show success or error messages

    //function to manage the form of the user
    const handleRegister = async (e) => {
        e.preventDefault(); //prevent the page to reload 

        // FRONTEND Validation
        if(!username.trim())
        {
            setMessage("Username Required")
            return;
        }
        
        if(password.length < 6)
        {
            setMessage("Password need to have at least 6 characters")
            return;
        }
    
    try{
        // We send the request to the backend with the User data
    const response = await fetch(`${API_URL}/auth/Register`, {

        //we use the POST method to send the data
        method: "POST", 

        //we specify the type of data we are sending
        headers: {
            "Content-Type": "application/json" 
        },

        //we send the data in JSON format that is going to be recieved by the API than can be used to create a new user in the database
        body: JSON.stringify({username, password}), 
    });

    //we get the data from the response and convert it to JSON format
    const data = await response.json(); 

    if (response.ok)
    {
        //if the response is ok, we show a success message
        setMessage("User created successfully");
    } else {
        //if the response is not ok, we show an error message
        setMessage(data.message || "Error creating user");
    }
    } catch (error){
        setMessage(data.message || "Error connecting to the server") //Conexion error message
    }
    
}

return (
    <div className="row p-4 mx-2 d-flex justify-content-center">
        <div className="col-12 col-md-6 " >
            <h2 className="card-title text-start fs-1 fw-bold mb-4">Create your account</h2>
            <form onSubmit={handleRegister}> 
                <label className="form-label fs-5 w-100">Username</label>
                <input
                    type="text"
                    value={username} //Value vinculated with the username state
                    onChange={(e) => setUsername(e.target.value)} //onChange event to update the username state
                    placeholder="Create a username"
                    className="custom-input form-control border-primary text-start "
                ></input>

                <label className="form-label fs-5 w-100 mt-3">Password</label>
                <input
                    type="password"
                    value={password} //Value vinculated with the password state
                    onChange={(e) => setPassword(e.target.value)} //onChange event to update the password state
                    placeholder="Create a password"
                    className="custom-input form-control border-primary text-start "
                ></input>

                <div className="d-flex justify-content-start mt-3" >
                    <button type="submit" className=" custom-btn-home2v1 btn btn-primary rounded-pill fs-5 fw-bold py-1 px-4">Create Account</button>
                </div>
                <hr/> {/* Button to submit the form */}
            </form>
            {message && <p>{message}</p>} {/* Message to show the result of the register */} 
            <p className="custom-p-login">
                Already have an account? <Link to={"/login"} className="text-decoration-none">Log in {">"} </Link>
            </p> 
        </div>
            
    </div>
)

}

export default Register;

