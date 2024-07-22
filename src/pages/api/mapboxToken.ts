import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const mapboxToken = process.env.MAPBOX_TOKEN;

    if (!mapboxToken) {
        res.status(500).json({ error: 'Mapbox token is not defined' });
        return;
    }

    res.status(200).json({ token: mapboxToken });
}