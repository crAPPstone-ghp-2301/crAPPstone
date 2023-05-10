import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";
import { enableMapSet } from 'immer';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { getAllRestrooms, selectRestroom } from '../features/restrooms/allRestroomSlice';



mapboxgl.accessToken = 'pk.eyJ1IjoiZnh1MjAyMyIsImEiOiJjbGg5d3psZjcwYnJoM2Z0ZG13dXhiZzc1In0.scud3ARQla5nkZt5h-5cOw'
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);
  const [newPlace, setNewPlace] = useState(null);
  const dispatch = useDispatch();

  const restrooms = useSelector(selectRestroom);
  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]); 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/fxu2023/clhfcen9i02bg01qncp8vg9d1',
      center: [-74.006, 40.7128], //center is ny
      zoom: zoom
    });

   
    map.current.addControl(
      new MapboxDirections({
      accessToken: mapboxgl.accessToken
      }),
      'top-right'
      );

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }), "bottom-right"
    );

    const geoJSONFeatures = Array.isArray(restrooms) && restrooms.map(restroom => ({
      type: 'Feature',
      properties: {
        description: `<strong>${restroom.name}</strong><p>${restroom.description}</p>`,
        icon: 'toilet-1'
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(restroom.longitude), parseFloat(restroom.latitude)]
      }
    }));

    
    map.current.on('click', (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['restroom-1']
        });
        if (!features.length) {
        return;
        }
        const feature = features[0];
        
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
        `<h3>${feature.properties.name}</h3><p>${feature.properties.description}</p>`
        )
        .addTo(map.current);
        });

      map.current.addControl(
        new mapboxgl.NavigationControl(),"bottom-right"
      );

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: 'us',
        language: 'en',
        mapboxgl: mapboxgl
      });
      
      geocoder.on('result', (event) => {
        const searchText = event.result.text;
        console.log(searchText);
      });

      map.current.addControl(geocoder,"top-right");
      
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
