import React from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState, useEffect } from "react";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { PrimaryButton,TertiaryButton } from "../features/styles/StyleGuide";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnh1MjAyMyIsImEiOiJjbGg5d3psZjcwYnJoM2Z0ZG13dXhiZzc1In0.scud3ARQla5nkZt5h-5cOw";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);

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

    map.current.on("mouseenter", "restroom-mall-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <a href="http://localhost:8080/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("mouseenter", "restroom-hotel-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <a href="http://localhost:8080/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("mouseenter", "public-restroom-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
      <p>${feature.properties.Location}</p>
      <a href="http://localhost:8080/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on('load', () => {
      const marker = new mapboxgl.Marker({
      'color': ' #CB997E'
      });
       
      geocoder.on('result', async (event) => {
      const point = event.result.center;
      console.log(point)
      const tileset = 'fxu2023.509pfoqy';
      const radius = 1609;
      const limit = 50;
      marker.setLngLat(point).addTo(map.current);
      const query = await fetch(
      `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
      );
      console.log(query)
      const json = await query.json();
      map.current.getSource('tilequery').setData(json);
      });
       
      map.current.addSource('tilequery', {
      type: 'geojson',
      data: {
      'type': 'FeatureCollection',
      'features': []
      }
      });
       
      map.current.addLayer({
      id: 'tilequery-points',
      type: 'circle',
      source: 'tilequery',
      paint: {
      'circle-stroke-color': 'white',
      'circle-stroke-width': {
      stops: [
      [0, 0.1],
      [18, 3]
      ],
      base: 5
      },
      'circle-radius': {
      stops: [
      [12, 10],
      [22, 200]
      ],
      base: 5
      },
      'circle-color': [
      'match',
      ['get', 'Placetype'],
      'Mall', '#0BB000',
      'hotel', '#F89446',
      'restroom', '#EA0000',
      '#FF0000' // default color if no match
    ]
      }
      });
       
      const popup = new mapboxgl.Popup();
       
      map.current.on('mouseenter', 'tilequery-points', (event) => {
      map.current.getCanvas().style.cursor = 'pointer';
      const properties = event.features[0].properties;
      const obj = JSON.parse(properties.tilequery);
      const coordinates = new mapboxgl.LngLat(
      properties.Longitude,
      properties.Latitude
      );
      console.log(properties)
      const content = `<h3>${properties.STORE_NAME}</h3><h4>${
      properties.Placetype
      }</h4><p>${properties.STORE_LOCATION}</p><p>${(
      obj.distance / 1609.344
      ).toFixed(2)} mi. from location</p>`;
       
      popup.setLngLat(coordinates).setHTML(content).addTo(map.current);
      });
    });
        
        $(document).on("click", "#restroom-mall-nyc", (e) => {
          const clickedLayer = e.target.id;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.current.getLayoutProperty(
            clickedLayer,
            "visibility"
          );

          if (visibility === "visible") {
            map.current.setLayoutProperty(clickedLayer, "visibility", "none");
          } else {
            map.current.setLayoutProperty(
              clickedLayer,
              "visibility",
              "visible"
            );
            map.current.setLayoutProperty(
              "restroom-hotel-nyc",
              "visibility",
              "none"
            );
            map.current.setLayoutProperty(
              "public-restroom-nyc",
              "visibility",
              "none"
            );
          }
        })
    

      
        $(document).on("click", "#restroom-hotel-nyc", (e) => {
          const clickedLayer = e.target.id;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.current.getLayoutProperty(
            clickedLayer,
            "visibility"
          );

          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === "visible") {
            map.current.setLayoutProperty(clickedLayer, "visibility", "none");
          } else {
            map.current.setLayoutProperty(
              clickedLayer,
              "visibility",
              "visible"
            );
            map.current.setLayoutProperty(
              "restroom-mall-nyc",
              "visibility",
              "none"
            );
            map.current.setLayoutProperty(
              "public-restroom-nyc",
              "visibility",
              "none"
            );
          }
        });
     

      
        $(document).on("click", "#public-restroom-nyc", (e) => {
          const clickedLayer = e.target.id;
          e.preventDefault();
          e.stopPropagation();

          const visibility = map.current.getLayoutProperty(
            clickedLayer,
            "visibility"
          );

          // Toggle layer visibility by changing the layout object's visibility property.
          if (visibility === "visible") {
            map.current.setLayoutProperty(clickedLayer, "visibility", "none");
          } else {
            map.current.setLayoutProperty(
              clickedLayer,
              "visibility",
              "visible"
            );
            map.current.setLayoutProperty(
              "restroom-mall-nyc",
              "visibility",
              "none"
            );
            map.current.setLayoutProperty(
              "restroom-hotel-nyc",
              "visibility",
              "none"
            );
          }
        });

      function direction_reset() {
        directions.actions.clearOrigin();
        directions.actions.clearDestination();
        directions.container.querySelector('input').value = '';
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

 },[]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <PrimaryButton
          variant="outlined"
          sx={{ px: 1, py: 0.5, mr: 2 }}
          id="restroom-mall-nyc"
        >
          Restroom in Mall
        </PrimaryButton>
        <PrimaryButton
          variant="outlined"
          sx={{ px: 1, py: 0.5, mr: 2 }}
          id="restroom-hotel-nyc"
        >
          Restroom in Hotel
        </PrimaryButton>
        <PrimaryButton
          variant="outlined"
          sx={{ px: 1, py: 0.5, mr: 2 }}
          id="public-restroom-nyc"
        >
          Public Restroom NYC
        </PrimaryButton>
      </div>
      <div>
        <TertiaryButton
          variant="outlined"
          sx={{ px: 1, py: 0.5 }}
          id="get-direction"
        >
          <AssistantDirectionIcon />
        </TertiaryButton>
        <TertiaryButton
          variant="outlined"
          sx={{ px: 1, py: 0.5 }}
          className="d-none"
          id="end-direction"
        >
          <HighlightOffIcon />
        </TertiaryButton>
      </div>

      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default Map;
