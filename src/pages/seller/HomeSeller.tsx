import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Cpu, Monitor, Music, Home, Calendar, Key, Check, ArrowRight, Building, MapPin, Bed, Square, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

const HomeSellerPage: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All Properties");

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([-74.006, 40.7128]), // New York coordinates
          zoom: 10,
        }),
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
      }
    };
  }, []);

  // Navigate to search page with query
  const handleSearchClick = () => {
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}&type=${selectedPropertyType}`);
    } else {
      navigate(`/search?type=${selectedPropertyType}`);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handlePropertyTypeClick = (type: string) => {
    console.log(`Property type clicked: ${type}`);
    setSelectedPropertyType(type);
    // Navigate immediately to search with selected type
    const query = searchInput.trim() ? `?q=${encodeURIComponent(searchInput)}&type=${type}` : `?type=${type}`;
    navigate(`/search${query}`);
  };

  const handleGetStartedClick = (action: string) => {
    console.log(`Get Started clicked for: ${action}`);
    // Future: Navigate to respective flow
  };

  const handleLearnMoreClick = () => {
    console.log('Learn More button clicked');
    // Future: Navigate to about page or show more info
  };

  const handleLocationClick = (location: string) => {
    console.log(`Location clicked: ${location}`);
    // Navigate to search with location filter
    navigate(`/search?q=${encodeURIComponent(location)}&type=All Properties`);
  };

  const handlePropertySignUpClick = (property: string) => {
    console.log(`Property sign up clicked: ${property}`);
    // Future: Navigate to property details or sign up flow
  };

  return (
    <>
      <section
        className="bg-cover bg-center bg-no-repeat py-20"
        style={{ backgroundImage: "url('./homeSeller.png')" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center rounded-lg p-6">
          <button 
            onClick={() => console.log('Guide Your Home button clicked')}
            className="px-4 py-1 border border-custom rounded-full text-sm mb-4 btn-primary hover:bg-accent-hover transition"
          >
            LET US GUIDE YOUR HOME
          </button>
          <p className="text-secondary mb-2">
            We've more than 745,000 apartments, place & plot.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Find Your Perfect Home
          </h1>

          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Enter Name, Keywords..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-full border border-custom py-3 px-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent bg-secondary text-primary"
              />
              <button 
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent p-3 rounded-full hover:bg-accent-hover transition"
              >
                <Search className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => handlePropertyTypeClick('All Properties')}
              className={`px-4 py-2 border border-custom rounded-full hover:bg-accent-hover transition ${
                selectedPropertyType === 'All Properties' ? 'bg-accent' : 'btn-primary'
              }`}
            >
              All Properties
            </button>
            <button 
              onClick={() => handlePropertyTypeClick('For Sale')}
              className={`px-4 py-2 border border-custom rounded-full hover:bg-accent-hover transition ${
                selectedPropertyType === 'For Sale' ? 'bg-accent' : 'btn-primary'
              }`}
            >
              For Sale
            </button>
            <button 
              onClick={() => handlePropertyTypeClick('For Rent')}
              className={`px-4 py-2 border border-custom rounded-full hover:bg-accent-hover transition ${
                selectedPropertyType === 'For Rent' ? 'bg-accent' : 'btn-primary'
              }`}
            >
              For Rent
            </button>
          </div>
        </div>
      </section>

      {/* Rest of your sections remain the same... */}
      <section
        className="bg-cover bg-center py-16 bg-secondary"
        style={{ backgroundImage: "url('/mnt/data/6e420e8b-f118-48de-b3ae-7f92f6c49269.png')" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-primary">
          <p className="mb-8 text-sm md:text-base text-secondary">
            Thousands of world's leading companies trust Space
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 accent">
            <Cpu className="h-10 w-10" />
            <Monitor className="h-10 w-10" />
            <Music className="h-10 w-10" />
          </div>
        </div>
      </section>
      
      {/* Find Your Dream House Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Find Your Dream House as Easy as 1,2,3
          </h2>
          <p className="text-secondary mb-16 max-w-md mx-auto">
            Lorem ipsum dolor sit amet
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                1. Search for you favorite house in your location
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                Pellentesque egestas elementum egestas faucibus sem.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                2. Make a visit appointment with one of your agents
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                Pellentesque egestas elementum egestas faucibus sem.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-accent rounded-full p-6 mb-6 w-20 h-20 flex items-center justify-center">
                <Key className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                3. Get your dream house in a month, or less
              </h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">
                Pellentesque egestas elementum egestas faucibus sem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties by Area Section - with navigation */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Properties by Area
            </h2>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['New York', 'San Diego', 'Arizona', 'Miami', 'Los Angeles', 'Hawaii', 'Florida', 'Chicago', 'Washington'].map((location, idx) => (
              <div 
                key={idx}
                onClick={() => handleLocationClick(location)}
                className="bg-secondary rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-accent/40 to-accent/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">{location}</h3>
                    <p className="text-secondary text-sm">{Math.floor(10)} Properties</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other sections remain the same... */}
    </>
  );
};

export default HomeSellerPage;