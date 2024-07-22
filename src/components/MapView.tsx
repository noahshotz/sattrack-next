"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes"
import { Map, Source, Layer, NavigationControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTLEData } from '../context/TLEContext';
import { OrbitData } from '../interfaces/tle';
import { calculateCurrentSpeed, calculateOrbit, getClassification } from '../utils/TLEutils';
import { orbitLayerPassive } from '../consts/mapstyles';
import { createOrbitGeometry } from '../utils/geometry';
import { Preloader } from './Preloader';
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import SatelliteMarker from './SatelliteMarker';
import { StatusBadge } from './StatusBadge';
//import CustomOverlay from './CustomOverlay';
import { ProjectionController } from './ProjectionController';
import { ProjectionType } from '../interfaces/proj';
import { ModeToggle } from './ModeToggle';

export const MapView: React.FC = () => {

    // state for Mapbox token
    const [mapboxToken, setMapboxToken] = useState<string | null>(null);

    const { theme } = useTheme()

    const lightMapStyle = "mapbox://styles/egenusmax/clyx2z9dj009i01pff5ws9ii8"
    const darkMapStyle = "mapbox://styles/egenusmax/clxxufklp000f01qpa6my5vuu"

    // get TLE data and countdown from context
    const { tleData, countdown, progress } = useTLEData();

    // set initial coordinates for map
    const { latitude, longitude } = { latitude: 52, longitude: 13 };

    // set states
    const [isLoading, setIsLoading] = useState(true);
    const [orbits, setOrbits] = useState<OrbitData[]>([]);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [projection, setProjection] = useState<ProjectionType>("globe");

    // fetch Mapbox token on mount
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch('/api/mapboxToken');
                const data = await response.json();
                setMapboxToken(data.token);
            } catch (error) {
                console.error('Error fetching Mapbox token:', error);
            }
        };

        fetchToken();
    }, []);

    /**
     * Calculate orbit data and create geometry for each satellite
     */
    useEffect(() => {
        if (tleData && tleData.length > 0) {
            setIsLoading(true);
            const orbitData = tleData.map((tle) => {
                const orbit = calculateOrbit(tle);
                const velocity = calculateCurrentSpeed(tle);
                const classification = getClassification(tle);
                const [orbitA, orbitB] = createOrbitGeometry(orbit);

                return {
                    id: tle.info.satid.toString(),
                    name: tle.info.satname,
                    classification: classification,
                    velocity: velocity,
                    lat: orbit[0][1],
                    lng: orbit[0][0],
                    orbitA,
                    orbitB,
                };
            });

            setOrbits(orbitData);
            setIsOnline(true);
            setIsLoading(false);
        }
    }, [tleData]);

    // display loading screen while waiting for data
    if (isLoading || !mapboxToken) {
        return (
            <Preloader progress={progress} />
        )
    }

    return (
        <div className="w-full h-[100vh]">
            <div className="absolute z-10 m-2">
                <StatusBadge isOnline={isOnline} />
                <p className="mt-1">Next update in: {countdown} seconds</p>
            </div>
            <div className="absolute flex flex-row gap-2 items-center z-10 m-2 right-0">
                <ModeToggle />
                <ProjectionController
                    projection={projection}
                    setProjection={setProjection}
                />
            </div>
            <Map
                projection={{
                    /** 
                     * available projections: albers, equalEarth, equirectangular, lambertConformalConic, mercator, naturalEarth, winkelTripel
                     */
                    name: projection,
                }}
                initialViewState={{
                    longitude,
                    latitude,
                    zoom: 3,
                }}
                attributionControl={false}
                mapStyle={theme === "dark" ? darkMapStyle : lightMapStyle}
                mapboxAccessToken={mapboxToken}
            >

                {orbits.map((orbit) => (
                    <React.Fragment key={orbit.id}>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Marker latitude={orbit.lat} longitude={orbit.lng}>
                                    <SatelliteMarker sat={orbit} />
                                </Marker>
                            </DrawerTrigger>
                            <DrawerContent className="focus:outline-none">
                                <div className="mx-auto w-full max-w-sm mb-10">
                                    <DrawerHeader>
                                        <DrawerTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                                            {orbit.name}
                                        </DrawerTitle>
                                        <h4 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 text-center">ID {orbit.id}</h4>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <p>Classification: {orbit.classification}</p>
                                        <p>Position: {orbit.lat.toFixed(6) + ", " + orbit.lng.toFixed(6)}</p>
                                        <p>Velocity: {orbit.velocity.toFixed(2)} km/s</p>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                        <Source type="geojson" data={orbit.orbitA}>
                            <Layer id={`lineA-${orbit.id}`} {...orbitLayerPassive} />
                        </Source>
                        <Source type="geojson" data={orbit.orbitB}>
                            <Layer id={`lineB-${orbit.id}`} {...orbitLayerPassive} />
                        </Source>
                    </React.Fragment>
                ))}
            </Map>
        </div>
    );
};