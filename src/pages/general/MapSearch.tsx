import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { MapBrowserEvent } from 'ol';
import 'ol/ol.css';

interface MapSearchProps {
  onAreaClick?: (coordinates: [number, number], address: string) => void;
  properties?: Array<{
    id: string;
    lat: number;
    lon: number;
    title: string;
    price: string;
  }>;
}

const MapSearch: React.FC<MapSearchProps> = ({ onAreaClick, properties }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  useEffect(() => {
    if (!mapRef.current) return;

    // Create marker layer
    const markerSource = new VectorSource();
    const markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#DDC7BB' }),
          stroke: new Stroke({ color: '#fff', width: 2 }),
        }),
      }),
    });

    // Initialize map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        markerLayer,
      ],
      view: new View({
        center: fromLonLat([-74.006, 40.7128]), // New York coordinates
        zoom: 12,
      }),
    });

    mapInstanceRef.current = map;

    // Add property markers if provided
    if (properties && properties.length > 0) {
      properties.forEach((property) => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([property.lon, property.lat])),
          data: property,
        });
        markerSource.addFeature(marker);
      });
    }

    // Handle map clicks
    map.on('click', async (event: MapBrowserEvent<UIEvent>) => {
      const coords = toLonLat(event.coordinate);
      const [lon, lat] = coords;

      // Reverse geocoding (you'll need an API key for production)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        
        setSelectedLocation(address);
        
        // Clear previous markers
        markerSource.clear();
        
        // Add new marker
        const marker = new Feature({
          geometry: new Point(event.coordinate),
        });
        markerSource.addFeature(marker);

        // Callback with coordinates and address
        if (onAreaClick) {
          onAreaClick([lon, lat], address);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        const fallbackAddress = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        setSelectedLocation(fallbackAddress);
        if (onAreaClick) {
          onAreaClick([lon, lat], fallbackAddress);
        }
      }
    });

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [onAreaClick, properties]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
      {selectedLocation && (
        <div className="absolute top-4 left-4 bg-secondary shadow-lg rounded-lg p-4 max-w-sm z-10">
          <p className="text-sm font-semibold text-primary mb-1">Selected Location:</p>
          <p className="text-xs text-secondary">{selectedLocation}</p>
        </div>
      )}
    </div>
  );
};

export default MapSearch;