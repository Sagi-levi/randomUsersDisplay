import { useContext } from "react";
import "./UserDetails.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { UserContext } from "../../Context/UserContext";

export default function UserDetails({}) {
  const {user,setUser}=useContext(UserContext)
  const containerStyle = {
    width: "400px",
    height: "400px",
  };
const s="sd"
  const center = {
    lat: parseInt(user.location.coordinates.latitude),
    lng: parseInt(user.location.coordinates.longitude),
  };

  const position = {
    lat: parseInt(user.location.coordinates.latitude),
    lng: parseInt(user.location.coordinates.longitude),
  };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

console.log(user);
  return (
    <div className="cardConteiner">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="400"
          image={user.picture.medium}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name.first}-{user.name.last}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.dob.age}
          </Typography>
        </CardContent>

        <LoadScript googleMapsApiKey="AIzaSyDoWAvJtaxBTmExfyIHXjwU_B3_6qJR2yY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker onLoad={onLoad} position={position} />
          </GoogleMap>
        </LoadScript>
      </Card>
    </div>
  );
}
