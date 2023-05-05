import React from 'react'
import mapboxgl from 'mapbox-gl';
// import { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlZXNvbyIsImEiOiJjbGhhcDdjamMwamk5M2hvZ3NmeGlxeW16In0.yFqw0jGTNTtzqqcESkJlWA'

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [newPlace, setNewPlace] = useState(null)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        position:"bottom-right",
      })
    );
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div ref={mapContainer} className="map-container" />
  )
}

export default Map