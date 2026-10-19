"use client";

import { useSyncExternalStore } from "react";

// Tiny localStorage-backed store for saved destination ids.
const KEY = "ige-favorites";
const EMPTY: string[] = [];
let ids: string[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    ids = JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    ids = EMPTY;
  }
}

function set(next: string[]) {
  ids = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export const favorites = {
  has: (id: string) => ids.includes(id),
  add: (id: string) => !ids.includes(id) && set([...ids, id]),
  remove: (id: string) => set(ids.filter((x) => x !== id)),
  toggle(id: string) {
    const saved = ids.includes(id);
    if (saved) favorites.remove(id);
    else favorites.add(id);
    return !saved;
  },
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useFavorites() {
  return useSyncExternalStore(
    subscribe,
    () => (load(), ids),
    () => EMPTY,
  );
}
