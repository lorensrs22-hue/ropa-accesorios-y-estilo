import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onInspectProduct: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onInspectProduct,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = () => {
    onAddToCart(product, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col bg-[#FAF9F7] transition-transform duration-200 hover:-translate-y-0.5">
      {/* Uniform 4:3 product image container */}
      <button
        type="button"
        onClick={() => onInspectProduct(product)}
        className="relative overflow-hidden rounded-md bg-[#F2F0EC] aspect-[4/3] w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141413]"
      >
        <ResilientImage
          src={product.image}
          alt={product.imageAlt}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* Clean unboxed metadata + title + price */}
      <div className="pt-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#6B665E]">
            <span className="uppercase tracking-[0.08em]">
              {product.categoryLabel} · {product.material}
            </span>
            {product.featuredTag && (
              <span className="text-[#7A5C43] font-medium whitespace-nowrap">
                {product.featuredTag}
              </span>
            )}
          </div>

          <div className="mt-1.5 flex items-baseline justify-between gap-4">
            <button
              type="button"
              onClick={() => onInspectProduct(product)}
              className="text-left text-base font-semibold text-[#141413] hover:underline underline-offset-4 cursor-pointer"
            >
              {product.name}
            </button>
            <span className="text-[15px] font-medium text-[#141413] tabular-nums whitespace-nowrap shrink-0">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Size selection + Add to cart bar */}
        <div className="pt-2 border-t border-[#E6E2DC] flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-1 overflow-x-auto"
            role="group"
            aria-label={`Tallas disponibles para ${product.name}`}
          >
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-[30px] h-7 px-2 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  selectedSize === size
                    ? 'bg-[#141413] text-[#FAF9F7]'
                    : 'bg-[#F2F0EC] text-[#524E47] hover:text-[#141413]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-[#2E5238] text-[#FAF9F7]'
                : 'bg-[#141413] text-[#FAF9F7] hover:bg-[#2C2A27]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Añadido</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
