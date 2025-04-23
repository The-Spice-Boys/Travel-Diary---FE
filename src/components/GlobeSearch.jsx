import React, { useContext, useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as topojson from 'topojson-client';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/User';

export const GlobeSearch = () => {
  const containerRef = useRef();
  const globeInstance = useRef();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [size, setSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setSize({ width, height: width });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!globeInstance.current) {
      globeInstance.current = Globe()(containerRef.current)
        .globeImageUrl('public/globe-background.svg')
        .backgroundColor('#eee')
        .polygonCapColor(() => '#b4c2c5')
        .polygonSideColor(() => '#fff')
        .polygonStrokeColor(() => '#fff')
        .polygonLabel((d) => `<b>${d.properties.name}</b>`)
        .polygonAltitude(0.01)
        .onPolygonHover((hoveredCountry) => {
          globeInstance.current.polygonCapColor((country) =>
            country === hoveredCountry ? 'rgba(210, 18, 92, 0.7)' : '#b4c2c5'
          );
        })
        .onPolygonClick(({ properties: { name } }) => {
          navigate(`/countries/${name}`);
        });

      globeInstance.current.controls().enableZoom = false;

      fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
        .then((res) => res.json())
        .then((data) => {
          const countries = topojson.feature(
            data,
            data.objects.countries
          ).features;
          globeInstance.current.polygonsData(countries);
        });
    }

    globeInstance.current.width(size.width);
    globeInstance.current.height(size.height);
  }, [size, theme, navigate]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-100"
      style={{
        maxWidth: '600px',
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    />
  );
};
