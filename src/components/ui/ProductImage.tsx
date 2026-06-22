import Image from "next/image";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJhMmEyYSIvPjwvc3ZnPg==";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImage({
  fill,
  width,
  height,
  ...props
}: ProductImageProps) {
  return (
    <Image
      {...(fill ? { fill: true } : { width, height })}
      placeholder="blur"
      blurDataURL={BLUR}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}
