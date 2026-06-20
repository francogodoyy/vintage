"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] bg-concrete overflow-hidden border border-concrete">
        <img
          src={images[selected]}
          alt={`${name} — vista ${selected + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "w-16 h-20 border overflow-hidden transition-colors",
                selected === i
                  ? "border-rust"
                  : "border-concrete hover:border-steel"
              )}
            >
              <img
                src={img}
                alt={`${name} — miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
