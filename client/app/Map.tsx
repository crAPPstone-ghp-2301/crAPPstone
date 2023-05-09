import React from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";
import { enableMapSet } from 'immer';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Button, Typography} from "@mui/material";
import { PrimaryButton} from "../features/styles/StyleGuide"


const restrooms = [
  {
    id: 1,
    name: 'Central Park Restroom',
    openingHours: '8:00am-10:00pm',
    description: 'A clean public restroom located in Central Park.',
    address: 'Central Park, New York, NY, USA',
    placeType: 'Park',
    latitude: '40.7829',
    longitude: '-73.9654',
    capacity: 10,
    isLocked: false,
    code: '1234',
    isBusy: false,
    lastUpdate: new Date('2022-01-01T10:00:00.000Z'),
    createdAt: new Date('2022-01-01T10:00:00.000Z')
  },
  {
    id: 2,
    name: 'Starbucks Restroom',
    openingHours: '7:00am-9:00pm',
    description: 'A restroom located inside a Starbucks coffee shop.',
    address: '123 Main St, Seattle, WA, USA',
    placeType: 'Coffee Shop',
    latitude: '47.6062',
    longitude: '-122.3321',
    capacity: 5,
    isLocked: true,
    code: '4321',
    isBusy: true,
    lastUpdate: new Date('2022-01-02T10:00:00.000Z'),
    createdAt: new Date('2022-01-02T10:00:00.000Z')
  },
  {
    id: 3,
    name: 'Mall Restroom',
    openingHours: '10:00am-8:00pm',
    description: 'A public restroom located inside a shopping mall.',
    address: '456 Oak St, Los Angeles, CA, USA',
    placeType: 'Shopping Mall',
    latitude: '34.0522',
    longitude: '-118.2437',
    capacity: 15,
    isLocked: false,
    code: '2468',
    isBusy: false,
    lastUpdate: new Date('2022-01-03T10:00:00.000Z'),
    createdAt: new Date('2022-01-03T10:00:00.000Z')
  },
  {
    id: 4,
    name: 'Airport Restroom',
    openingHours: '24/7',
    description: 'A restroom located inside an airport.',
    address: '789 International Blvd, Atlanta, GA, USA',
    placeType: 'Airport',
    latitude: '33.6367',
    longitude: '-84.4281',
    capacity: 20,
    isLocked: true,
    code: '1357',
    isBusy: true,
    lastUpdate: new Date('2022-01-04T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  },
  {
    id: 5,
    name: 'Hotel Restroom',
    openingHours: '24/7',
    description: 'A clean restroom located inside a hotel.',
    address: '987 Broadway, San Francisco, CA, USA',
    placeType: 'Hotel',
    latitude: '37.7749',
    longitude: '-122.4194',
    capacity: 8,
    isLocked: false,
    code: '8642',
    isBusy: false,
    lastUpdate: new Date('2022-01-05T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  }
]


mapboxgl.accessToken = 'pk.eyJ1IjoiZnh1MjAyMyIsImEiOiJjbGg5d3psZjcwYnJoM2Z0ZG13dXhiZzc1In0.scud3ARQla5nkZt5h-5cOw'
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);
  const [newPlace, setNewPlace] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/fxu2023/clhfcen9i02bg01qncp8vg9d1',
      center: [-74.006, 40.7128], //center is ny
      zoom: zoom
    });


    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
  })

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }), "bottom-right"
    );

    const geoJSONFeatures = restrooms.map(restroom => ({
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
        `<h3>${feature.properties.name}</h3>
        <p>${feature.properties.description}</p>`
        )
        .addTo(map.current);
        });

      map.current.addControl(
        new mapboxgl.NavigationControl(),"bottom-right"
      );

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker:true, 
    });
      

      map.current.addControl(geocoder,"top-right");
      
      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on('load', function() {
      geocoder.container.setAttribute('id', 'geocoder-search')
  });
  

  function direction_reset() {
    directions.actions.clearOrigin()
    directions.actions.clearDestination()
    directions.container.querySelector('input').value = ''
}
$(function() {
    $('#get-direction').click(function() {
        // Adding Direction form and instructions on map
        map.current.addControl(directions, 'top-right');
        directions.container.setAttribute('id', 'direction-container')
        $(geocoder.container).hide()
        $(this).hide()
        $('#end-direction').removeClass('d-none')
        $('.marker').remove()

    })
    $('#end-direction').click(function() {
        direction_reset()
        $(this).addClass('d-none')
        $('#get-direction').show()
        $(geocoder.container).show()
        map.current.removeControl(directions)
    })

})
    
  },[]);


  
  return (
    <div>
    <div ref={mapContainer} className="map-container"></div>
    <div className="position-absolute top-0 start-6 ">
    <PrimaryButton variant="outlined" sx={{ mr: 2, mt: 3 }} id="get-direction">
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
        Direction
      </Typography>
      <i className="fa fa-directions"></i>
    </PrimaryButton>
    <PrimaryButton variant="outlined" sx={{ mt: 3 }} className="d-none" id="end-direction">
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
        End Direction
      </Typography>
      <i className="fa fa-times"></i>
    </PrimaryButton>
  </div>
</div>
  )
}



export default Map
