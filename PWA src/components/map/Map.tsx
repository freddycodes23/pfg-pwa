
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { type Branch } from '@/lib/branches';
import { Button } from '../ui/button';
import { ExternalLink, User } from 'lucide-react';

// Fix for default icon issues in Leaflet with Webpack
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDc3YmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyIj48cGF0aCBkPSJNMTkgMjF2LTIuNzdhNC40IDQuNCAwIDAgMC00LjQtNC40SDkuNGE0LjQgNC40IDAgMCAwLTQuNCA0LjRWDIxIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});


interface MapProps {
    center: [number, number];
    zoom: number;
    branches: Branch[];
    selectedBranch?: Branch | null;
    locatedBranch?: { name: string; address: string, lat: number, lng: number } | null;
    userLocation?: { lat: number, lng: number } | null;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function Map({ center, zoom, branches, selectedBranch, locatedBranch, userLocation }: MapProps) {
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-b-lg">
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {branches.map(branch => (
                <Marker key={branch.name} position={[branch.lat, branch.lng]}>
                    <Popup>
                       <div className="space-y-2">
                            <h3 className="font-bold">{branch.name}</h3>
                            <p>{branch.address}</p>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                            >
                                <Button variant="outline" size="sm" className="w-full">
                                    <ExternalLink className="mr-2 h-3 w-3" />
                                    Get Directions
                                </Button>
                            </a>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}
