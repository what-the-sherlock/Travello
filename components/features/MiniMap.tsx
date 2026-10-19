"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import "@/lib/maplibre-setup";
import { useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, type MapRef } from "react-map-gl/maplibre";
import { MAP_STYLE } from "@/lib/map";
import { cn } from "@/lib/utils";

type Pin = { name: string; coordinates: [number, number]; main?: boolean };

/** Small map that pans to `focus` whenever it changes. */
export default function MiniMap({ pins, focus }: { pins: Pin[]; focus: [number, number] }) {
  const ref = useRef<MapRef>(null);

  useEffect(() => {
    ref.current?.easeTo({ center: focus, duration: 600 });
  }, [focus]);

  return (
    <Map
      ref={ref}
      initialViewState={{ longitude: pins[0].coordinates[0], latitude: pins[0].coordinates[1], zoom: 7 }}
      mapStyle={MAP_STYLE}
      style={{ width: "100%", height: "100%" }}
      cooperativeGestures
      attributionControl={{ compact: true }}
    >
      <NavigationControl position="top-right" showCompass={false} />
      {pins.map((p) => (
        <Marker key={p.name} longitude={p.coordinates[0]} latitude={p.coordinates[1]} anchor="bottom">
          <span
            title={p.name}
            className={cn(
              "block rounded-full border-2 border-white shadow-lg",
              p.main ? "size-5 bg-accent" : "size-4 bg-navy",
            )}
          />
        </Marker>
      ))}
    </Map>
  );
}
