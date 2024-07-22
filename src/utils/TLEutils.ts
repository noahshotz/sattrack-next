import * as satellite from 'satellite.js';
import { TLE } from '../interfaces/tle';

// Function to split TLE into two lines
function splitTLE(TLE: string): { line1: string, line2: string } {
    const lines = TLE.split('\r\n');
    if (lines.length !== 2) {
        throw new Error('TLE data is not in the correct format');
    }
    return {
        line1: lines[0].trim(),
        line2: lines[1].trim()
    };
}

export function calculateOrbit(TLE: TLE, numPoints: number = 90): number[][] {
    try {
        const { line1, line2 } = splitTLE(TLE.tle);
        const satrec = satellite.twoline2satrec(line1, line2);
        const positions: number[][] = [];

        const timeStep = 90 / numPoints; // 90 minutes per orbit

        for (let i = 0; i < numPoints; i++) {
            const time = new Date();
            time.setSeconds(time.getSeconds() + i * timeStep * 60);

            const positionAndVelocity = satellite.propagate(satrec, time);
            const positionGd = satellite.eciToGeodetic(positionAndVelocity.position as satellite.EciVec3<number>, satellite.gstime(time));
            const longitude = satellite.degreesLong(positionGd.longitude);
            const latitude = satellite.degreesLat(positionGd.latitude);

            positions.push([longitude, latitude]);
        }

        // Adjust longitudes to handle 180th meridian crossing
        for (let i = 1; i < positions.length; i++) {
            const prevLng = positions[i - 1][0];
            let currLng = positions[i][0];

            if (Math.abs(currLng - prevLng) > 180) {
                if (currLng > prevLng) {
                    currLng -= 360;
                } else {
                    currLng += 360;
                }
                positions[i][0] = currLng;
            }
        }

        // Normalize longitudes back to the range [-180, 180]
        for (let i = 0; i < positions.length; i++) {
            while (positions[i][0] < -180) {
                positions[i][0] += 360;
            }
            while (positions[i][0] > 180) {
                positions[i][0] -= 360;
            }
        }

        return positions;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error processing TLE: ${TLE.tle}. Error: ${error.message}`);
            throw error; // Rethrow the error to make it testable
        } else {
            console.error(`Unexpected error processing TLE: ${TLE.tle}`);
            throw new Error('Unexpected error processing TLE'); // Throw a new error for unknown errors
        }
    }
}

export function calculateCurrentSpeed(TLE: TLE): number {
    try {
        const { line1, line2 } = splitTLE(TLE.tle);
        const satrec = satellite.twoline2satrec(line1, line2);

        const time = new Date();

        const positionAndVelocity = satellite.propagate(satrec, time);
        const velocity = positionAndVelocity.velocity as satellite.EciVec3<number>;

        // Calculate speed in km/s
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

        return speed;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error processing TLE: ${TLE.tle}. Error: ${error.message}`);
        } else {
            console.error(`Unexpected error processing TLE: ${TLE.tle}`);
        }
        return NaN;
    }
}

// Function to extract classification from the first line of TLE
export function getClassification(TLE: TLE): string {
    try {
        const { line1 } = splitTLE(TLE.tle);
        const classification = line1.charAt(7);
        // Lookup table for classification: U = Unclassified, C = Classified, S = Secret
        switch (classification) {
            case 'U':
                return 'Unclassified';
            case 'C':
                return 'Classified';
            case 'S':
                return 'Secret';
            default:
                return 'No classification found';
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error processing TLE: ${TLE.tle}. Error: ${error.message}`);
        } else {
            console.error(`Unexpected error processing TLE: ${TLE.tle}`);
        }
        return 'No classification found';
    }
}