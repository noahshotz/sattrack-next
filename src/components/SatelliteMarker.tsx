import { forwardRef } from 'react';
import { OrbitData } from '../interfaces/tle';
import SattrackIcon from '../assets/sattrack_icon_noframe';

interface SatelliteMarkerProps {
    sat: OrbitData;
}

const SatelliteMarker = forwardRef<HTMLDivElement, SatelliteMarkerProps>(({ sat }, ref) => {
    const { name, velocity, lat, lng } = sat;

    return (
        <div ref={ref} className="flex items-start justify-center gap-1 mr-40 z-20">
            <div className="bg-[#11221b] text-right p-1 px-2 leading-none min-w-44">
                <p className="text-gray-50 font-medium mb-1">{name}</p>
                <div className="text-[#ababab]">{lat.toFixed(2)}°, {lng.toFixed(2)}° @ {velocity.toFixed(1)} km/s</div>
            </div>
            <div className="bg-[#11221b] p-1">
                <SattrackIcon size={24} />
            </div>
        </div>
    );
});

SatelliteMarker.displayName = 'SatelliteMarker';

export default SatelliteMarker;
