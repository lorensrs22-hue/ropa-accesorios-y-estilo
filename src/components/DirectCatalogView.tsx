import { useMemo, useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { CategoryId, Product } from '../types';
import { ProductCard } from './ProductCard';

interface DirectCatalogViewProps {
  products: Product[];
  initialCategory?: CategoryId | 'todos';
  onBackToHome: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onInspectProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function DirectCatalogView({
  products,
  initialCategory = 'todos',
  onBackToHome,
  onAddToCart,
  onInspectProduct,
}: DirectCatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>(
    initialCategory
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const counts = useMemo(() => {
    return {
      todos: products.length,
      mujeres: products.filter((p) => p.category === 'mujeres').length,
      hombres: products.filter((p) => p.category === 'hombres').length,
      accesorios: products.filter((p) => p.category === 'accesorios').length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      const matchesCat =
        selectedCategory === 'todos' || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.color.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const tabs: { id: CategoryId | 'todos'; label: string; count: number }[] = [
    { id: 'todos', label: 'Todo el local', count: counts.todos },
    { id: 'mujeres', label: 'Mujeres', count: counts.mujeres },
    { id: 'hombres', label: 'Hombres', count: counts.hombres },
    { id: 'accesorios', label: 'Accesorios', count: counts.accesorios },
  ];

  return (
    <section
      aria-label="Catálogo completo del local"
      className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-14"
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E6E2DC]">
        <div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#6B665E] hover:text-[#141413] mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Volver al escaparate</span>
          </button>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#141413] tracking-tight text-balance">
            Catálogo directo del local
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#524E47] max-w-2xl">
            Inventario completo disponible en tienda física y para envío inmediato. Selecciona talla y añade directamente a tu carrito.
          </p>
        </div>

        <div className="text-sm text-[#524E47] tabular-nums whitespace-nowrap shrink-0">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'prenda disponible' : 'prendas disponibles'}
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Interactive category filter buttons */}
        <div
          role="tablist"
          aria-label="Filtrar catálogo por categoría"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F2F0EC] rounded-lg self-start"
        >
          {tabs.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 text-xs sm:text-[13px] font-medium rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#FAF9F7] text-[#141413] shadow-xs'
                    : 'text-[#524E47] hover:text-[#141413]'
                }`}
              >
                {tab.label}{' '}
                <span className="tabular-nums opacity-70">({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search
              className="w-4 h-4 text-[#78736A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar prenda, tejido o color..."
              aria-label="Buscar en el catálogo"
              className="w-full sm:w-64 pl-9 pr-8 py-2 text-sm bg-[#FAF9F7] border border-[#DCD6CE] rounded-md text-[#141413] placeholder:text-[#8A847A] focus:outline-none focus:border-[#141413]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#78736A] hover:text-[#141413] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Ordenar catálogo"
            className="px-3 py-2 text-sm bg-[#FAF9F7] border border-[#DCD6CE] rounded-md text-[#141413] focus:outline-none focus:border-[#141413] cursor-pointer"
          >
            <option value="featured">Orden editorial</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center border border-[#E6E2DC] rounded-lg bg-[#F2F0EC]/50">
          <p className="font-display text-2xl text-[#141413]">
            No encontramos prendas con ese criterio
          </p>
          <p className="mt-2 text-sm text-[#524E47]">
            Prueba otra palabra clave o muestra todo el catálogo del local.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('todos');
            }}
            className="mt-5 px-4 py-2 text-xs font-medium bg-[#141413] text-[#FAF9F7] rounded-md hover:bg-[#2C2A27] cursor-pointer"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onInspectProduct={onInspectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
