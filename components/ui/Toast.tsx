"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import { duration, ease } from "@/lib/motion";

type ToastData = { id: number; message: string; onUndo?: () => void };

let current: ToastData | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function toast(message: string, onUndo?: () => void) {
  current = { id: Date.now(), message, onUndo };
  emit();
}

function dismiss() {
  current = null;
  emit();
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function Toaster() {
  const t = useSyncExternalStore(subscribe, () => current, () => null);

  useEffect(() => {
    if (!t) return;
    const timer = setTimeout(dismiss, 4000);
    return () => clearTimeout(timer);
  }, [t]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {t && (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: duration.base, ease: ease.out }}
            className="pointer-events-auto flex items-center gap-4 rounded-full bg-navy py-2 pr-2 pl-5 text-sm text-white shadow-lg"
          >
            <span>{t.message}</span>
            {t.onUndo && (
              <button
                onClick={() => {
                  t.onUndo?.();
                  dismiss();
                }}
                className="min-h-11 rounded-full px-4 font-medium text-accent hover:bg-white/10"
              >
                Undo
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
