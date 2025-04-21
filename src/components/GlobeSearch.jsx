import React, { useContext, useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as topojson from "topojson-client";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/User";

export const GlobeSearch = () => {
  const globeEl = useRef();
  const navigate = useNavigate();
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl("public/Solid_blue.svg.png")
      .backgroundColor(theme)
      .polygonCapColor(() => "rgba(7, 163, 20, 0.99)")
      .polygonSideColor(() => "rgba(0, 100, 255, 0.05)")
      .polygonStrokeColor(() => "#111")
      .polygonLabel((d) => `<b>${d.properties.name}</b>`)
      .polygonAltitude(0.01)
      .width(500)
      .height(500)
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
      className="globe d-flex justify-content-center align-items-center mb-0"
      ref={globeEl}
      style={{
        padding: '1px',       
        borderRadius: '50%',     
        overflow: 'hidden',     
        // backgroundColor: 'red',  
        // display: 'flex',   
        // alignItems: 'center',
        // justifyContent: 'center',
       }}
    ></div>
  );
};
