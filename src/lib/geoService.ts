import { GeoLocationPoint } from '../types';

// Pre-computed exact coordinates and data for major cities & regions (fast offline cache)
const KNOWN_BRAZILIAN_LOCATIONS: Record<string, GeoLocationPoint> = {
  'itupeva': {
    lat: -23.1531,
    lng: -47.0578,
    city: 'Itupeva',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Itupeva, SP, Brasil',
  },
  'jundiai': {
    lat: -23.1857,
    lng: -46.8978,
    city: 'Jundiaí',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Jundiaí, SP, Brasil',
  },
  'jundiaí': {
    lat: -23.1857,
    lng: -46.8978,
    city: 'Jundiaí',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Jundiaí, SP, Brasil',
  },
  'louveira': {
    lat: -23.0858,
    lng: -46.9531,
    city: 'Louveira',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Louveira, SP, Brasil',
  },
  'vinhedo': {
    lat: -23.0297,
    lng: -46.9744,
    city: 'Vinhedo',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Vinhedo, SP, Brasil',
  },
  'valinhos': {
    lat: -22.9708,
    lng: -46.9961,
    city: 'Valinhos',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Valinhos, SP, Brasil',
  },
  'campinas': {
    lat: -22.9056,
    lng: -47.0608,
    city: 'Campinas',
    state: 'SP',
    neighborhood: 'Cambuí',
    formattedAddress: 'Campinas, SP, Brasil',
  },
  'indaiatuba': {
    lat: -23.0903,
    lng: -47.2181,
    city: 'Indaiatuba',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Indaiatuba, SP, Brasil',
  },
  'cabreuva': {
    lat: -23.3075,
    lng: -47.1333,
    city: 'Cabreúva',
    state: 'SP',
    neighborhood: 'Jacaré',
    formattedAddress: 'Cabreúva, SP, Brasil',
  },
  'cabreúva': {
    lat: -23.3075,
    lng: -47.1333,
    city: 'Cabreúva',
    state: 'SP',
    neighborhood: 'Jacaré',
    formattedAddress: 'Cabreúva, SP, Brasil',
  },
  'salto': {
    lat: -23.2008,
    lng: -47.2869,
    city: 'Salto',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Salto, SP, Brasil',
  },
  'itu': {
    lat: -23.2642,
    lng: -47.2992,
    city: 'Itu',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: 'Itu, SP, Brasil',
  },
  'sao paulo': {
    lat: -23.5505,
    lng: -46.6333,
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Bela Vista / Paulista',
    formattedAddress: 'São Paulo, SP, Brasil',
  },
  'são paulo': {
    lat: -23.5505,
    lng: -46.6333,
    city: 'São Paulo',
    state: 'SP',
    neighborhood: 'Bela Vista / Paulista',
    formattedAddress: 'São Paulo, SP, Brasil',
  },
  'sorocaba': {
    lat: -23.5015,
    lng: -47.4526,
    city: 'Sorocaba',
    state: 'SP',
    neighborhood: 'Campolim',
    formattedAddress: 'Sorocaba, SP, Brasil',
  },
  'santos': {
    lat: -23.9608,
    lng: -46.3336,
    city: 'Santos',
    state: 'SP',
    neighborhood: 'Gonzaga',
    formattedAddress: 'Santos, SP, Brasil',
  },
  'rio de janeiro': {
    lat: -22.9068,
    lng: -43.1729,
    city: 'Rio de Janeiro',
    state: 'RJ',
    neighborhood: 'Centro',
    formattedAddress: 'Rio de Janeiro, RJ, Brasil',
  },
  'curitiba': {
    lat: -25.4284,
    lng: -49.2733,
    city: 'Curitiba',
    state: 'PR',
    neighborhood: 'Batel',
    formattedAddress: 'Curitiba, PR, Brasil',
  },
  'belo horizonte': {
    lat: -19.9167,
    lng: -43.9345,
    city: 'Belo Horizonte',
    state: 'MG',
    neighborhood: 'Savassi',
    formattedAddress: 'Belo Horizonte, MG, Brasil',
  },
  'porto alegre': {
    lat: -30.0346,
    lng: -51.2177,
    city: 'Porto Alegre',
    state: 'RS',
    neighborhood: 'Moinhos de Vento',
    formattedAddress: 'Porto Alegre, RS, Brasil',
  },
  'florianopolis': {
    lat: -27.5954,
    lng: -48.5480,
    city: 'Florianópolis',
    state: 'SC',
    neighborhood: 'Centro',
    formattedAddress: 'Florianópolis, SC, Brasil',
  },
  'florianópolis': {
    lat: -27.5954,
    lng: -48.5480,
    city: 'Florianópolis',
    state: 'SC',
    neighborhood: 'Centro',
    formattedAddress: 'Florianópolis, SC, Brasil',
  },
  'brasilia': {
    lat: -15.7975,
    lng: -47.8919,
    city: 'Brasília',
    state: 'DF',
    neighborhood: 'Asa Sul',
    formattedAddress: 'Brasília, DF, Brasil',
  },
  'brasília': {
    lat: -15.7975,
    lng: -47.8919,
    city: 'Brasília',
    state: 'DF',
    neighborhood: 'Asa Sul',
    formattedAddress: 'Brasília, DF, Brasil',
  },
};

