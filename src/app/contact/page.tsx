export const metadata = {
  title: "Contacto | RopaVintage",
};

import DirectionalTransition from "@/components/ui/DirectionalTransition";

export default function ContactPage() {
  return (
    <DirectionalTransition>
    <div className="max-w-3xl mx-auto px-4 py-16">
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-rust mb-2">
        / contacto
      </p>
      <h1 className="text-2xl font-bold uppercase tracking-wide mb-8">
        Escribinos
      </h1>

      <p className="text-sm text-smoke mb-12 max-w-md">
        ¿Tenés una prenda para vender? ¿Querés saber más sobre alguna pieza?
        Mandanos un mensaje y te respondemos a la brevedad.
      </p>

      <form
        action="mailto:hola@ropavintage.com"
        method="get"
        encType="text/plain"
        className="space-y-6 max-w-lg"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-[10px] font-mono uppercase tracking-widest text-smoke mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full h-10 px-4 text-sm bg-charcoal border border-concrete text-parchment placeholder:text-smoke focus:outline-none focus:border-rust font-mono"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-mono uppercase tracking-widest text-smoke mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full h-10 px-4 text-sm bg-charcoal border border-concrete text-parchment placeholder:text-smoke focus:outline-none focus:border-rust font-mono"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-[10px] font-mono uppercase tracking-widest text-smoke mb-2"
          >
            Mensaje
          </label>
          <textarea
            name="message"
            id="message"
            required
            rows={5}
            className="w-full px-4 py-3 text-sm bg-charcoal border border-concrete text-parchment placeholder:text-smoke focus:outline-none focus:border-rust font-mono resize-none"
            placeholder="Contanos..."
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest bg-rust text-carbon border border-rust hover:bg-rust-light transition-colors"
        >
          Enviar mensaje
        </button>
      </form>

      <div className="mt-16 pt-8 border-t border-concrete">
        <p className="text-[10px] font-mono uppercase tracking-widest text-smoke mb-3">
          También por acá
        </p>
        <div className="space-y-2 text-sm text-parchment font-mono">
          <p>hola@ropavintage.com</p>
          <p>@ropavintage</p>
        </div>
      </div>
    </div>
    </DirectionalTransition>
  );
}
