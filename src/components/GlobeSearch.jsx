import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as topojson from "topojson-client";
import { useNavigate } from "react-router-dom";

export const GlobeSearch = () => {
  const globeEl = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl("public/Solid_blue.svg.png")
      .backgroundColor("#FFF")
      .polygonCapColor(() => "rgba(7, 163, 20, 0.99)")
      .polygonSideColor(() => "rgba(0, 100, 255, 0.05)")
      .polygonStrokeColor(() => "#111")
      .polygonLabel((d) => `<b>${d.properties.name}</b>`)
      .polygonAltitude(0.01)
      .onPolygonHover((hoveredCountry) => {
        // console.log(hoveredCountry);
        // hoveredCountry = polygon object
        globe.polygonCapColor((country) => {
          // updates polygon colour dynamically according to current polygon being hovered, then back to no update when not hovered
          return country === hoveredCountry
            ? "rgba(255, 0, 0, 0.7)"
            : "rgba(7, 163, 20, 0.99)";
        });
      })
      .onPolygonClick(({ properties: { name } }, evt) => {
        navigate(`/countries/${name}`);
      });

    // Fetch country shape data, simplified low-res border data in topojson format (a way to encode borders?)
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        const countries = topojson.feature(
          data,
          data.objects.countries
        ).features;
        // countries is an array of geoJSON (easier to work with)objects converted from topojson, .countries can be replaced with other things such as land, and .features is the array of geoJSON country objects
        globe.polygonsData(countries); // uses country objects to render the shapes on the globe
      });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      ref={globeEl}
    ></div>
  );
};
