"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import type { Video } from "@/lib/data";
import { cn } from "@/lib/utils";

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/**
 * Lite YouTube embed: shows a poster first and only loads the iframe after a click.
 * The playlist beside it switches videos.
 */
export function VideoGuide({ videos }: { videos: Video[] }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const v = videos[current];

  if (!v) return <p>No videos yet for this destination.</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
      <div>
        <div className="relative aspect-video overflow-hidden rounded-card bg-navy-night shadow-lg">
          {playing ? (
            <iframe
              key={v.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
              title={v.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${v.title}`}
              className="group absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(v.youtubeId)} alt="" className="size-full object-cover" />
              <span className="absolute inset-0 bg-navy-night/30" />
              <span className="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white transition-transform duration-240 ease-out group-hover:scale-110">
                <Play size={32} strokeWidth={1.5} className="ml-1 fill-white" />
              </span>
            </button>
          )}
        </div>
        <h2 className="mt-6 text-h3">{v.title}</h2>
        <p className="mt-1 text-navy/60">
          {v.channel} · {v.duration}
        </p>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-h3">Video highlights</h2>
        <ul className="flex flex-col gap-3">
          {videos.map((x, i) => (
            <li key={x.youtubeId}>
              <button
                type="button"
                aria-current={i === current}
                onClick={() => {
                  setCurrent(i);
                  setPlaying(true);
                }}
                className={cn(
                  "flex w-full gap-4 rounded-card p-3 text-left transition-colors",
                  i === current ? "bg-white shadow-sm" : "hover:bg-white/60",
                )}
              >
                <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-sm bg-tint">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(x.youtubeId)} alt="" loading="lazy" className="size-full object-cover" />
                  <span className="absolute right-1 bottom-1 rounded bg-navy-night/80 px-1.5 text-xs text-white">
                    {x.duration}
                  </span>
                </span>
                <span className="line-clamp-3 text-[15px] leading-snug">{x.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-navy/60">Videos are hosted on YouTube by their creators.</p>
      </div>
    </div>
  );
}
