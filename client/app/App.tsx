import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import crAppTheme from "./theme";
import AppRoutes from "./AppRoutes";
import NavBar from "../features/navigation/Navbar";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlZXNvbyIsImEiOiJjbGhhcDdjamMwamk5M2hvZ3NmeGlxeW16In0.yFqw0jGTNTtzqqcESkJlWA'


const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
const [lat, setLat] = useState(40.76);
const [zoom, setZoom] = useState(12);

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

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  },[]);

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <NavBar />
      <AppRoutes />
      <div ref={mapContainer} className="map-container"></div>
    </ThemeProvider>
  );
};

export default App;
