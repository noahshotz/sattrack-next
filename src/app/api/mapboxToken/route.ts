import { NextResponse } from 'next/server';

export async function GET() {
    const mapboxToken = process.env.MAPBOX_TOKEN;

    if (!mapboxToken) {
        return NextResponse.json(
            { error: 'Mapbox token is not defined' },
            { status: 500 }
        );
    }

    return NextResponse.json({ token: mapboxToken });
}