import { createContext, useContext } from "react";
import { TLE } from "../interfaces/tle";

interface TLEDataContextType {
    tleData: TLE[];
    countdown: number;
    progress: number;
}

export const TLEDataContext = createContext<TLEDataContextType | undefined>(undefined);

export const useTLEData = () => {
    const context = useContext(TLEDataContext);
    if (context === undefined) {
        throw new Error('useTLEData must be used within a TLEDataProvider');
    }
    return context;
};
