import React, { useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { statesData } from "../Data/PolygonData";
import { markers } from "../Data/MarkerData";
import Control from "react-leaflet-custom-control";
import { Button } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import mapsstyle from "./Maps.module.css";
import DensityCard from "../Card/DensityCard";

function Maps() {
  const [polygon, setpolygon] = useState(false);
  const [den, setden] = useState([]);
  const [statename, setstatename] = useState([]);

  const customIcon = new Icon({
    iconUrl: require("../Assets/location.png"),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      iconSize: point(0, 0, false),
    });
  };

  const handleLayerClick = () => {
    setpolygon(!polygon);
    setden([]);
    setstatename([]);
  };

  return (
    <MapContainer center={[39.74856460097633, -102.37783931929468]} zoom={4}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      {polygon
        ? statesData.features.map((state) => {
            const id = state.id;
            const coordinates = state.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ]);
            const density = state.properties.density;
            const name = state.properties.name;
            return (
              <Polygon
                key={id}
                pathOptions={{
                  fillColor: "#FD8D3C",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: "white",
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 5,
                      dashArray: "",
                      color: "#666",
                      fillColor: "#e85a5a",
                    });
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 2,
                      dashArray: "3",
                      color: "white",
                      fillColor: "#FD8D3C",
                    });
                  },
                  click: () => {
                    setden(density);
                    setstatename(name);
                  },
                }}
              />
            );
          })
        : null}
      <Control prepend position="topright">
        <Button color="inherit" className={mapsstyle.button}>
          <LayersIcon className={mapsstyle.layer} onClick={handleLayerClick} />
        </Button>
      </Control>
      <Control prepend position="topleft">
        {polygon ? <DensityCard den={den} statename={statename} /> : null}
      </Control>
    </MapContainer>
  );
}

export default Maps;
