import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { SecondaryButton } from "../features/styles/StyleGuide";
import { Box, Typography } from "@mui/material";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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
      placeholder: "  Enter an address or place name",
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
        <a href="/restrooms/${feature.properties.id_restroom}">More info</a>`;
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

    map.current.on("load", () => {
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
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
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
    });

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
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
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
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
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
      directions.container.querySelector("input").value = "";
    }

    $(document).on("click", "#get-direction", function () {
      // Adding Direction form and instructions on map
      map.current.addControl(directions, "top-right");
      directions.container.setAttribute("id", "direction-container");
      $(geocoder.container).hide();
      $(this).hide();
      $("#end-direction").removeClass("d-none");
    });

    $(document).on("click", "#end-direction", function () {
      direction_reset();
      $(this).addClass("d-none");
      $("#get-direction").show();
      $(geocoder.container).show();
      map.current.removeControl(directions);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 550,
          right: 0,
          display: "flex",
          marginTop: 1,
          flexDirection: "row",
          zIndex: 1,
        }}
      >
        <SecondaryButton
          variant="contained"
          sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
          id="restroom-mall-nyc"
        >
          <img
            src="https://www.svgrepo.com/show/375867/present.svg"
            width="20px"
          />
          <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
            Malls
          </Typography>
        </SecondaryButton>
        <SecondaryButton
          variant="contained"
          sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
          id="restroom-hotel-nyc"
        >
          <img
            src="https://www.svgrepo.com/show/192397/hotel.svg"
            width="20px"
          />
          <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
            Hotels
          </Typography>
        </SecondaryButton>
        <SecondaryButton
          variant="contained"
          sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
          id="public-restroom-nyc"
        >
          <img
            src="https://www.svgrepo.com/show/87415/toilet-paper.svg"
            width="20px"
          />
          <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
            Public Restrooms
          </Typography>
        </SecondaryButton>
      </Box>
      <Box>
        <SecondaryButton
          variant="contained"
          sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
          id="get-direction"
        >
          <AssistantDirectionIcon />
          <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
            For Directions
          </Typography>
        </SecondaryButton>
        <SecondaryButton
          variant="contained"
          sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
          className="d-none"
          id="end-direction"
        >
          <SearchRoundedIcon />
          <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
            For Search
          </Typography>
        </SecondaryButton>
      </Box>
      <Box ref={mapContainer} className="map-container"></Box>
    </Box>
  );
};

export default Map;
