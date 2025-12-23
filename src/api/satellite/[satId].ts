import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { satId } = req.query;
    const apiKey = process.env.N2YO_API_KEY;

    if (!apiKey) {
        res.status(500).json({ error: 'API key not configured' });
        return;
    }

    if (!satId || typeof satId !== 'string') {
        res.status(400).json({ error: 'Satellite ID is required' });
        return;
    }

    try {
        const response = await axios.get(
            `https://api.n2yo.com/rest/v1/satellite/tle/${satId}/&apiKey=${apiKey}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        res.status(500).json({ error: 'Failed to fetch satellite data' });
    }
}