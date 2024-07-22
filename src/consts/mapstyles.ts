import { LayerProps } from 'react-map-gl';
export const orbitLayerPassive: LayerProps = {
    type: 'line',
    layout: {
        "line-cap": "round",
        "line-join": "round",
    },
    paint: {
        'line-color': '#29755b',
        'line-width': 2,
    },
};