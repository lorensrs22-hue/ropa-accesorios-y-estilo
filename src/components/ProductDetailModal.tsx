import { useEffect, useState } from 'react';
import { Check, MapPin, ShoppingBag, X } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onOpenLocation: () => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onOpenLocation,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize || product.sizes[0]);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#FAF9F7] rounded-lg border border-[#DCD6CE] overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Product Image */}
        <div className="bg-[#F2F0EC] aspect-[4/3] md:aspect-auto md:h-full">
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            fallbackTitle={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs uppercase tracking-[0.12em] text-[#6B665E]">
                {product.categoryLabel} · {product.sku}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar detalle de prenda"
                className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#DCD6CE] text-[#141413] hover:bg-[#F2F0EC] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2
              id="pdp-title"
              className="font-display text-3xl font-semibold text-[#141413] mt-2 leading-tight"
            >
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-xl font-semibold text-[#141413] tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[#6B665E]">
                {product.material} · Color {product.color}
              </span>
            </div>

            <p className="mt-4 text-sm text-[#524E47] leading-relaxed">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-[0.1em] text-[#524E47] font-medium">
                  Seleccionar talla
                </span>
                <span className="text-[#6B665E]">
                  Talla actual: <strong className="text-[#141413]">{selectedSize}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-10 px-3 text-sm font-medium rounded-md border transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#141413] text-[#FAF9F7] border-[#141413]'
                        : 'bg-[#FAF9F7] text-[#141413] border-[#DCD6CE] hover:border-[#141413]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Care & Store Availability */}
            <div className="mt-6 pt-4 border-t border-[#E6E2DC] space-y-2 text-xs text-[#524E47]">
              <p>
                <strong className="text-[#141413] font-medium">Cuidados:</strong>{' '}
                {product.care}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLocation();
                }}
                className="inline-flex items-center gap-1.5 text-[#7A5C43] hover:text-[#141413] font-medium cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Disponible en local físico · Calle de Velázquez, 62</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-3.5 px-5 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              added
                ? 'bg-[#2E5238] text-[#FAF9F7]'
                : 'bg-[#141413] text-[#FAF9F7] hover:bg-[#2C2A27]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Añadido al carrito</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>
                  Añadir al carrito · {formatPrice(product.price)}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
