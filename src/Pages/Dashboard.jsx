import { useEffect, useState } from "react";
import UserMap from "../Components/UserMap";
import API_URL from "../config";
import { Link, useNavigate } from 'react-router-dom';



function Dashboard() {
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);  // Lista de todos los users
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //Once token is removed , redirect to login page
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

  //  Obtener la ubicación del usuario al entrar
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location", error)
    );
  }, []);

  //  Actualizar la ubicación en `setLocation` cada 30s
  useEffect(() => {
    if (!navigator.geolocation) return;

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error updating location", error)
      );
    };

    const interval = setInterval(updateLocation, 30000); // Cada 30s
    return () => clearInterval(interval);
  }, []);

  //  Enviar la ubicación al backend (cuando entra y cada 30s)
  useEffect(() => {
    if (!token || !location) return;

    const sendLocation = async () => {
      try {
        await fetch(`${API_URL}/location/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(location),
        });
      } catch (error) {
        console.error("Error sending location:", error);
      }
    };

    sendLocation(); // Enviar al abrir `Dashboard`
    const interval = setInterval(sendLocation, 30000); // Luego cada 30s
    return () => clearInterval(interval);
  }, [location, token]); // Se ejecuta cuando cambia `location`

  //  Obtener la lista de todos los usuarios cuando entra a `Dashboard`
  useEffect(() => {
    if (!token) return;

    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_URL}/location/All`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations(); // Obtener datos al abrir `Dashboard`
  }, [token]);

  //  Actualizar la lista de ubicaciones de todos los usuarios cada 30s
  useEffect(() => {
    if (!token) return;

    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_URL}/location/All`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const interval = setInterval(fetchLocations, 30000); // Cada 30s
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div>
        <div className="row mx-2">
        <div className="col-md-9 col-sm-12 mb-1">
            <UserMap locations ={locations} />
        </div>
        <div className="card shadow-lg col-md-3 col-sm-12 mb-1">
            <div className="card-body">
                <h5 className="card-title fs-3fw-bold text-center">Friends</h5>
                <input className="form-control" type="text" placeholder="Search for friends" />
                <hr/>
            </div>
        </div>
        </div>
        <div className="row mx-2 d-flex justify-content-center ">
            <button className="custome-btn-logout col-md-2 fw-bold fs-2 rounded-pill py-2 col-sm-6 mt-4" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>

  );

}
export default Dashboard;


     