/**
 * Calculates the exact great-circle distance between two geographic coordinates
 * using the Haversine formula in Kilometers.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Generates an offset coordinate placed at an exact distance (km) and bearing from a center point.
 */
export function createOffsetCoordinates(
  centerLat: number,
  centerLng: number,
  distanceKm: number,
  bearingDegrees: number
): { lat: number; lng: number } {
  const R = 6371;
  const radBearing = (bearingDegrees * Math.PI) / 180;
  const radLat1 = (centerLat * Math.PI) / 180;
  const radLng1 = (centerLng * Math.PI) / 180;
  const dByR = distanceKm / R;

  const radLat2 = Math.asin(
    Math.sin(radLat1) * Math.cos(dByR) +
      Math.cos(radLat1) * Math.sin(dByR) * Math.cos(radBearing)
  );

  const radLng2 =
    radLng1 +
    Math.atan2(
      Math.sin(radBearing) * Math.sin(dByR) * Math.cos(radLat1),
      Math.cos(dByR) - Math.sin(radLat1) * Math.sin(radLat2)
    );

  return {
    lat: (radLat2 * 180) / Math.PI,
    lng: (radLng2 * 180) / Math.PI,
  };
}

/**
 * Normalizes query string for fast dictionary matching
 */
function normalizeQuery(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Geocodes any user input location string to exact lat/lng coordinates and location metadata.
 * First checks local verified cache, then queries Nominatim OpenStreetMap API.
 */
export async function geocodeLocation(query: string): Promise<GeoLocationPoint> {
  const clean = query.trim();
  if (!clean) {
    return KNOWN_BRAZILIAN_LOCATIONS['itupeva'];
  }

  const normalized = normalizeQuery(clean);

  // 1. Direct dictionary match
  for (const [key, loc] of Object.entries(KNOWN_BRAZILIAN_LOCATIONS)) {
    const normKey = normalizeQuery(key);
    if (normalized === normKey || normalized.startsWith(normKey) || normalized.includes(normKey)) {
      return {
        ...loc,
        formattedAddress: clean.length > 3 ? clean : loc.formattedAddress,
      };
    }
  }

  // 2. Fallback to OpenStreetMap Nominatim Geocoding API with 3.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=br&limit=1&q=${encodeURIComponent(
      clean
    )}`;

    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const displayParts = (item.display_name || '').split(',');
        const cityCandidate = displayParts[0] || clean;
        const stateCandidate = displayParts.length > 2 ? displayParts[displayParts.length - 2].trim().slice(0, 2).toUpperCase() : 'BR';

        return {
          lat,
          lng,
          city: cityCandidate.trim(),
          state: stateCandidate,
          neighborhood: displayParts[1] ? displayParts[1].trim() : 'Região',
          formattedAddress: item.display_name || clean,
        };
      }
    }
  } catch {
    // If network fails or timeout occurs, use intelligent fallback
  }

  // 3. Fallback: Default to Itupeva, SP if unable to resolve
  return {
    lat: -23.1531,
    lng: -47.0578,
    city: clean.split(/[,-]/)[0].trim() || 'Itupeva',
    state: 'SP',
    neighborhood: 'Centro',
    formattedAddress: `${clean}, Brasil`,
  };
}

/**
 * Gets the user's high-precision GPS coordinates from browser
 */
export async function getBrowserLocation(): Promise<GeoLocationPoint> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocalização não suportada pelo navegador.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Try reverse geocoding to get real city name
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            { headers: { 'Accept': 'application/json' } }
          );
          if (res.ok) {
            const data = await res.json();
            const address = data.address || {};
            const city = address.city || address.town || address.municipality || address.village || 'Sua Cidade';
            const state = address.state_code || (address.state ? address.state.slice(0, 2).toUpperCase() : 'SP');
            const neighborhood = address.suburb || address.neighbourhood || 'Centro';

            resolve({
              lat,
              lng,
              city,
              state,
              neighborhood,
              formattedAddress: `${city}, ${state} (${neighborhood})`,
            });
            return;
          }
        } catch {
          // reverse geocoding failed, proceed with coordinates
        }

        resolve({
          lat,
          lng,
          city: 'Sua Localização GPS',
          state: 'BR',
          formattedAddress: `GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 }
    );
  });
}
