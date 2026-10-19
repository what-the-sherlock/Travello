"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { spring, WORD_STAGGER, wordHidden, wordShown } from "@/lib/motion";

/**
 * Travelo heading reveal: words un-blur and rise one after another.
 * `onMount` plays immediately (hero); otherwise it plays once when scrolled into view.
 */
export function WordReveal({
  text,
  as: Tag = "h2",
  className,
  onMount = false,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  onMount?: boolean;
  delay?: number;
}) {
  const words = text.split(" ");
  const trigger = onMount ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, amount: 0.4 } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span initial="hidden" {...trigger} aria-hidden className="block">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{ hidden: wordHidden, shown: wordShown }}
            transition={{ ...spring.travelo, delay: delay + i * WORD_STAGGER }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
