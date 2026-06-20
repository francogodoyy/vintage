export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-rust border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-xs font-mono uppercase tracking-widest text-smoke">
          Cargando...
        </p>
      </div>
    </div>
  );
}
