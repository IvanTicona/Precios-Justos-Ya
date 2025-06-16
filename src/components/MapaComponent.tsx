// src/components/MarketsMap.tsx
import { useEffect, useMemo, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import Overlay from 'ol/Overlay';

import 'ol/ol.css';

interface Market {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  tipo: string;
  imgUrl?: string;
}

interface Props {
  markets: Market[];
  zoom?: number;
  height?: string | number;
}

export default function MarketsMap({
  markets,
  zoom = 13,
  height = '80vh'
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupOverlay = useRef<Overlay | null>(null);

  const marketsToShow = useMemo(() => markets, [markets]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: fromLonLat([-68.15, -16.5]), // La Paz
        zoom
      })
    });

    if (popupRef.current) {
      popupOverlay.current = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: true
      });
      mapInstance.current.addOverlay(popupOverlay.current);
    }

    return () => {
      mapInstance.current?.setTarget(undefined);
      mapInstance.current = null;
    };
  }, [zoom]);

  useEffect(() => {
    if (!mapInstance.current || !popupOverlay.current) return;

    mapInstance.current
      .getLayers()
      .getArray()
      .filter((l) => l instanceof VectorLayer)
      .forEach((l) => mapInstance.current!.removeLayer(l));

    const features = marketsToShow.map(
      (m) =>
        new Feature({
          geometry: new Point(fromLonLat([m.longitude, m.latitude])),
          market: m
        })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({ features }),
      style: new Style({
        image: new Icon({
          src: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png', // CDN sin CORS
          anchor: [0.5, 1],
          scale: 0.65
        })
      })
    });

    mapInstance.current.addLayer(vectorLayer);

    const handleClick = (evt: any) => {
      const feat = mapInstance.current!.forEachFeatureAtPixel(
        evt.pixel,
        (f) => f
      );
      if (feat) {
        const m = feat.get('market') as Market;
        popupRef.current!.innerHTML = `<strong>${m.name}</strong><br>${m.description}`;
        popupOverlay.current!.setPosition(
          (feat.getGeometry() as Point).getCoordinates()
        );
      } else {
        popupOverlay.current!.setPosition(undefined);
      }
    };

    mapInstance.current.on('click', handleClick);
    return () => mapInstance.current?.un('click', handleClick);
  }, [marketsToShow]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div
        ref={popupRef}
        style={{
          background: 'white',
          padding: '5px',
          borderRadius: '3px',
          boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
          maxWidth: '200px'
        }}
      />
    </div>
  );
}
