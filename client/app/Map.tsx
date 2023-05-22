import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { MapButton } from "../features/styles/StyleGuide";
import { Box, Typography, useMediaQuery, Popper } from "@mui/material";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import CancelIcon from "@mui/icons-material/Cancel";
import { addToLocalStorage,getLocalStorage,clearLocalStorage } from "../features/history/HistoryLocalHelper";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZnh1MjAyMyIsImEiOiJjbGg5d3psZjcwYnJoM2Z0ZG13dXhiZzc1In0.scud3ARQla5nkZt5h-5cOw";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.98);
  const [lat, setLat] = useState(40.76);
  const [zoom, setZoom] = useState(12);
  const isMobile = useMediaQuery("(max-width:1250px)");

  const [isActivehotel, setIsActivehotel] = useState(false);
  const [isActivemall, setIsActivemall] = useState(false);
  const [isActiverestroom, setIsActiverestroom] = useState(false);
  const [anchorElMall, setAnchorElMall] = useState(null);
  const [anchorElHotel, setAnchorElHotel] = useState(null);
  const [anchorElRestroom, setAnchorElRestroom] = useState(null);

  const handleClickhotel = () => {
    setIsActivehotel(!isActivehotel);
    setIsActivemall(false);
    setIsActiverestroom(false);
    setAnchorElHotel(anchorElHotel ? null : event.currentTarget);
  };

  const handleClickmall = () => {
    setIsActivemall(!isActivemall);
    setIsActivehotel(false);
    setIsActiverestroom(false);
    setAnchorElMall(anchorElMall ? null : event.currentTarget);
  };

  const handleClickrestroom = () => {
    setIsActiverestroom(!isActiverestroom);
    setIsActivehotel(false);
    setIsActivemall(false);
    setAnchorElRestroom(anchorElRestroom ? null : event.currentTarget);
  };

  const history=getLocalStorage()
  
  
  const openMall = Boolean(anchorElMall);
  const openHotel = Boolean(anchorElHotel);
  const openRestroom = Boolean(anchorElRestroom);

  const anchorIdMall = openMall ? "mall-popper" : undefined;
  const anchorIdHotel = openHotel ? "hotel-popper" : undefined;
  const anchorIdRestroom = openRestroom ? "restroom-popper" : undefined;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/fxu2023/clhfcen9i02bg01qncp8vg9d1",
      // center: [-74.006, 40.7128], //center is ny
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

    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Retrieve latitude and longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        map.current.setCenter([longitude, latitude]);
      },
      function (error) {
        console.error(error);
      }
    );

    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   zoom: 13,
    //   placeholder: "Enter an address or place name",
    //   bbox: [-74.0171, 40.6983, -73.9949, 40.7273],
    // });

    // map.current.addControl(geocoder, "top-right");
    // geocoder.container.setAttribute("id", "geocoder-search");

    //   map.current.on("load", () => {
    //     const marker = new mapboxgl.Marker({
    //       color: " #CB997E",
    //     });

    //     geocoder.on("result", async (event) => {
    //       const point = event.result.center;
    //       console.log(point);
    //       const tileset = "fxu2023.clhs7ziyw0lfz2arsitz3ct0o-7dbgr";
    //       const radius = 1609;
    //       const limit = 50;
    //       marker.setLngLat(point).addTo(map.current);
    //       const query = await fetch(
    //         `https://api.mapbox.com/v4/${tileset}/tilequery/${point[0]},${point[1]}.json?radius=${radius}&limit=${limit}&access_token=${mapboxgl.accessToken}`,
    //         { method: "GET" }
    //       );
    //       console.log(query);
    //       const json = await query.json();
    //       map.current.getSource("tilequery").setData(json);
    //     });

    //     map.current.addSource("tilequery", {
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: [],
    //       },
    //     });

    //     map.current.addLayer({
    //       id: "tilequery-points",
    //       type: "circle",
    //       source: "tilequery",
    //       paint: {
    //         "circle-stroke-color": "white",
    //         "circle-stroke-width": {
    //           stops: [
    //             [0, 0.1],
    //             [18, 3],
    //           ],
    //           base: 5,
    //         },
    //         "circle-radius": {
    //           stops: [
    //             [12, 10],
    //             [22, 200],
    //           ],
    //           base: 5,
    //         },
    //         "circle-color": [
    //           "match",
    //           ["get", "Place_type"],
    //           "mall",
    //           "#0BB000",
    //           "hotel",
    //           "#F89446",
    //           "restroom",
    //           "#EA0000",
    //           "#FF0000", // default color if no match
    //         ],
    //       },
    //     });

    //   const popup = new mapboxgl.Popup();

    //   map.current.on("click", "tilequery-points", (event) => {
    //     map.current.getCanvas().style.cursor = "pointer";
    //     const properties = event.features[0].properties;
    //     const obj = JSON.parse(properties.tilequery);
    //     const coordinates = new mapboxgl.LngLat(
    //       properties.Longitude,
    //       properties.Latitude
    //     );
    //     console.log(properties);
    //     const content = `<h3>${properties.STORE_NAME}</h3><h4>${
    //       properties.Placetype
    //     }</h4><p>${properties.STORE_LOCATION}</p><p>${(
    //       obj.distance / 1609.344
    //     ).toFixed(2)} mi. from location</p>
    //             <a href="/restrooms/${properties.id_restroom}">More info</a>`;

    //     popup.setLngLat(coordinates).setHTML(content).addTo(map.current);
    //   });
    // });

    let popup = new mapboxgl.Popup({ offset: [0, -15] });

    map.current.on("click", "restroom-mall-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      addToLocalStorage(feature.properties)
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <a href="/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("click", "restroom-hotel-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      addToLocalStorage(feature.properties)
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <a href="/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("click", "all-restroom", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      addToLocalStorage(feature.properties)
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
        <p>${feature.properties.Location}</p>
        <a href="/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    map.current.on("click", "public-restroom-nyc", (event) => {
      map.current.getCanvas().style.cursor = "pointer";
      const feature = event.features[0];
      addToLocalStorage(feature.properties)
      const popupContent = `<p><strong>${feature.properties.Name}</strong></p>
      <p>${feature.properties.Location}</p>
      <a href="/restrooms/${feature.properties.id_restroom}">More info</a>`;
      popup
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map.current);
    });

    $(document).on("click", "#restroom-mall-nyc", (e) => {
      const clickedLayer = "restroom-mall-nyc";
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.current.getLayoutProperty(
        clickedLayer,
        "visibility"
      );

      if (visibility === "visible") {
        map.current.setLayoutProperty(clickedLayer, "visibility", "none");
        $("#restroom-mall-nyc").removeClass("active");
        map.current.setLayoutProperty("all-restroom", "visibility", "visible");
      } else {
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
        $("#restroom-mall-nyc").addClass("active");
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
        map.current.setLayoutProperty("all-restroom", "visibility", "none");
      }
    });

    $(document).on("click", "#restroom-hotel-nyc", (e) => {
      const clickedLayer = "restroom-hotel-nyc";
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.current.getLayoutProperty(
        clickedLayer,
        "visibility"
      );

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === "visible") {
        map.current.setLayoutProperty(clickedLayer, "visibility", "none");
        $("#restroom-hotel-nyc").removeClass("active");
        map.current.setLayoutProperty("all-restroom", "visibility", "visible");
      } else {
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
        $("#restroom-hotel-nyc").addClass("active");
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
        map.current.setLayoutProperty("all-restroom", "visibility", "none");
      }
    });

    $(document).on("click", "#public-restroom-nyc", (e) => {
      const clickedLayer = "public-restroom-nyc";
      e.preventDefault();
      e.stopPropagation();

      const visibility = map.current.getLayoutProperty(
        clickedLayer,
        "visibility"
      );

      // Toggle layer visibility by changing the layout object's visibility property.
      if (visibility === "visible") {
        map.current.setLayoutProperty(clickedLayer, "visibility", "none");
        $("#public-restroom-nyc").removeClass("active");
        map.current.setLayoutProperty("all-restroom", "visibility", "visible");
      } else {
        map.current.setLayoutProperty(clickedLayer, "visibility", "visible");
        $("#public-restroom-nyc").addClass("active");
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
        map.current.setLayoutProperty("all-restroom", "visibility", "none");
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
      // $(geocoder.container).hide();
      $(this).hide();
      $("#end-direction").removeClass("d-none");
    });

    $(document).on("click", "#end-direction", function () {
      direction_reset();
      $(this).addClass("d-none");
      $("#get-direction").show();
      // $(geocoder.container).show();
      map.current.removeControl(directions);
    });
  }, []);

  return (
    <Box>
      {isMobile ? (
        <Box
          sx={{
            position: "absolute",
            bottom: 65,
            right: 50,
            display: "flex",
            marginTop: 1,
            flexDirection: "row",
            zIndex: 1,
          }}
        >
          <MapButton
            variant="contained"
            sx={{ mx: 0.5, backgroundColor: "#FFF" }}
            id="restroom-mall-nyc"
            className={isActivemall ? "active" : ""}
            onClick={handleClickmall}
            aria-label="Malls"
          >
            <img
              src="https://www.svgrepo.com/show/375867/present.svg"
              width="20px"
              alt="Malls"
            />
          </MapButton>
          <MapButton
            variant="contained"
            sx={{ mx: 0.5, backgroundColor: "#FFF" }}
            id="restroom-hotel-nyc"
            className={isActivehotel ? "active" : ""}
            onClick={handleClickhotel}
            aria-label="Hotels"
          >
            <img
              src="https://www.svgrepo.com/show/192397/hotel.svg"
              width="20px"
              alt="Hotels"
            />
          </MapButton>
          <MapButton
            variant="contained"
            sx={{ mx: 0.5, backgroundColor: "#FFF" }}
            id="public-restroom-nyc"
            className={isActiverestroom ? "active" : ""}
            onClick={handleClickrestroom}
            aria-label="Public Restrooms"
          >
            <img
              src="https://www.svgrepo.com/show/87415/toilet-paper.svg"
              width="20px"
              alt="Public Restrooms"
            />
          </MapButton>
        </Box>
      ) : (
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
          <MapButton
            variant="contained"
            sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
            id="restroom-mall-nyc"
            className={isActivemall ? "active" : ""}
            onClick={handleClickmall}
          >
            <img
              src="https://www.svgrepo.com/show/375867/present.svg"
              width="20px"
              alt="Malls"
            />
            <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
              Malls
            </Typography>
          </MapButton>
          <MapButton
            variant="contained"
            sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
            id="restroom-hotel-nyc"
            className={isActivehotel ? "active" : ""}
            onClick={handleClickhotel}
          >
            <img
              src="https://www.svgrepo.com/show/192397/hotel.svg"
              width="20px"
              alt="Hotels"
            />
            <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
              Hotels
            </Typography>
          </MapButton>
          <MapButton
            variant="contained"
            sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
            id="public-restroom-nyc"
            className={isActiverestroom ? "active" : ""}
            onClick={handleClickrestroom}
          >
            <img
              src="https://www.svgrepo.com/show/87415/toilet-paper.svg"
              width="20px"
              alt="Public Restrooms"
            />
            <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
              Public Restrooms
            </Typography>
          </MapButton>
        </Box>
      )}
      <MapButton
        variant="contained"
        sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
        id="get-direction"
      >
        <AssistantDirectionIcon />
        <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
          For Directions
        </Typography>
      </MapButton>
      <MapButton
        variant="contained"
        sx={{ px: 1, py: 0.5, mx: 0.5, backgroundColor: "#FFF" }}
        className="d-none"
        id="end-direction"
      >
        <CancelIcon />
        <Typography variant="caption" sx={{ px: 1, fontWeight: 900 }}>
        End Directions
        </Typography>
      </MapButton>
      <Box ref={mapContainer} className="map-container"></Box>
    </Box>
  );
};

export default Map;