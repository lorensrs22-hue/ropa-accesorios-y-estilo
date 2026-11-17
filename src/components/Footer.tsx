import { MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategoryAnchor: (category: CategoryId) => void;
  onOpenCatalog: () => void;
  onOpenLocation: () => void;
}

export function Footer({
  onSelectCategoryAnchor,
  onOpenCatalog,
  onOpenLocation,
}: FooterProps) {
  return (
    <footer className="border-t border-[#E6E2DC] bg-[#F2F0EC]/70 mt-10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-2xl font-semibold text-[#141413]">
            Casa Vértice
          </span>
          <p className="mt-3 text-sm text-[#524E47] max-w-xs leading-relaxed">
            Tienda de ropa contemporánea especializada en tejidos naturales, sastrería relajada y marroquinería artesanal.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.14em] text-[#6B665E] font-medium mb-3">
            Secciones de la tienda
          </h3>
          <ul className="space-y-2 text-sm text-[#141413]">
            <li>
              <button
                type="button"
                onClick={() => onSelectCategoryAnchor('mujeres')}
                className="hover:text-[#7A5C43] transition-colors cursor-pointer"
              >
                Mujeres
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategoryAnchor('hombres')}
                className="hover:text-[#7A5C43] transition-colors cursor-pointer"
              >
                Hombres
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onSelectCategoryAnchor('accesorios')}
                className="hover:text-[#7A5C43] transition-colors cursor-pointer"
              >
                Accesorios
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenCatalog}
                className="hover:text-[#7A5C43] transition-colors font-medium cursor-pointer"
              >
                Catálogo completo del local
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.14em] text-[#6B665E] font-medium mb-3">
            Local físico
          </h3>
          <p className="text-sm font-medium text-[#141413]">{STORE_INFO.street}</p>
          <p className="text-sm text-[#524E47]">
            {STORE_INFO.unit} · {STORE_INFO.postalAndCity}
          </p>
          <p className="mt-2 text-xs text-[#6B665E] tabular-nums">
            L–V 10:30–20:30 · Sáb 10:30–21:00 · Dom 11:30–18:00
          </p>
          <button
            type="button"
            onClick={onOpenLocation}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] border-b border-[#141413] pb-0.5 hover:text-[#7A5C43] hover:border-[#7A5C43] cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Ver dirección y plano del local</span>
          </button>
        </div>
      </div>

      <div className="border-t border-[#E6E2DC] py-5 px-4 sm:px-8 max-w-[1320px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#6B665E]">
        <span>© {new Date().getFullYear()} Casa Vértice. Todos los derechos reservados.</span>
        <span>{STORE_INFO.phone} · {STORE_INFO.email}</span>
      </div>
    </footer>
  );
}
