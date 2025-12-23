import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ satId: string }> }
) {
    const { satId } = await params;
    const apiKey = process.env.N2YO_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'API key not configured' },
            { status: 500 }
        );
    }

    if (!satId) {
        return NextResponse.json(
            { error: 'Satellite ID is required' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(
            `https://api.n2yo.com/rest/v1/satellite/tle/${satId}/&apiKey=${apiKey}`
        );
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching satellite data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch satellite data' },
            { status: 500 }
        );
    }
}