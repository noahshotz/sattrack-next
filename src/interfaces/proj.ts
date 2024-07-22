/**
 * This file contains the interfaces and types related to the projection of the map.
 * For more information, visit: https://visgl.github.io/react-map-gl/docs/api-reference/map
 */

export type ProjectionType = "globe" | "albers" | "equalEarth" | "equirectangular" | "lambertConformalConic" | "mercator" | "naturalEarth" | "winkelTripel"

export const ProjectionTypes = [
    {
        identifier: "globe",
        label: "Globe"
    },
    {
        identifier: "albers",
        label: "Albers"
    },
    {
        identifier: "equalEarth",
        label: "Equal Earth"
    },
    {
        identifier: "equirectangular",
        label: "Equirectangular"
    },
    {
        identifier: "lambertConformalConic",
        label: "Lambert Conformal Conic"
    },
    {
        identifier: "mercator",
        label: "Mercator"
    },
    {
        identifier: "naturalEarth",
        label: "Natural Earth"
    },
    {
        identifier: "winkelTripel",
        label: "Winkel Tripel"
    }
] as const