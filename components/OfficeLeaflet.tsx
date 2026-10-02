'use client';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { pages } from '@/content/pages';
// Rushan town coordinates, approximate only. The Barchidif office pin needs confirmation.
const position: [number, number] = [37.9442, 71.5575];
const marker = divIcon({ className: '', html: '<span style="display:block;width:22px;height:22px;border-radius:50%;background:#E8A24A;border:3px solid #0B1F2E;box-shadow:0 2px 12px #0B1F2E88"></span>', iconSize: [22, 22], iconAnchor: [11, 11] });
export default function OfficeLeaflet() {
  return <div className="overflow-hidden rounded-brand border border-navy/10"><MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: 380, width: '100%' }} aria-label={pages.contact.mapTitle}><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={position} icon={marker}><Tooltip permanent direction="top">{pages.contact.pin}</Tooltip></Marker></MapContainer><div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 text-sm"><p className="max-w-lg text-navy/70">{pages.contact.mapNote}</p><a href={`https://www.openstreetmap.org/?mlat=${position[0]}&mlon=${position[1]}#map=10/${position[0]}/${position[1]}`} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">{pages.contact.openMaps}</a></div></div>;
}
