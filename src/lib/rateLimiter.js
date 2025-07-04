export const MAX_DOCS_PER_DAY = 5;
const STORAGE_KEY = 'doc_generation_records';

async function fetchIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('IP fetch failed', error);
    return null;
  }
}

function loadRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function canGenerate() {
  const ip = await fetchIp();
  if (!ip) {
    return true;
  }
  const records = loadRecords();
  const now = Date.now();

  if (!records[ip] || now - records[ip].timestamp > 24 * 60 * 60 * 1000) {
    records[ip] = { count: 0, timestamp: now };
    saveRecords(records);
    return true;
  }

  return records[ip].count < MAX_DOCS_PER_DAY;
}

export async function recordGeneration() {
  const ip = await fetchIp();
  if (!ip) {
    return;
  }
  const records = loadRecords();
  const now = Date.now();

  if (!records[ip] || now - records[ip].timestamp > 24 * 60 * 60 * 1000) {
    records[ip] = { count: 1, timestamp: now };
  } else {
    records[ip].count += 1;
  }

  saveRecords(records);
}
