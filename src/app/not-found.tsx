import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-4">
          / 404
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-4">
          Prenda no encontrada
        </h1>
        <p className="text-sm text-smoke mb-8 font-mono">
          Esta prenda ya no está disponible o fue vendida.
        </p>
        <Link href="/products">
          <Button variant="secondary">Ver catálogo</Button>
        </Link>
      </div>
    </div>
  );
}
