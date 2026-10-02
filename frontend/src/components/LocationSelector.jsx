import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  X, 
  Compass, 
  Check, 
  Navigation,
  Loader2
} from 'lucide-react';
import { searchLocations } from '../services/api';

const POPULAR_CITIES = [
  { name: 'Bhopal', country: 'India', latitude: 23.2599, longitude: 77.4126, state: 'Madhya Pradesh' },
  { name: 'Indore', country: 'India', latitude: 22.7196, longitude: 75.8577, state: 'Madhya Pradesh' },
  { name: 'New Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, state: 'Delhi' },
  { name: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777, state: 'Maharashtra' },
  { name: 'Bengaluru', country: 'India', latitude: 12.9716, longitude: 77.5946, state: 'Karnataka' },
  { name: 'Jaipur', country: 'India', latitude: 26.9124, longitude: 75.7873, state: 'Rajasthan' },
  { name: 'Ujjain', country: 'India', latitude: 23.1765, longitude: 75.7885, state: 'Madhya Pradesh' }
];

export default function LocationSelector({ 
  currentLocation, 
  onSelectLocation, 
  isLoadingWeather = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Handle autocomplete search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchLocations(searchQuery.trim());
        setSearchResults(results || []);
      } catch (err) {
        console.error('Location search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCityPick = (city) => {
    onSelectLocation({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      state: city.admin1 || city.state
    });
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="location-selector-wrap" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        className="location-trigger-btn"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }}
        title="Change Location"
      >
        <MapPin size={16} style={{ color: 'var(--accent)' }} />
        <span className="location-name-label">
          {currentLocation?.name || 'Select Location'}
        </span>
        <ChevronDown size={14} className={`dropdown-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="location-dropdown-panel glass-panel">
          {/* Search Input Box */}
          <div className="location-search-box">
            <Search size={16} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="location-search-input"
              placeholder="Search any global city or coordinates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
            {isSearching && <Loader2 size={16} className="animate-spin" style={{ color: 'var(--accent)' }} />}
          </div>

          {/* Autocomplete Search Results if searching */}
          {searchQuery.trim().length >= 2 ? (
            <div className="search-results-list">
              <span className="dropdown-section-title">SEARCH RESULTS</span>
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="city-result-item"
                    onClick={() => handleCityPick(item)}
                  >
                    <div className="city-info-col">
                      <span className="city-name">{item.name}</span>
                      <span className="city-sub">
                        {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                      </span>
                    </div>
                    <span className="city-coords">
                      {(Number(item.latitude) || 0).toFixed(2)}°, {(Number(item.longitude) || 0).toFixed(2)}°
                    </span>
                  </button>
                ))
              ) : !isSearching ? (
                <div className="no-results-notice">
                  <span>No matching locations found for "{searchQuery}"</span>
                </div>
              ) : null}
            </div>
          ) : (
            /* Quick-Pick Popular Cities */
            <div className="popular-cities-section">
              <span className="dropdown-section-title">STRATEGIC MONITORING HUBS</span>
              <div className="popular-cities-grid">
                {POPULAR_CITIES.map((city) => {
                  const isCurrent = (currentLocation?.name || '').toLowerCase() === (city?.name || '').toLowerCase();
                  return (
                    <button
                      key={city.name}
                      type="button"
                      className={`popular-city-chip ${isCurrent ? 'active' : ''}`}
                      onClick={() => handleCityPick(city)}
                    >
                      <Navigation size={12} className="chip-nav-icon" />
                      <span>{city.name}</span>
                      {isCurrent && <Check size={12} className="check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="location-dropdown-footer">
            <Compass size={12} />
            <span>Open-Meteo High-Resolution Geocoding Engine</span>
          </div>
        </div>
      )}
    </div>
  );
}
