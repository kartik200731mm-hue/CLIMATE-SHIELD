// Frontend API Client for ClimateShield Express Backend
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined') {
    // If running in browser on localhost or 127.0.0.1, connect to local backend port 5000
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    // On Vercel, production, and any other device/phone, use relative /api
    return '/api';
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

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
 * Delete single history entry
 */
export async function deleteHistoryRecord(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/history/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (error) {
    console.error('Failed to delete history record:', error);
    return false;
  }
}

/**
 * Clear all history entries
 */
export async function clearAllHistoryRecords() {
  try {
    const res = await fetch(`${API_BASE_URL}/history`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (error) {
    console.error('Failed to clear history records:', error);
    return false;
  }
}

/**
 * User Registration API
 */
export async function apiRegister({ name, email, password, preferences }) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, preferences })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data.data;
}

/**
 * User Login API
 */
export async function apiLogin({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data.data;
}

/**
 * Update User Preferences API
 */
export async function apiUpdatePreferences(preferences, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  
  const res = await fetch(`${API_BASE_URL}/auth/preferences`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ preferences })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update preferences');
  return data.data;
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

/**
 * Execute a Sovereign Intelligence Agent Node with Grounded Telemetry
 */
export async function executeAgentAnalysis({ agentId, telemetry, customQuery }) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/agent-analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, telemetry, customQuery })
    });
    if (!res.ok) throw new Error(`Agent execution failed with status: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Sovereign agent [${agentId}] error:`, error);
    throw error;
  }
}
