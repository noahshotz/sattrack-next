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

    