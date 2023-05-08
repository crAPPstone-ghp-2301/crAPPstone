import React from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlZXNvbyIsImEiOiJjbGhhcDdjamMwamk5M2hvZ3NmeGlxeW16In0.yFqw0jGTNTtzqqcESkJlWA'

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);
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
        position: "bottom-right",

      })
    );
    map.current.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
        position: "top-right",
      })
    );
    
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'us',
      language: 'en',
      position:"top-left",
      mapboxgl: mapboxgl
    });
  
    geocoder.on('result', (event) => {
      const searchText = event.result.text;
      console.log(searchText);
    });
    
    map.current.addControl(geocoder);
    
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  },[]);
  
  return (
    <div ref={mapContainer} className="map-container">
    </div>

  )
}

export default Map






