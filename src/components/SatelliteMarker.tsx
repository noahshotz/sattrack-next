import { forwardRef } from 'react';
import { useTheme } from "next-themes"
import { OrbitData } from '../interfaces/tle';
import SattrackIcon from '../assets/sattrack_icon_noframe';

interface SatelliteMarkerProps {
    sat: OrbitData;
}

const SatelliteMarker = forwardRef<HTMLDivElement, SatelliteMarkerProps>(({ sat }, ref) => {
    const { name, velocity, lat, lng } = sat;
    const { theme } = useTheme()

    return (
        <div ref={ref} className="flex items-start justify-center gap-1 mr-40 z-20">
            <div className=" bg-zinc-200 dark:bg-[#11221b] text-right p-1 px-2 leading-none min-w-44">
                <p className="text-zinc-950 dark:text-gray-50 font-medium mb-1">{name}</p>
                <div className="text-zinc-950 dark:text-[#ababab]">{lat.toFixed(2)}°, {lng.toFixed(2)}° @ {velocity.toFixed(1)} km/s</div>
            </div>
            <div className="bg-zinc-200 dark:bg-[#11221b] p-1">
                <SattrackIcon size={24} color={theme === "dark" ? "#fff" : "#11221b"} />
            </div>
        </div>
    );
});

SatelliteMarker.displayName = 'SatelliteMarker';

export default SatelliteMarker;
