import { Feature, LineString } from "geojson";

/**
 * TLE data interface
 */
export interface TLE {
    info: {
        satid: number;
        satname: string;
        transactionscount: number;
    },
    tle: string;
}

/**
 * Prepared orbit data from TLE data
 */
export interface OrbitData {
    id: string;
    name: string;
    classification: string;
    velocity: number;
    lat: number;
    lng: number;
    // Two orbits are needed to create a line that crosses the 180th meridian
    orbitA: Feature<LineString>;
    orbitB: Feature<LineString>;
}