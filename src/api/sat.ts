import { TLE } from "../interfaces/tle";

/**
 * Get the TLE data for a satellite from the NORAD catalog
 * @param satId - Satellite ID from the NORAD catalog
 * @returns Promise<TLE> - TLE data for the satellite
 */
export async function getSatTLE(satId: string): Promise<TLE> {
    if (!satId) {
        throw new Error("Satellite ID is required");
    }

    const response = await fetch(`/api/satellite/${satId}`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to fetch satellite data' }));
        throw new Error(error.error || 'Failed to fetch satellite data');
    }

    return response.json();
}