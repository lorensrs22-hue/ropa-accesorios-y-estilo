import { ArrowRight, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onOpenCatalog: () => void;
  onOpenLocation: () => void;
}

export function Hero({ onOpenCatalog, onOpenLocation }: HeroProps) {
  return (
    <section aria-label="Colección destacada" className="max-w-[1320px] mx-auto px-4 sm:px-8 pt-6 pb-12">
      <div className="relative overflow-hidden rounded-lg bg-[#EAE6DF] aspect-[4/5] sm:aspect-[16/9] max-h-[640px] w-full">
        <ResilientImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fallbackTitle="Casa Vértice · Colección de Temporada"
          className="w-full h-full object-cover object-center"
        />

        {/* Measured contrast scrim for 4.5:1+ legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#141413]/85 via-[#141413]/30 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl text-[#FAF9F7]">
            <p className="text-xs uppercase tracking-[0.18em] text-[#E6E2DC] mb-2.5">
              Colección Otoño – Invierno · Madrid
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.06] tracking-tight text-balance">
              Sastrería esencial y tejidos nobles
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#EAE6DF] max-w-xl leading-relaxed">
              Prendas atemporales para mujer, hombre y marroquinería seleccionadas en nuestro atelier.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenCatalog}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF9F7] text-[#141413] text-sm font-medium rounded-md hover:bg-[#EAE6DF] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Ver catálogo directo</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenLocation}
              className="inline-flex items-center gap-2 px-4 py-3 bg-[#141413]/70 backdrop-blur-xs text-[#FAF9F7] border border-[#FAF9F7]/30 text-sm font-medium rounded-md hover:bg-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Calle Velázquez, 62</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
