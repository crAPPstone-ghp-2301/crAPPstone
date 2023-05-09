import React from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";
import { enableMapSet } from 'immer';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Button, Typography,Divider} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { PrimaryButton} from "../features/styles/StyleGuide"
import {CustomizedIconButton} from "../features/styles/StyleGuide"

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


    // map.current.on('click', (event) => {
    //     const features = map.current.queryRenderedFeatures(event.point, {
    //     layers: ['restroom-nyc-all']
    //     });
    //     if (!features.length) {
    //     return;
    //     }
    //     const feature = features[0];
        
    //     const popup = new mapboxgl.Popup({ offset: [0, -15] })
    //     .setLngLat(feature.geometry.coordinates)
    //     .setHTML(
    //     `<p>${feature.properties.name}</p>`
    //     )
    //     .addTo(map.current);
    //     });

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
    <div className="position-absolute top-0 start-50 translate-middle-x" style={{ left: '-10%' }}>
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
