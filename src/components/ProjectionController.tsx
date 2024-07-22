import * as React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectionType, ProjectionTypes } from '../interfaces/proj';

interface ProjectionControllerProps {
    projection: ProjectionType;
    setProjection: (projection: ProjectionType) => void;
}

export const ProjectionController: React.FC<ProjectionControllerProps> = ({ projection, setProjection }) => {
    return (
        <div className="pointer-events-auto">
            <Select
                onValueChange={(value) => setProjection(value as ProjectionType)}
                value={projection}
            >
                <SelectTrigger className="w-auto">
                    <SelectValue placeholder="Change Projection" />
                </SelectTrigger>
                <SelectContent className="">
                    <SelectGroup>
                        <SelectLabel>Projection</SelectLabel>
                        {ProjectionTypes.map((type) => (
                            <SelectItem key={type.identifier} value={type.identifier}>{type.label}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default React.memo(ProjectionController);