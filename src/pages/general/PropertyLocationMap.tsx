import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point, Circle as CircleGeom } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';

interface PropertyLocationMapProps {
  lat: number;
  lon: number;
  propertyTitle: string;
  propertyAddress: string;
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  lat,
  lon,
  propertyTitle,
  propertyAddress
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const propertyCoords = fromLonLat([lon, lat]);

    // Create marker for property
    const propertyMarker = new Feature({
      geometry: new Point(propertyCoords)
    });

    // Style for property marker (red pin)
    propertyMarker.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
              <path fill="%23DC2626" stroke="%23fff" stroke-width="2" d="M16 0C9.373 0 4 5.373 4 12c0 9 12 26 12 26s12-17 12-26c0-6.627-5.373-12-12-12z"/>
              <circle cx="16" cy="12" r="6" fill="%23fff"/>
            </svg>
          `),
          scale: 1.2
        })
      })
    );

    // Create circle showing area
    const areaCircle = new Feature({
      geometry: new CircleGeom(propertyCoords, 500)
    });

    areaCircle.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(221, 199, 187, 0.1)'
        }),
        stroke: new Stroke({
          color: '#DDC7BB',
          width: 2
        })
      })
    );

    // Create vector source and layer
    const vectorSource = new VectorSource({
      features: [areaCircle, propertyMarker]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Initialize map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: propertyCoords,
        zoom: 15
      }),
      controls: []
    });

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [lat, lon, propertyTitle, propertyAddress]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
      
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 max-w-xs z-10">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          📍 {propertyTitle}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {propertyAddress}
        </p>
        <button
          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank')}
          className="mt-2 text-xs text-blue-600 hover:underline font-medium"
        >
          Get Directions →
        </button>
      </div>
    </div>
  );
};

export default PropertyLocationMap;