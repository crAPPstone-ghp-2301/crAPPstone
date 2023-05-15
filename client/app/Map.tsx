import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from "react";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Button, Typography,Divider} from "@mui/material";
import { PrimaryButton} from "../features/styles/StyleGuide"
import { getAllRestrooms, selectRestroom } from '../features/restrooms/allRestroomSlice';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { Dialog,DialogTitle,DialogContent,DialogContentText,Rating,DialogActions } from '@mui/material';
import {CustomizedTextField} from "../features/styles/StyleGuide"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import crAppTheme from "./theme";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnh1MjAyMyIsImEiOiJjbGg5d3psZjcwYnJoM2Z0ZG13dXhiZzc1In0.scud3ARQla5nkZt5h-5cOw";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);
  const [newPlace, setNewPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  const restrooms = useSelector(selectRestroom);
  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/fxu2023/clhfcen9i02bg01qncp8vg9d1",
      center: [-74.006, 40.7128], //center is ny
      zoom: zoom,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );

    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      zoom: 13,
      placeholder: "Enter an address or place name",
      bbox: [-74.0171, 40.6983, -73.9949, 40.7273],
    });

    map.current.addControl(geocoder, "top-right");
    geocoder.container.setAttribute("id", "geocoder-search");

    let popup = new mapboxgl.Popup({ offset: [0, -15] });

    map.current.on("mouseenter", "public-restroom-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <button class="rateBtn" style="background-color:#D4A373">Rate me</button>`
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("mouseenter", "restroom-hotel-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <button class="rateBtn" style="background-color:#D4A373">Rate me</button>`
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("mouseenter", "restroom-mall-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <button class="rateBtn" style="background-color:#D4A373">Rate me</button>`
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    $(document).on('click', '.rateBtn', function() {
      setIsModalOpen(true);
    });

    map.current.on('load', () => {
      const marker = new mapboxgl.Marker({
        color: " #CB997E",
      });

      geocoder.on("result", async (event) => {
        const point = event.result.center;
        console.log(point);
        const tileset = "fxu2023.509pfoqy";
        const radius = 1609;
        const limit = 50;
        marker.setLngLat(point).addTo(map.current);
        const query = await fetch(
          `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`,
          { method: "GET" }
        );
        console.log(query);
        const json = await query.json();
        map.current.getSource("tilequery").setData(json);
      });

      map.current.addSource("tilequery", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "tilequery-points",
        type: "circle",
        source: "tilequery",
        paint: {
          "circle-stroke-color": "white",
          "circle-stroke-width": {
            stops: [
              [0, 0.1],
              [18, 3],
            ],
            base: 5,
          },
          "circle-radius": {
            stops: [
              [12, 10],
              [22, 200],
            ],
            base: 5,
          },
          "circle-color": [
            "match",
            ["get", "Placetype"],
            "Mall",
            "#0BB000",
            "hotel",
            "#F89446",
            "restroom",
            "#EA0000",
            "#FF0000", // default color if no match
          ],
        },
      });

      const popup = new mapboxgl.Popup();

      map.current.on("mouseenter", "tilequery-points", (event) => {
        map.current.getCanvas().style.cursor = "pointer";
        const properties = event.features[0].properties;
        const obj = JSON.parse(properties.tilequery);
        const coordinates = new mapboxgl.LngLat(
          properties.Longitude,
          properties.Latitude
        );

        const content = `<p><strong>${properties.STORE_NAME}</strong></p><p>${
          properties.Placetype
        }</p><p>${properties.STORE_LOCATION}</p><p><strong>${(
          obj.distance / 1609.344
        ).toFixed(2)}</strong> mi. from location</p>`;

        popup.setLngLat(coordinates).setHTML(content).addTo(map.current);
      });
    });

    function direction_reset() {
      directions.actions.clearOrigin();
      directions.actions.clearDestination();
      directions.container.querySelector("input").value = "";
    }
    
    $(document).on('click', '#get-direction', function() {
      // Adding Direction form and instructions on map
      map.current.addControl(directions, 'top-right');
      directions.container.setAttribute('id', 'direction-container');
      $(geocoder.container).hide();
      $(this).hide();
      $('#end-direction').removeClass('d-none');
    });
    
    $(document).on('click', '#end-direction', function() {
      direction_reset();
      $(this).addClass('d-none');
      $('#get-direction').show();
      $(geocoder.container).show();
      map.current.removeControl(directions);
    });

    map.current.on("idle", () => {
      // If these two layers were not added to the map, abort
      if (
        !map.current.getLayer("restroom-mall-nyc") ||
        !map.current.getLayer("restroom-hotel-nyc") ||
        !map.current.getLayer("public-restroom-nyc")
      ) {
        console.log("not found");
        return;
      }

      // Enumerate ids of the layers.
      const toggleableLayerIds = [
        "restroom-mall-nyc",
        "restroom-hotel-nyc",
        "public-restroom-nyc",
      ];

      // Set up the corresponding toggle button for each layer.
      for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
          continue;
        }

        // Create a link.
        const link = document.createElement("a");
        link.id = id;
        link.href = "#";
        link.textContent = id;
        link.className = "active"; // Set the initial class to an empty string for "none" visibility.

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
          const clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.current.getLayoutProperty(
            clickedLayer,
            "visibility"
          );

          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === "visible") {
            map.current.setLayoutProperty(clickedLayer, "visibility", "none");
            this.className = ""; // Update the class to reflect the "none" visibility.
          } else {
            this.className = "active";
            map.current.setLayoutProperty(
              clickedLayer,
              "visibility",
              "visible"
            );
          }
        };

        const layers = document.getElementById("menu");
        layers.appendChild(link);
      }
    });
  },[]);
    


  
      return (
        <div>
         <nav id="menu" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></nav>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PrimaryButton variant="outlined" sx={{ px: 1, py: 0.5 }} id="get-direction">
              <AssistantDirectionIcon />
            </PrimaryButton>
            <PrimaryButton variant="outlined" sx={{ px: 1, py: 0.5 }} className="d-none" id="end-direction">
              <HighlightOffIcon />
            </PrimaryButton>
          </div>

          <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ p: 4, minHeight: '50vh' }}>
            <DialogTitle variant="h4" sx={{textAlign: "center",  padding: 4, color: crAppTheme.palette.text.secondary}}>Share your Experience</DialogTitle >
            <DialogContent style={{justifyContent: 'center'}} >
            <DialogContentText variant="h5" sx={{textAlign: "center",  padding: 4, color: crAppTheme.palette.text.secondary}}>
            How many star will you give?
            </DialogContentText>
              <CustomizedTextField
                id="outlined-required"
                label="Restroom#"
                placeholder="Name"
                sx={{ width: '200px' }}/>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
            </DialogContent>

          </Dialog>

        <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default Map;
