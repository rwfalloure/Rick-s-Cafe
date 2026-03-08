"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RestaurantEntry } from "@/data/restaurants";

// Fix Leaflet default marker icons in Next.js (icons are loaded from CDN instead of local bundle)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  restaurants: RestaurantEntry[];
  center?: [number, number];
  zoom?: number;
}

export default function RestaurantMap({ restaurants, center, zoom = 11 }: Props) {
  const mapCenter: [number, number] =
    center ??
    (restaurants.length > 0 ? restaurants[0].coordinates : [29.76, -95.37]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: "480px", width: "100%" }}
      className="rounded-sm z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {restaurants.map((r) => (
        <Marker key={r.id} position={r.coordinates}>
          <Popup>
            <div style={{ fontFamily: "serif", minWidth: "160px", lineHeight: 1.5 }}>
              <strong style={{ fontSize: "15px", display: "block" }}>
                {r.name}
              </strong>
              <span style={{ fontSize: "12px", color: "#555" }}>
                {r.cuisine}
              </span>
              {r.neighborhood && (
                <span
                  style={{ fontSize: "12px", color: "#888", display: "block" }}
                >
                  {r.neighborhood}
                </span>
              )}
              {r.city && !r.neighborhood && (
                <span
                  style={{ fontSize: "12px", color: "#888", display: "block" }}
                >
                  {r.city}
                  {r.country ? `, ${r.country}` : ""}
                </span>
              )}
              <div
                style={{
                  marginTop: "6px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "#1a2e18",
                  fontSize: "14px",
                }}
              >
                {r.rating.toFixed(1)} / 10
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
