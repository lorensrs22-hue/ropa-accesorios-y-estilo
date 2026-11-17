import { useState } from 'react';
import { LayoutGrid, MapPin, Menu, ShoppingBag, X } from 'lucide-react';
import { CategoryId } from '../types';

interface NavbarProps {
  activeView: 'home' | 'catalog';
  cartCount: number;
  onNavigateHome: () => void;
  onSelectCategoryAnchor: (category: CategoryId) => void;
  onOpenCatalog: () => void;
  onOpenLocation: () => void;
  onOpenCart: () => void;
}

export function Navbar({
  activeView,
  cartCount,
  onNavigateHome,
  onSelectCategoryAnchor,
  onOpenCatalog,
  onOpenLocation,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryClick = (category: CategoryId) => {
    setMobileMenuOpen(false);
    onSelectCategoryAnchor(category);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#E6E2DC]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#141413] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141413]"
        >
          Casa Vértice
        </button>

        {/* Zone 2: Concise single-line navigation links + direct Catalog & Location buttons */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] font-medium text-[#524E47]"
        >
          <button
            type="button"
            onClick={() => handleCategoryClick('mujeres')}
            className="py-1.5 hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b border-transparent hover:border-[#141413]"
          >
            Mujeres
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('hombres')}
            className="py-1.5 hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b border-transparent hover:border-[#141413]"
          >
            Hombres
          </button>
          <button
            type="button"
            onClick={() => handleCategoryClick('accesorios')}
            className="py-1.5 hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer border-b border-transparent hover:border-[#141413]"
          >
            Accesorios
          </button>

          <span className="h-3.5 w-px bg-[#DCD6CE]" aria-hidden="true" />

          <button
            type="button"
            onClick={onOpenCatalog}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'catalog'
                ? 'bg-[#141413] text-[#FAF9F7] border-[#141413]'
                : 'bg-[#F2F0EC] text-[#141413] border-[#DCD6CE] hover:border-[#141413]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Catálogo completo</span>
          </button>

          <button
            type="button"
            onClick={onOpenLocation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#DCD6CE] bg-transparent text-[#141413] hover:bg-[#F2F0EC] hover:border-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#7A5C43]" aria-hidden="true" />
            <span>Dirección del local</span>
          </button>
        </nav>

        {/* Zone 3: Primary action (Shopping Cart) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito de compras, ${cartCount} artículos`}
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#141413] text-[#FAF9F7] rounded-md hover:bg-[#2C2A27] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Carrito</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#DCD6CE] text-[#141413] hover:bg-[#F2F0EC] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6E2DC] bg-[#FAF9F7] px-4 py-4 space-y-2">
          <div className="grid grid-cols-3 gap-2 pb-2 border-b border-[#E6E2DC]">
            <button
              type="button"
              onClick={() => handleCategoryClick('mujeres')}
              className="py-2.5 text-sm font-medium text-[#141413] bg-[#F2F0EC] rounded-md cursor-pointer"
            >
              Mujeres
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('hombres')}
              className="py-2.5 text-sm font-medium text-[#141413] bg-[#F2F0EC] rounded-md cursor-pointer"
            >
              Hombres
            </button>
            <button
              type="button"
              onClick={() => handleCategoryClick('accesorios')}
              className="py-2.5 text-sm font-medium text-[#141413] bg-[#F2F0EC] rounded-md cursor-pointer"
            >
              Accesorios
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalog();
              }}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md bg-[#141413] text-[#FAF9F7] cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" aria-hidden="true" />
              <span>Catálogo completo</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLocation();
              }}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-md border border-[#DCD6CE] text-[#141413] bg-[#FAF9F7] cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#7A5C43]" aria-hidden="true" />
              <span>Dirección del local</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
