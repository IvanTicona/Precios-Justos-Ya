import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import jsonServerInstance from "../api/jsonInstance";

const centerPosition: [number, number] = [-16.4952, -68.132];

export interface LocationItem {
  id: string;
  name: string;
  coords: [number, number];
};

const MapPage = () => {

  const [zones, setZones] = useState<LocationItem[]>([]);

  useEffect(() => {
    const getZones = async () => {
      const response = await jsonServerInstance.get<LocationItem[]>("/zones");
      if (response.status === 200) {
        setZones(response.data);
      } else {
        console.error("Error fetching zones:", response.statusText);
      }
    }
    getZones();
  }, []);

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zones.map((loc: LocationItem) => (
        <Marker
          key={loc.id}
          position={loc.coords}
          eventHandlers={{
            click: () => {
              console.log("Marcador clicado:", loc.id);
            },
          }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapPage;
