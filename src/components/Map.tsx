import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { locations, type LocationItem } from "./locations";

const centerPosition: [number, number] = [-16.4952, -68.132];

const MapWithMarkers: React.FC = () => (
  <MapContainer
    center={centerPosition}
    zoom={13}
    style={{ height: "100vh", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locations.map((loc: LocationItem) => (
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

export default MapWithMarkers;
