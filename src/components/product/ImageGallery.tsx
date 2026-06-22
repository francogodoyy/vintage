"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ProductImage from "@/components/ui/ProductImage";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] bg-concrete overflow-hidden border border-concrete relative">
        <ProductImage
          src={images[selected]}
          alt={`${name} — vista ${selected + 1}`}
          fill
          className="object-cover"
          priority
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
                <div className="relative w-full h-full">
                  <ProductImage
                    src={img}
                    alt={`${name} — miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
