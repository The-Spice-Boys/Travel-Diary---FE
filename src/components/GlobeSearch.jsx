import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as topojson from 'topojson-client';

export const GlobeSearch = () => {
  const globeEl = useRef();

  useEffect(() => {
    const globe = Globe()(globeEl.current)
      .globeImageUrl('public/Equirectangular_projection_SW.jpg')
      .backgroundColor('#FFF')
      .polygonCapColor(() => 'rgba(255, 255, 255, 0.3)')
      .polygonSideColor(() => 'rgba(0, 100, 255, 0.05)')
      .polygonStrokeColor(() => '#111')
      .polygonLabel((d) => `<b>${d.properties.name}</b>`)
      .polygonAltitude(0.01)
      .onPolygonHover((hoveredCountry) => {
        console.log(hoveredCountry);
        // hoveredCountry = polygon object
        globe.polygonCapColor((country) => {
          // updates polygon colour dynamically according to current polygon being hovered, then back to no update when not hovered
          return country === hoveredCountry
            ? 'rgba(255, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.3)';
        });
      })
      .onPolygonClick((country, evt) => {
        console.log(country.properties.name, evt);
      });

    // Fetch country shape data, simplified low-res border data in topojson format (a way to encode borders?)
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
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
    <div>
      <div ref={globeEl} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
};
