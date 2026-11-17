import { ArrowUpRight } from 'lucide-react';
import { CategoryId, Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategorySectionProps {
  id: CategoryId;
  indexLabel: string;
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onInspectProduct: (product: Product) => void;
  onViewCategoryInCatalog: (category: CategoryId) => void;
}

export function CategorySection({
  id,
  indexLabel,
  title,
  subtitle,
  products,
  onAddToCart,
  onInspectProduct,
  onViewCategoryInCatalog,
}: CategorySectionProps) {
  return (
    <section
      id={`categoria-${id}`}
      aria-labelledby={`heading-${id}`}
      className="max-w-[1320px] mx-auto px-4 sm:px-8 py-12 sm:py-16 border-t border-[#E6E2DC]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#7A5C43] font-medium mb-1.5">
            {indexLabel}
          </p>
          <h2
            id={`heading-${id}`}
            className="font-display text-3xl sm:text-4xl font-semibold text-[#141413] tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-[#524E47] max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onViewCategoryInCatalog(id)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#7A5C43] transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer border-b border-[#141413]/30 hover:border-[#7A5C43] pb-0.5"
        >
          <span>Ver {title.toLowerCase()} en catálogo</span>
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onInspectProduct={onInspectProduct}
          />
        ))}
      </div>
    </section>
  );
}
