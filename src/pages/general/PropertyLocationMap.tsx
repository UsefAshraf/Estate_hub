import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point, Circle as CircleGeom } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Fill, Stroke, Text } from 'ol/style';
import { defaults as defaultControls, FullScreen, Zoom } from 'ol/control';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

interface PropertyLocationMapProps {
  lat: number;
  lon: number;
  propertyTitle: string;
  propertyAddress: string;
  circleRadius?: number; // in meters, default 500
  showCircle?: boolean; // show area circle, default true
  zoom?: number; // initial zoom level, default 15
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  lat,
  lon,
  propertyTitle,
  propertyAddress,
  circleRadius = 500,
  showCircle = true,
  zoom = 15,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    // Validate coordinates
    if (
      !lat || !lon ||
      isNaN(lat) || isNaN(lon) ||
      lat < -90 || lat > 90 ||
      lon < -180 || lon > 180
    ) {
      setError('Invalid coordinates provided');
      setIsLoading(false);
      return;
    }

    try {
      const propertyCoords = fromLonLat([lon, lat]);

      // Create marker for property
      const propertyMarker = new Feature({
        geometry: new Point(propertyCoords),
        name: 'property',
      });

      // Enhanced marker style (red pin with shadow)
      propertyMarker.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                  </filter>
                </defs>
                <path filter="url(#shadow)" fill="%23DC2626" stroke="%23fff" stroke-width="2" 
                  d="M18 0C10.268 0 4 6.268 4 14c0 10.5 14 30 14 30s14-19.5 14-30c0-7.732-6.268-14-14-14z"/>
                <circle cx="18" cy="14" r="6" fill="%23fff"/>
                <circle cx="18" cy="14" r="3" fill="%23DC2626"/>
              </svg>
            `),
            scale: 1.2,
          }),
        })
      );

      const features: Feature[] = [propertyMarker];

      // Create circle showing area (optional)
      if (showCircle) {
        const areaCircle = new Feature({
          geometry: new CircleGeom(propertyCoords, circleRadius),
        });

        areaCircle.setStyle(
          new Style({
            fill: new Fill({
              color: 'rgba(220, 38, 38, 0.08)',
            }),
            stroke: new Stroke({
              color: '#DC2626',
              width: 2,
              lineDash: [10, 5],
            }),
          })
        );

        features.unshift(areaCircle); // Add circle first so marker is on top
      }

      // Create vector source and layer
      const vectorSource = new VectorSource({
        features: features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Create popup overlay
      const popup = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });

      // Initialize map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        overlays: [popup],
        view: new View({
          center: propertyCoords,
          zoom: zoom,
          maxZoom: 19,
          minZoom: 10,
        }),
        controls: defaultControls().extend([
          new FullScreen(),
          new Zoom(),
        ]),
      });

      mapInstance.current = map;

      // Show popup on marker click
      map.on('click', (evt) => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
        if (feature && feature.get('name') === 'property') {
          popup.setPosition(propertyCoords);
        } else {
          popup.setPosition(undefined);
        }
      });

      // Change cursor on hover
      map.on('pointermove', (evt) => {
        const pixel = map.getEventPixel(evt.originalEvent);
        const hit = map.hasFeatureAtPixel(pixel);
        if (mapRef.current) {
          mapRef.current.style.cursor = hit ? 'pointer' : '';
        }
      });

      setIsLoading(false);

      // Cleanup
      return () => {
        map.setTarget(undefined);
        mapInstance.current = null;
      };
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to load map');
      setIsLoading(false);
    }
  }, [lat, lon, propertyTitle, propertyAddress, circleRadius, showCircle, zoom]);

  // Handle recenter
  const handleRecenter = () => {
    if (mapInstance.current) {
      const view = mapInstance.current.getView();
      view.animate({
        center: fromLonLat([lon, lat]),
        zoom: zoom,
        duration: 500,
      });
    }
  };

  // Error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="text-center p-8">
          <div className="text-4xl mb-3">🗺️</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
            Location Not Available
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />

      {/* Popup for marker click */}
      <div
        ref={popupRef}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 max-w-xs hidden popup-overlay"
        style={{ display: 'none' }}
      >
        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          📍 {propertyTitle}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {propertyAddress}
        </p>
      </div>

      {/* Info Card (Bottom Left) */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 max-w-xs z-10 border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1 flex items-center">
          <span className="text-red-600 mr-2">📍</span>
          {propertyTitle}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
          {propertyAddress}
        </p>
        <div className="flex space-x-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
          <a
            href={`https://www.google.com/maps/@${lat},${lon},3a,75y,90t/data=!3m6!1e1`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Street View
          </a>
        </div>
      </div>

      {/* Recenter Button */}
      <button
        onClick={handleRecenter}
        className="absolute top-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-10 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-colors"
        title="Recenter map"
      >
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Coordinates Display (for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {lat.toFixed(6)}, {lon.toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default PropertyLocationMap;