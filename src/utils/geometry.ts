import { Feature, LineString } from 'geojson';
export function createOrbitGeometry(orbit: number[][]): Feature<LineString>[] {
    // Create a LineString GeoJSON object from the orbit data
    const geometry = {
        'type': 'LineString',
        'coordinates': orbit
    };

    let firstHalf = {
        'type': 'LineString',
        'coordinates': orbit
    };

    let secondHalf = {
        'type': 'LineString',
        'coordinates': orbit
    };

    // Find the crossing points
    let crossIndex = -1;
    for (let i = 1; i < geometry.coordinates.length; i++) {
        const startLng = geometry.coordinates[i - 1][0];
        const endLng = geometry.coordinates[i][0];

        if (Math.abs(endLng - startLng) >= 180) {
            crossIndex = i;
            break;
        }
    }

    // Apply the adjustment logic if a crossing is found
    if (crossIndex !== -1) {
        const startLng = geometry.coordinates[crossIndex - 1][0];
        const endLng = geometry.coordinates[crossIndex][0];

        if (endLng - startLng >= 180) {
            geometry.coordinates[crossIndex][0] -= 360;
        } else if (endLng - startLng < 180) {
            geometry.coordinates[crossIndex][0] += 360;
        }

        // split the array at crossIndex
        firstHalf = {
            'type': 'LineString',
            'coordinates': geometry.coordinates.slice(0, crossIndex)
        };
        secondHalf = {
            'type': 'LineString',
            'coordinates': geometry.coordinates.slice(crossIndex + 1)
        };

    }

    // Normalize longitudes back to the range [-180, 180]
    for (let i = 0; i < firstHalf.coordinates.length; i++) {
        while (firstHalf.coordinates[i][0] < -180) {
            firstHalf.coordinates[i][0] += 360;
        }
        while (firstHalf.coordinates[i][0] > 180) {
            firstHalf.coordinates[i][0] -= 360;
        }
    }

    return [
        {
            type: 'Feature',
            geometry: firstHalf as LineString,
            properties: {},
        },
        {
            type: 'Feature',
            geometry: secondHalf as LineString,
            properties: {},
        },
    ];
}