import { useEffect, useState } from 'react';
import { CATEGORY_SECTIONS, PRODUCTS } from './data/catalog';
import { CartItem, CategoryId, Product } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { DirectCatalogView } from './components/DirectCatalogView';
import { StoreLocationModal } from './components/StoreLocationModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'casa_vertice_cart_v1';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'catalog'>('home');
  const [catalogFilter, setCatalogFilter] = useState<CategoryId | 'todos'>('todos');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [cart]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLocationOpen(false);
        setIsCartOpen(false);
        setInspectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (entry) => entry.product.id === product.id && entry.size === size
      );
      if (existingIndex > -1) {
        return prev.map((entry, idx) =>
          idx === existingIndex
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleClearCart = () => setCart([]);

  const handleNavigateHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryAnchor = (category: CategoryId) => {
    setActiveView('home');
    window.requestAnimationFrame(() => {
      const target = document.getElementById(`categoria-${category}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const handleOpenCatalog = (category: CategoryId | 'todos' = 'todos') => {
    setCatalogFilter(category);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#141413]">
      <Navbar
        activeView={activeView}
        cartCount={totalCartCount}
        onNavigateHome={handleNavigateHome}
        onSelectCategoryAnchor={handleSelectCategoryAnchor}
        onOpenCatalog={() => handleOpenCatalog('todos')}
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeView === 'home' ? (
          <>
            <Hero
              onOpenCatalog={() => handleOpenCatalog('todos')}
              onOpenLocation={() => setIsLocationOpen(true)}
            />

            {CATEGORY_SECTIONS.map((section) => (
              <CategorySection
                key={section.id}
                id={section.id}
                indexLabel={section.indexLabel}
                title={section.title}
                subtitle={section.subtitle}
                products={PRODUCTS.filter((p) => p.category === section.id)}
                onAddToCart={handleAddToCart}
                onInspectProduct={setInspectedProduct}
                onViewCategoryInCatalog={(cat) => handleOpenCatalog(cat)}
              />
            ))}
          </>
        ) : (
          <DirectCatalogView
            key={catalogFilter}
            products={PRODUCTS}
            initialCategory={catalogFilter}
            onBackToHome={handleNavigateHome}
            onAddToCart={handleAddToCart}
            onInspectProduct={setInspectedProduct}
          />
        )}
      </main>

      <Footer
        onSelectCategoryAnchor={handleSelectCategoryAnchor}
        onOpenCatalog={() => handleOpenCatalog('todos')}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      <StoreLocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      />

      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onBrowseCatalog={() => handleOpenCatalog('todos')}
      />
    </div>
  );
}
