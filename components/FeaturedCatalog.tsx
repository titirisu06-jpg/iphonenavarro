import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecondaryCardProps {
  name: string;
  description: string;
  image: string;
}

const SecondaryCard: React.FC<SecondaryCardProps> = ({ name, description, image }) => (
  <article className="group relative min-h-[220px] flex-1 overflow-hidden rounded-[2rem] border border-black/[0.05] bg-[#f5f5f7] p-6 transition duration-500 hover:-translate-y-0.5 hover:shadow-xl">
    <div className="relative z-20 max-w-[54%]">
      <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink sm:text-2xl">{name}</h3>
      <p className="mt-1.5 text-sm leading-snug text-ink-tertiary">{description}</p>
    </div>

    <Link
      to="/catalogo?categoria=Sellados"
      aria-label={`Ver ${name} en el catálogo`}
      className="absolute bottom-6 left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05] text-ink transition duration-300 group-hover:bg-ink group-hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue focus-visible:ring-offset-2"
    >
      <Plus size={20} />
    </Link>

    <div className="absolute inset-y-2 right-2 z-0 w-[48%] transition-transform duration-700 ease-out group-hover:scale-[1.04]">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-contain object-right"
        loading="lazy"
      />
    </div>
  </article>
);

const FeaturedCatalog: React.FC = () => {
  return (
    <section id="seleccion-destacada" className="relative scroll-mt-24 overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink md:text-5xl">
            Diseñados para destacar.<br />
            <span className="text-ink/40">Nuestra selección.</span>
          </h2>

          <Link
            to="/catalogo"
            className="group inline-flex w-fit items-center gap-2 font-medium text-iphone-blue transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue focus-visible:ring-offset-4"
          >
            Ver todos los modelos
            <span className="rounded-full bg-iphone-blue/10 p-1 transition-colors group-hover:bg-iphone-blue/20">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:h-[480px] lg:grid-cols-3">
          <article className="group relative min-h-[520px] overflow-hidden rounded-[2rem] border border-black/[0.05] bg-[#f5f5f7] p-8 transition duration-500 hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[500px] sm:p-10 lg:col-span-2 lg:min-h-0">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8f243d]/10 blur-3xl" />

            <div className="relative z-20 max-w-md lg:max-w-[42%]">
              <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#8f243d] shadow-sm backdrop-blur">
                Lo último
              </span>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink md:text-4xl">iPhone 18 Pro</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-secondary md:text-lg">
                A20 Pro. Potencia y fotografía de nivel Pro.
              </p>
              <Link
                to="/catalogo?categoria=Sellados"
                className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-ink px-6 py-3 font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iphone-blue focus-visible:ring-offset-2"
              >
                Más información
              </Link>
            </div>

            <div className="absolute inset-x-4 bottom-[-2%] z-10 h-[55%] transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:inset-x-auto sm:right-[2%] sm:h-[58%] sm:w-[70%] lg:bottom-[1%] lg:right-[1%] lg:h-[96%] lg:w-[56%]">
              <img
                src="/products/iphone-18-pro.png"
                alt="iPhone 18 Pro"
                className="h-full w-full object-contain object-right-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.12)]"
              />
            </div>
          </article>

          <div className="flex flex-col gap-6 lg:h-[480px]">
            <SecondaryCard
              name="iPhone 17 Pro"
              description="Rendimiento Pro, diseño inconfundible."
              image="/products/iphone-17-pro.png"
            />
            <SecondaryCard
              name="iPhone 16"
              description="Potente, versátil y listo para todo."
              image="/products/iphone-16.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCatalog;
