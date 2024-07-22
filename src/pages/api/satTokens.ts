import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.N2YO_API_KEY;
    const reverseProxy = process.env.REVERSE_PROXY;

    if (!apiKey) {
        res.status(500).json({ error: 'API key not defined token is not defined' });
        return;
    }

    if (!reverseProxy) {
        res.status(500).json({ error: 'Reverse Proxy URL is not defined' });
        return;
    }

    res.status(200).json({ apiKey: apiKey, reverseProxy: reverseProxy });
}