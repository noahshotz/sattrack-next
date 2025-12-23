import createAxiosInstance from "./axiosInstance";
import { TLE } from "../interfaces/tle";

/**
 * Get the TLE data for a satellite from the NORAD catalog
 * @param satId - Satellite ID from the NORAD catalog
 * @returns Promise<TLE> - TLE data for the satellite
 */
export async function getSatTLE(satId: string): Promise<TLE> {
    // Fetch the API key and reverse proxy URL from the API route
    const { apiKey, reverseProxy } = await fetch('/api/satTokens')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch API token');
            }
            return res.json();
        });

    if (!reverseProxy) {
        throw new Error("Reverse Proxy URL is required");
    }
    if (!satId) {
        throw new Error("Satellite ID is required");
    }
    if (!apiKey) {
        throw new Error("API Key is required");
    }

    const axiosInstance = createAxiosInstance(`${reverseProxy}https://api.n2yo.com/rest/v1/satellite/`);

    return axiosInstance.get(`/tle/${satId}/&apiKey=${apiKey}`, {
        headers: {
            'x-requested-with': 'XMLHttpRequest',
            'origin': window.location.origin
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Error: " + error);
            throw error;
        });

}
