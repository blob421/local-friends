"use client"
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";



const bbox: [number, number, number, number] = [
  -71.3739394,
                46.8548104,
                -71.3443733,
                46.8821912
];

function FitBBox({ bbox }: { bbox: [number, number, number, number] }) {
  const map = useMap();
  const southWest: [number, number] = [bbox[1], bbox[0]]; // [lat, lon]
  const northEast: [number, number] = [bbox[3], bbox[2]];
  map.fitBounds([southWest, northEast]);
  return null;
}
const polygonCoords: [number, number][] = [
  [bbox[1], bbox[0]], // SouthWest (lat, lon)
  [bbox[3], bbox[0]], // NorthWest
  [bbox[3], bbox[2]], // NorthEast
  [bbox[1], bbox[2]], // SouthEast
  [bbox[1], bbox[0]], // Close polygon back to SW
];

export default function map(){
  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      center={[45.51, -73.57]}
      zoom={13}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Polygon positions={polygonCoords} color="blue" opacity="0.01" />
       <FitBBox bbox={bbox} />
    </MapContainer>
  );

}