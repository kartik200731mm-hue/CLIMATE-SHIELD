// Frontend API Client for ClimateShield Express Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch live weather and live air quality from Express backend
 */
export async function getLiveWeather(lat, lon, name, country) {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      ...(name && { name }),
      ...(country && { country })
    });

    const res = await fetch(`${API_BASE_URL}/weather?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Weather API responded with status ${res.status}`);
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Failed to fetch live weather from backend:', error);
    throw error;
  }
}

/**
 * Search cities for autocomplete
 */
export async function searchLocations(query) {
  try {
    if (!query || query.trim().length < 2) return [];

    const res = await fetch(`${API_BASE_URL}/weather/search?q=${encodeURIComponent(query.trim())}`);
    if (!res.ok) {
      throw new Error(`Location search responded with status ${res.status}`);
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Failed to search locations:', error);
    return [];
  }
}

/**
 * Evaluate climate risk and generate Gemini AI contextual briefing via backend
 */
export async function evaluateRiskBackend({ weather, airQuality, mode, activity, location, saveToHistory = false }) {
  try {
    const res = await fetch(`${API_BASE_URL}/risk/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weather, airQuality, mode, activity, location, saveToHistory })
    });

    if (!res.ok) {
      throw new Error(`Risk evaluation API error: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('Backend risk evaluation unavailable, using client fallback:', error);
    return null;
  }
}

/**
 * Fetch historical assessment audit records from backend
 */
export async function getHistoryRecords() {
  try {
    const res = await fetch(`${API_BASE_URL}/history`);
    if (!res.ok) throw new Error(`History API returned ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('Could not fetch backend history:', error);
    return null;
  }
}

/**
 * Save assessment record to backend audit log
 */
export async function saveHistoryRecord(record) {
  try {
    const res = await fetch(`${API_BASE_URL}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) throw new Error(`History save API returned ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('Could not save history to backend:', error);
    return null;
  }
}

/**
 * Ask Gemini AI conversational assistant
 */
export async function askAiAdvisor(message, context) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context })
    });
    if (!res.ok) throw new Error(`AI Chat error: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('AI chat request failed:', error);
    throw error;
  }
}
