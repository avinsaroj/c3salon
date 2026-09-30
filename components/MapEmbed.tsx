"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { useBranch } from "./Branch";

/**
 * Click-to-load Google Map of the selected branch. Keeps the third-party
 * iframe out of the initial page load.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false);
  const { branch } = useBranch();
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-line bg-sand">
      {load ? (
        <iframe
          src={branch.mapEmbedUrl}
          title={`Map showing C3 Unisex Salon, ${branch.name}`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoad(true)}
          className="group absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,transparent_0,transparent_60%),repeating-linear-gradient(90deg,transparent_0_47px,rgb(30_25_22/0.05)_47px_48px),repeating-linear-gradient(0deg,transparent_0_47px,rgb(30_25_22/0.05)_47px_48px)]"
        >
          <span className="flex flex-col items-center gap-4">
            <span className="grid size-16 place-items-center rounded-full bg-ink text-cream shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-110">
              <MapPin aria-hidden />
            </span>
            <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold">Show map</span>
          </span>
        </button>
      )}
    </div>
  );
}
