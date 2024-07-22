import SattrackIcon from '../assets/sattrack_icon_noframe';
import { Progress } from "@/components/ui/progress"

interface PreloaderProps {
    progress: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress }) => {

    return (
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-screen gap-2 max-w-xl">
                <SattrackIcon size={52} color={"#000"}/>
                <span className="font-medium text-2xl mb-4">Connecting to uplink...</span>
                <Progress value={progress} className="w-[60%]" />
            </div>
        </div>
    )
};