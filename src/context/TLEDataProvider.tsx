"use client";

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { TLE } from '../interfaces/tle';
import { TLEDataContext } from './TLEContext';
import { getSatTLE } from '../api/sat';

interface TLEDataProviderProps {
    children: ReactNode;
}

// Prefix environment variables with NEXT_PUBLIC_
const satsToTrackString = process.env.NEXT_PUBLIC_SATS_TO_TRACK;

if (!satsToTrackString) {
    throw new Error("Environment variable NEXT_PUBLIC_SATS_TO_TRACK is not defined or empty.");
}

const satsToTrack = satsToTrackString.split(',');

const numSatellites = satsToTrack.length;

if (numSatellites === 0) {
    throw new Error("The number of satellites to track must be greater than zero.");
}

const maxRequestsPerHour = parseInt(process.env.NEXT_PUBLIC_MAX_REQ_PER_HOUR!, 10) || 1000;

if (isNaN(maxRequestsPerHour) || maxRequestsPerHour <= 0) {
    throw new Error("The maxRequestsPerHour must be a positive number.");
}

const updateInterval = Math.ceil(3600 * numSatellites / maxRequestsPerHour);

export const TLEDataProvider: React.FC<TLEDataProviderProps> = ({ children }) => {
    const [tleData, setTLEData] = useState<TLE[]>([]);
    const [countdown, setCountdown] = useState<number>(updateInterval);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            let processedSatellites = 0;
            const totalSatellites = satsToTrack.length;

            const data = await Promise.all(
                satsToTrack.map(async (satId: string) => {
                    const tle = await getSatTLE(satId);
                    processedSatellites += 1;
                    setProgress((processedSatellites / totalSatellites) * 100);
                    return tle;
                })
            );

            setTLEData(data);
            setIsLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching TLE data:', error);
            setIsLoading(false); // Set loading to false even if there is an error
        }
    }, []);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, updateInterval * 1000);
        return () => clearInterval(intervalId);
    }, [fetchData]);

    useEffect(() => {
        if (!isLoading) {
            const countdownInterval = setInterval(() => {
                setCountdown(prev => (prev > 1 ? prev - 1 : updateInterval));
            }, 1000);
            return () => clearInterval(countdownInterval);
        }
    }, [isLoading]);

    return (
        <TLEDataContext.Provider value={{ tleData, countdown, progress }}>
            {children}
        </TLEDataContext.Provider>
    );
};