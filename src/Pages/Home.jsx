import { Link, useNavigate } from 'react-router-dom';

function Home()
{
    return(
        <div className="mx-3 mt-5">
            <br/> <br/>
            <h1 className="text-center mb-1">Capture the Moment.</h1>
            <h1 className="text-center mb-4">Share the Journey.</h1>
            <p className="text-center mb-1"> Share your location, meet up with friends,</p>
            <p className="text-center"> and discover new places-together</p>
            
            <div className='d-flex justify-content-center'>
                <Link to="/register" className=" custom-btn-home2 text-decoration-none btn btn-primary text-center rounded-pill fs-5 mt-3 px-4 py-2  ">Get started for free</Link>
            </div>
                
            <div className='d-flex justify-content-center' >
                <Link to="/login" className="custom-btn-home text-decoration-none btn btn-primary text-center rounded-pill fs-5 mt-4 px-5 py-2  ">Login</Link>
            </div>
                
        </div>
    )
}
export default Home;