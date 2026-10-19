"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import "@/lib/maplibre-setup";
import { ArrowRight, LocateFixed } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, Popup, type MapRef } from "react-map-gl/maplibre";
import type { Country, Destination } from "@/content/destinations";
import { COUNTRY_VIEW, MAP_STYLE } from "@/lib/map";
import { cn } from "@/lib/utils";

type NearbyPin = { name: string; distance: string; coordinates: [number, number]; of: string };

export default function MapCanvas({
  country,
  destinations,
  nearby,
  hovered,
  setHovered,
  selected,
  setSelected,
}: {
  country: Country;
  destinations: Destination[];
  nearby: NearbyPin[];
  hovered: string | null;
  setHovered: (s: string | null) => void;
  selected: string | null;
  setSelected: (s: string | null) => void;
}) {
  const ref = useRef<MapRef>(null);
  const sel = destinations.find((d) => d.slug === selected);

  // Fly between countries
  useEffect(() => {
    ref.current?.flyTo({ center: [COUNTRY_VIEW[country].longitude, COUNTRY_VIEW[country].latitude], zoom: COUNTRY_VIEW[country].zoom, duration: 1600 });
  }, [country]);

  // Fly to a selected destination
  useEffect(() => {
    if (sel) ref.current?.flyTo({ center: sel.coordinates, zoom: 7, duration: 1200 });
  }, [sel]);

  const locate = () =>
    navigator.geolocation?.getCurrentPosition((p) =>
      ref.current?.flyTo({ center: [p.coords.longitude, p.coords.latitude], zoom: 8 }),
    );

  return (
    <Map ref={ref} initialViewState={COUNTRY_VIEW[country]} mapStyle={MAP_STYLE} style={{ width: "100%", height: "100%" }}>
      <NavigationControl position="top-right" showCompass={false} />
      <button
        type="button"
        onClick={locate}
        aria-label="Show my location"
        className="absolute top-[88px] right-[10px] z-10 flex size-[29px] items-center justify-center rounded bg-white text-navy shadow-sm"
      >
        <LocateFixed size={16} strokeWidth={1.5} />
      </button>

      {nearby.map((n) => (
        <Marker key={n.of + n.name} longitude={n.coordinates[0]} latitude={n.coordinates[1]} anchor="center">
          <span title={`${n.name} (near ${n.of})`} className="block size-3 rounded-full border-2 border-white bg-navy shadow-sm" />
        </Marker>
      ))}

      {destinations.map((d) => (
        <Marker
          key={d.slug}
          longitude={d.coordinates[0]}
          latitude={d.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelected(d.slug);
          }}
        >
          <motion.button
            type="button"
            aria-label={d.name}
            onMouseEnter={() => setHovered(d.slug)}
            onMouseLeave={() => setHovered(null)}
            animate={hovered === d.slug ? { y: [0, -10, 0] } : { y: 0 }}
            style={{ rotate: 45 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "block size-6 rounded-full rounded-br-none border-2 border-white bg-accent shadow-lg",
              selected === d.slug && "bg-navy",
            )}
          />
        </Marker>
      ))}

      {sel && (
        <Popup
          longitude={sel.coordinates[0]}
          latitude={sel.coordinates[1]}
          anchor="bottom"
          offset={30}
          closeButton={false}
          onClose={() => setSelected(null)}
          maxWidth="260px"
        >
          <div className="w-[230px] font-sans text-navy">
            <span className="relative block aspect-[16/10] overflow-hidden rounded-sm">
              <Image
                src={sel.image.thumb ?? sel.image.src}
                unoptimized={sel.image.src.startsWith("http")}
                alt={sel.image.alt}
                fill
                sizes="230px"
                className="object-cover"
              />
            </span>
            <p className="mt-2 font-serif text-xl tracking-[-0.045em]">{sel.name}</p>
            <Link href={`/${sel.country}/${sel.slug}`} className="mt-1 inline-flex items-center gap-1 text-sm text-navy underline-offset-4 hover:underline">
              View details <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </Popup>
      )}
    </Map>
  );
}
