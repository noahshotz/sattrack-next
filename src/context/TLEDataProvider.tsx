"use client";

import React, { useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { TLE } from '../interfaces/tle';
import { TLEDataContext } from './TLEContext';
import { getSatTLE } from '@/api/sat';
import ErrorComponent from '@/components/ErrorComponent';

interface TLEDataProviderProps {
    children: ReactNode;
}

// Prefix environment variables with NEXT_PUBLIC_
const SATS_TO_TRACK = process.env.NEXT_PUBLIC_SATS_TO_TRACK;
const MAX_REQ_PER_HOUR = parseInt(process.env.NEXT_PUBLIC_MAX_REQ_PER_HOUR || "1000", 10);

export const TLEDataProvider: React.FC<TLEDataProviderProps> = ({ children }) => {
    const [tleData, setTLEData] = useState<TLE[]>([]);
    const [countdown, setCountdown] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const [initializationError, setInitializationError] = useState<string | null>(null);

    const { satsToTrack, updateInterval } = useMemo(() => {
        try {
            if (!SATS_TO_TRACK) {
                throw new Error("NEXT_PUBLIC_SATS_TO_TRACK is not set.");
            }

            const satsToTrack = SATS_TO_TRACK.split(',');
            const numSatellites = satsToTrack.length;

            if (numSatellites === 0) {
                throw new Error("The number of satellites to track must be greater than zero.");
            }

            const updateInterval = Math.ceil(3600 * numSatellites / MAX_REQ_PER_HOUR);
            return { satsToTrack, updateInterval };
        } catch (error) {
            setInitializationError((error as Error).message);
            return { satsToTrack: [], updateInterval: 0 };
        }
    }, []);

    useEffect(() => {
        if (initializationError) return;
        setCountdown(updateInterval);
    }, [updateInterval, initializationError]);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            let processedSatellites = 0;
            const totalSatellites = satsToTrack.length;

            const data = await Promise.all(
                satsToTrack.map(async (satId: string) => {
                    try {
                        const tle = await getSatTLE(satId);
                        processedSatellites += 1;
                        setProgress((processedSatellites / totalSatellites) * 100);
                        return tle;
                    } catch (error) {
                        if (error instanceof Error) {
                            throw new Error(`Error fetching TLE for satellite ${satId}: ${error.message}`);
                        } else {
                            console.error('Error fetching TLE:', error);
                            throw new Error('Unexpected error fetching TLE data');
                        }
                    }
                })
            );

            setTLEData(data);
            setIsLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching TLE data:', error);
            setInitializationError((error as Error).message); // Set initialization error if there is an error
            setIsLoading(false); // Set loading to false even if there is an error
        }
    }, [satsToTrack]);

    useEffect(() => {
        if (!initializationError) {
            fetchData();
            const intervalId = setInterval(fetchData, updateInterval * 1000);
            return () => clearInterval(intervalId);
        }
    }, [fetchData, initializationError, updateInterval]);

    useEffect(() => {
        if (!isLoading) {
            const countdownInterval = setInterval(() => {
                setCountdown(prev => (prev > 1 ? prev - 1 : updateInterval));
            }, 1000);
            return () => clearInterval(countdownInterval);
        }
    }, [isLoading, updateInterval]);

    if (initializationError) {
        return <ErrorComponent message={initializationError} />;
    }

    return (
        <TLEDataContext.Provider value={{ tleData, countdown, progress }}>
            {children}
        </TLEDataContext.Provider>
    );
};
