import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import SattrackIcon from '../assets/sattrack_icon_noframe';
import { Progress } from '@/components/ui/progress';

interface PreloaderProps {
    progress: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // When mounted on client, set the state to true
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Render nothing until mounted

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-screen gap-2 max-w-xl">
                <SattrackIcon size={52} color={theme === 'dark' ? '#fff' : '#000'} />
                <span className="font-medium text-2xl mb-4">Connecting to uplink...</span>
                <Progress value={progress} className="w-[60%]" />
            </div>
        </div>
    );
};