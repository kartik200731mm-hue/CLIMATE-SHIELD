import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { searchLocations } from '../services/api';

export default function LocationSearchBar({ onSelectLocation, isSearching }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchLocations(query);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (loc) => {
    setQuery(loc.displayLabel);
    setIsOpen(false);
    onSelectLocation(loc);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setQuery('Detecting local coordinates...');
        onSelectLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          name: '',
          country: ''
        });
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err.message);
        alert(`Could not fetch device location (${err.message}). You can search for your city directly in the search bar!`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.5rem 0.85rem',
          backdropFilter: 'var(--glass-blur)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'border-color 0.2s'
        }}
      >
        {loading || isSearching ? (
          <Loader2 size={16} color="var(--primary)" style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <Search size={16} color="var(--text-muted)" />
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any global city (e.g. Ujjain, Tokyo, London)..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            width: '100%',
            fontFamily: 'var(--font-sans)'
          }}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: 0
            }}
          >
            <X size={14} />
          </button>
        )}

        {/* GPS Locate Me Button */}
        <button
          type="button"
          onClick={handleLocateMe}
          title="Detect my local location (GPS)"
          disabled={isLocating || isSearching}
          style={{
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '6px',
            color: 'var(--primary)',
            cursor: isLocating ? 'not-allowed' : 'pointer',
            padding: '4px 9px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            transition: 'all 0.15s',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.22)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.12)';
          }}
        >
          {isLocating ? (
            <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Navigation size={13} />
          )}
          <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
        </button>
      </div>

      {/* Auto-suggest dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border-active)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
            backdropFilter: 'var(--glass-blur)',
            zIndex: 100,
            overflow: 'hidden',
            maxHeight: '260px',
            overflowY: 'auto'
          }}
        >
          {results.map((loc) => (
            <div
              key={loc.id}
              onClick={() => handleSelect(loc)}
              style={{
                padding: '0.65rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <MapPin size={14} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {loc.name}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  {[loc.state, loc.country].filter(Boolean).join(', ')} • {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
