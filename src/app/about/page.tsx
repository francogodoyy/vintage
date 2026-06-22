export const metadata = {
  title: "Nosotros | RopaVintage",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / nosotros
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Ropa con historia
      </h1>

      <div className="space-y-6 text-sm text-smoke leading-relaxed">
        <p>
          RopaVintage nace de una obsesión: encontrar prendas que cuenten algo.
          No seguimos temporadas ni tendencias. Buscamos piezas originales con
          décadas de vida, seleccionadas una por una.
        </p>
        <p>
          Cada prenda pasa por un proceso de curaduría riguroso. Revisamos
          costuras, telas, etiquetas, historia. Si no tiene historia, no entra
          al catálogo.
        </p>
        <p>
          Creemos en la moda lenta, en comprar menos y mejor, en darle una
          segunda vida a lo que ya existe. Cada prenda que vendés es una prenda
          que no terminó en un basurero.
        </p>

        <div className="grid grid-cols-3 gap-px bg-concrete my-12">
          <div className="bg-charcoal p-6 text-center">
            <p className="text-2xl font-bold text-rust">+150</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Prendas curadas
            </p>
          </div>
          <div className="bg-charcoal p-6 text-center">
            <p className="text-2xl font-bold text-rust">10</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Décadas abarcadas
            </p>
          </div>
          <div className="bg-charcoal p-6 text-center">
            <p className="text-2xl font-bold text-rust">2024</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mt-2">
              Desde
            </p>
          </div>
        </div>

        <p>
          Cada prenda incluye su historia: época de origen, material,
          procedencia. No comprás solo ropa, comprás un pedazo de historia
          textil.
        </p>
      </div>
    </div>
  );
}
