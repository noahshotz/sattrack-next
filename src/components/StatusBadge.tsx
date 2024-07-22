import React from "react";
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
    isOnline: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isOnline }) => {
    return (
        <span className="flex gap-1 align-center justify-start">
            <Badge variant={isOnline ? "online" : "offline"}>
                {isOnline ? "Online" : "Offline"}
            </Badge>
        </span>
    )
}