import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useState, useEffect } from "react";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Button, Typography,Divider} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import { PrimaryButton} from "../features/styles/StyleGuide"
import {CustomizedIconButton} from "../features/styles/StyleGuide"
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
  
  // const restrooms = useSelector(selectRestroom);
  // useEffect(() => {
  //   dispatch(getAllRestrooms());
  // }, [dispatch]); 

  useEffect(() => {
    
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/fxu2023/clhfcen9i02bg01qncp8vg9d1',
      center: [-74.006, 40.7128], //center is ny
      zoom: zoom
    });


    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }), "bottom-right"
    );

     map.current.addControl(
        new mapboxgl.NavigationControl(),"bottom-right"
      );

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker:true, 
    });
      

      map.current.addControl(geocoder,"top-right");

      let popup = new mapboxgl.Popup({ offset: [0, -15] });

    map.current.on('mouseenter', 'public-restroom-nyc', (event) => {
      const feature = event.features[0];
      const popupContent =
        `<h3>${feature.properties.Name}</h3>
        <p>${feature.properties.Location}</p>`
        // + `${ReactDOMServer.renderToString(<SaveButton />)}`
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on('mouseleave', 'public-restroom-nyc', () => {
      popup.remove();
    });

    map.current.on('mouseenter', 'restroom-hotel-nyc', (event) => {
      const feature = event.features[0];
      const popupContent =
        `<h3>${feature.properties.Name}</h3>
        <p>${feature.properties.Location}</p>`
        // + `${ReactDOMServer.renderToString(<SaveButton />)}`
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on('mouseleave', 'restroom-hotel-nyc', () => {
      popup.remove();
    });

      map.current.on("move", () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', function() {
      geocoder.container.setAttribute('id', 'geocoder-search')
  });
  
  const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken

  })

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

map.current.on('idle', () => {
  // If these two layers were not added to the map, abort
  if (!map.current.getLayer('restroom-mall-nyc') || !map.current.getLayer('restroom-hotel-nyc') ||!map.current.getLayer('public-restroom-nyc') ) {
    console.log("not found")
  return;
  }
   
  // Enumerate ids of the layers.
  const toggleableLayerIds = ['restroom-mall-nyc', 'restroom-hotel-nyc','public-restroom-nyc'];
   
  // Set up the corresponding toggle button for each layer.
  for (const id of toggleableLayerIds) {
  // Skip layers that already have a button set up.
  if (document.getElementById(id)) {
  continue;
  }
   
  // Create a link.
  const link = document.createElement('a');
  link.id = id;
  link.href = '#';
  link.textContent = id;
  link.className = 'active';
   
  // Show or hide layer when the toggle is clicked.
  link.onclick = function (e) {
  const clickedLayer = this.textContent;
  e.preventDefault();
  e.stopPropagation();
   
  const visibility = map.current.getLayoutProperty(
  clickedLayer,
  'visibility'
  );
   
  // Toggle layer visibility by changing the layout object's visibility property.
  if (visibility === 'visible') {
  map.current.setLayoutProperty(clickedLayer, 'visibility', 'none');
  this.className = '';
  } else {
  this.className = 'active';
  map.current.setLayoutProperty(
  clickedLayer,
  'visibility',
  'visible'
  );
  }
  };
   
  const layers = document.getElementById('menu');
  layers.appendChild(link);
  }
  });

  
  },[]);


  
  return (
    <div>
      <nav id="menu"></nav>
      <div>
      <PrimaryButton variant="outlined" sx={{ mr: 2, mt: 3 }} id="get-direction">
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
        Direction
      </Typography>
    </PrimaryButton>
    <PrimaryButton variant="outlined" sx={{ mt: 3 }} className="d-none" id="end-direction">
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
        End Direction
      </Typography>
    </PrimaryButton> 
      </div>
    <div ref={mapContainer} className="map-container"></div>
</div>
  )
}


export default Map

