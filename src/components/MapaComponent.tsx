// src/components/MarketsMap.tsx
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useMarketStore } from "../store/useMarketStore";
import type { Market } from "../interfaces/marketInterface";

function FitBounds({ markets }: { markets: Market[] }) {
  const map = useMap();

  useEffect(() => {
    if (!markets.length) return;

    const bounds = markets.map((m) => [m.latitude, m.longitude]) as [
      number,
      number
    ][];
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [markets, map]);

  return null;
}

interface Props {
  zoom?: number;
  height?: string | number;
}

export default function MarketsMap({
  zoom = 13,
  height = "80vh",
}: Props) {
  const { markets, fetchMarkets, isLoading } = useMarketStore((s) => ({
    markets: s.markets,
    fetchMarkets: s.getMarkets,
    isLoading: s.isLoading,
  }));

  const marketsToShow = useMemo(() => markets.slice(0, 5), [markets]);

  useEffect(() => {
    if (!markets.length) fetchMarkets();
  }, [markets.length, fetchMarkets]);

  if (isLoading) return <p>Cargando mapa…</p>;

  return (
    <MapContainer
      center={[-16.5, -68.15]}
      zoom={zoom}
      style={{ height, width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {marketsToShow.map((m) => (
        <Marker key={m.id} position={[m.latitude, m.longitude]}>
          <Popup>
            <strong>{m.name}</strong>
            <br />
            {m.description}
          </Popup>
        </Marker>
      ))}

      <FitBounds markets={marketsToShow} />
    </MapContainer>
  );
}
