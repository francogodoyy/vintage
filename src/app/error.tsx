"use client";

import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-4">
          / error
        </p>
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-4">
          Algo salió mal
        </h1>
        <p className="text-sm text-smoke mb-8 font-mono">
          Hubo un error al cargar la página. Intentalo de nuevo.
        </p>
        <Button onClick={reset} variant="secondary">
          Reintentar
        </Button>
      </div>
    </div>
  );
}
