"use client";

import { setWorkerUrl } from "maplibre-gl";

// MapLibre v6 loads its worker as a separate module that Turbopack doesn't bundle,
// so we serve it from /public (copied there by the postinstall script).
setWorkerUrl("/maplibre-gl-worker.mjs");
