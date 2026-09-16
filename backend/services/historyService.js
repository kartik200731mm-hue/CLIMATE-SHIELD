import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

const INITIAL_HISTORY = [
  {
    id: 'hist-1',
    timestamp: '2026-09-15T09:30:00Z',
    location: 'Connaught Place, New Delhi',
    mode: 'Fitness',
    activity: 'Outdoor Exercise',
    overallScore: 84,
    status: 'SEVERE',
    verdict: 'NOT_RECOMMENDED',
    aqi: 260,
    temp: 39
  },
  {
    id: 'hist-2',
    timestamp: '2026-09-14T17:15:00Z',
    location: 'Bandra West, Mumbai',
    mode: 'Daily Commuter',
    activity: 'City Commute',
    overallScore: 72,
    status: 'HIGH',
    verdict: 'NOT_RECOMMENDED',
    aqi: 45,
    temp: 29
  },
  {
    id: 'hist-3',
    timestamp: '2026-09-14T08:00:00Z',
    location: 'Indiranagar, Bengaluru',
    mode: 'Student',
    activity: 'College / School',
    overallScore: 24,
    status: 'LOW',
    verdict: 'RECOMMENDED',
    aqi: 35,
    temp: 24
  }
];

/**
 * Ensures data directory and history file exist
 */
const ensureStorage = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(INITIAL_HISTORY, null, 2), 'utf-8');
  }
};

/**
 * Retrieve all history audit entries
 */
export const getAllHistory = () => {
  try {
    ensureStorage();
    const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('[historyService Read Error]', error.message);
    return INITIAL_HISTORY;
  }
};

/**
 * Add a new evaluation to history audit log
 */
export const addHistoryItem = (entry) => {
  try {
    ensureStorage();
    const history = getAllHistory();
    const newItem = {
      id: `hist-${Date.now()}`,
      timestamp: entry.timestamp || new Date().toISOString(),
      location: entry.location || 'Selected Location',
      mode: entry.mode || 'Student',
      activity: entry.activity || 'General',
      overallScore: entry.overallScore ?? 50,
      status: entry.status || 'MODERATE',
      verdict: entry.verdict || 'CAUTION',
      aqi: entry.aqi ?? 50,
      temp: entry.temp ?? 25
    };

    // Keep newest items on top, cap at 50 entries
    const updated = [newItem, ...history].slice(0, 50);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return newItem;
  } catch (error) {
    console.error('[historyService Write Error]', error.message);
    throw new Error('Failed to record history entry');
  }
};

/**
 * Delete a history entry by id
 */
export const deleteHistoryItem = (id) => {
  try {
    ensureStorage();
    const history = getAllHistory();
    const updated = history.filter((item) => item.id !== id);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('[historyService Delete Error]', error.message);
    return false;
  }
};

/**
 * Clear all history entries
 */
export const clearHistory = () => {
  try {
    ensureStorage();
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([], null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('[historyService Clear Error]', error.message);
    return false;
  }
};
