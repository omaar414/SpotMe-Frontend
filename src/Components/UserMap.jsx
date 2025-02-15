import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const puertoRicoCenter = [18.2208, -66.5901]; // Coordenadas del centro de PR



function UserMap({locations})
{
    return (
      <div> {/* hace que ocupe todo el WIDE de la pantalla */}
        <div className='row' >
          <div className='col-md-12 col-sm-12' > {/* in medium devices and up ocupy 8 columns in small devices ocupy 12 */}
            <div className='card shadow p-3' >
            <MapContainer center={puertoRicoCenter} zoom={8.4} style={{ height: "500px", width: "100%" }}>
              {/* Capa base del mapa usando OpenStreetMap */}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


              {/* Marcador en la ubicación actual */}
              {/* Iteramos sobre todas las ubicaciones y creamos un `Marker` para cada usuario */}
              {locations.map((user, index) => (
                <Marker key={index} position={[user.latitude, user.longitude]}>
                  <Popup>
                    <b>{user.username}</b> <br />
                    Last Update: {user.updatedAt}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            </div>
          </div>
        </div>
      </div>
    )
}
export default UserMap;

