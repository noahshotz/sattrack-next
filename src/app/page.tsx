import { MapView } from "@/components/MapView";
import { TLEDataProvider } from "@/context/TLEDataProvider";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <TLEDataProvider>
        <MapView />
      </TLEDataProvider>
    </React.Fragment>
  );
}
