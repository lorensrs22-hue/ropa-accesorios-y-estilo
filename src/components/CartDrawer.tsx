import { FormEvent, useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, STORE_INFO } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onBrowseCatalog: () => void;
}

const FREE_SHIPPING_THRESHOLD = 120;
const SHIPPING_FEE = 8;

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCatalog,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'shipping' | 'pickup'>('shipping');
  const [shippingAddress, setShippingAddress] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    deliveryMode: 'shipping' | 'pickup';
    name: string;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost =
    items.length === 0 || deliveryMode === 'pickup' || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;
  const total = subtotal + shippingCost;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setConfirmedOrder(null);
    }
    onClose();
  };

  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    const orderNum = `CV-${Math.floor(1040 + Math.random() * 8900)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      total,
      deliveryMode,
      name: customerName.trim(),
    });
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
      className="fixed inset-0 z-50 flex justify-end bg-[#141413]/50 backdrop-blur-xs"
      onClick={handleClose}
    >
      <aside
        className="w-full max-w-md bg-[#FAF9F7] h-full flex flex-col border-l border-[#DCD6CE] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E6E2DC] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#141413]" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-[#141413]">
              {step === 'bag' && 'Carrito de compras'}
              {step === 'checkout' && 'Finalizar pedido'}
              {step === 'confirmed' && 'Pedido confirmado'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar carrito"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#DCD6CE] text-[#141413] hover:bg-[#F2F0EC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Bag Contents */}
        {step === 'bag' && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag
                  className="w-10 h-10 text-[#9B9489] stroke-[1.25] mb-3"
                  aria-hidden="true"
                />
                <p className="font-display text-2xl text-[#141413]">
                  Tu carrito está vacío
                </p>
                <p className="mt-2 text-sm text-[#524E47] max-w-xs">
                  Explora las colecciones de mujeres, hombres y accesorios para añadir tus prendas favoritas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onBrowseCatalog();
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#141413] text-[#FAF9F7] text-xs font-medium rounded-md hover:bg-[#2C2A27] cursor-pointer"
                >
                  Ir al catálogo completo
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping bar */}
                <div className="px-6 py-3 bg-[#F2F0EC] border-b border-[#E6E2DC] text-xs text-[#524E47]">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#2E5238] font-medium">
                      Tu pedido incluye envío a domicilio gratuito o recogida sin coste en el local.
                    </span>
                  ) : (
                    <span>
                      Añade{' '}
                      <strong className="text-[#141413] tabular-nums">
                        {formatPrice(remainingForFreeShipping)}
                      </strong>{' '}
                      más para disfrutar de envío gratuito (recogida en local siempre gratuita).
                    </span>
                  )}
                </div>

                {/* Item List */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#E6E2DC] px-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="py-5 flex gap-4"
                    >
                      <div className="w-20 h-20 rounded bg-[#F2F0EC] overflow-hidden shrink-0">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.imageAlt}
                          fallbackTitle={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-semibold text-[#141413] truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-[#6B665E] mt-0.5">
                              {item.product.categoryLabel} · Talla {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            aria-label={`Eliminar ${item.product.name} talla ${item.size}`}
                            className="text-[#78736A] hover:text-[#141413] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3 mt-3">
                          {/* Quantity stepper */}
                          <div className="inline-flex items-center border border-[#DCD6CE] rounded-md bg-[#FAF9F7]">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.size, -1)
                              }
                              aria-label="Reducir cantidad"
                              className="w-8 h-8 inline-flex items-center justify-center text-[#141413] hover:bg-[#F2F0EC] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.size, 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="w-8 h-8 inline-flex items-center justify-center text-[#141413] hover:bg-[#F2F0EC] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="text-sm font-semibold text-[#141413] tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Checkout CTA */}
                <div className="p-6 border-t border-[#E6E2DC] bg-[#F2F0EC]/60 space-y-3">
                  <div className="flex items-center justify-between text-sm text-[#524E47]">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-[#141413]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#6B665E]">
                    <span>Envío estimado</span>
                    <span className="tabular-nums">
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? 'Gratis'
                        : formatPrice(SHIPPING_FEE)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DCD6CE] flex items-center justify-between text-base font-semibold text-[#141413]">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatPrice(
                        subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE)
                      )}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full mt-2 py-3.5 px-5 bg-[#141413] text-[#FAF9F7] text-sm font-medium rounded-md hover:bg-[#2C2A27] transition-colors cursor-pointer"
                  >
                    Continuar con el pedido
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* Step 2: Simple Order Verification Form */}
        {step === 'checkout' && (
          <form onSubmit={handleConfirmOrder} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setStep('bag')}
                className="inline-flex items-center gap-1.5 text-xs text-[#524E47] hover:text-[#141413] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Volver al carrito</span>
              </button>

              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-[#524E47] font-medium mb-2">
                  Modalidad de entrega
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('shipping')}
                    className={`py-2.5 px-3 text-xs font-medium rounded-md border text-left cursor-pointer ${
                      deliveryMode === 'shipping'
                        ? 'bg-[#141413] text-[#FAF9F7] border-[#141413]'
                        : 'bg-[#FAF9F7] text-[#141413] border-[#DCD6CE]'
                    }`}
                  >
                    Envío a domicilio
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('pickup')}
                    className={`py-2.5 px-3 text-xs font-medium rounded-md border text-left cursor-pointer ${
                      deliveryMode === 'pickup'
                        ? 'bg-[#141413] text-[#FAF9F7] border-[#141413]'
                        : 'bg-[#FAF9F7] text-[#141413] border-[#DCD6CE]'
                    }`}
                  >
                    Recoger en local (Gratis)
                  </button>
                </div>
                {deliveryMode === 'pickup' && (
                  <p className="mt-2 text-xs text-[#6B665E]">
                    Recogida en {STORE_INFO.street}, {STORE_INFO.unit}. Listo en 2 horas dentro del horario comercial.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-medium text-[#524E47] mb-1.5"
                >
                  Nombre y apellidos
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Sofía Mendoza"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#DCD6CE] rounded-md text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-medium text-[#524E47] mb-1.5"
                >
                  Teléfono o correo de contacto
                </label>
                <input
                  id="checkout-phone"
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Ej. +34 600 123 456"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#DCD6CE] rounded-md text-[#141413] focus:outline-none focus:border-[#141413]"
                />
              </div>

              {deliveryMode === 'shipping' && (
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs font-medium text-[#524E47] mb-1.5"
                  >
                    Dirección de envío y código postal
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Calle, número, piso y código postal"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#DCD6CE] rounded-md text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#E6E2DC] space-y-3 mt-6">
              <div className="flex items-center justify-between text-sm text-[#524E47]">
                <span>Subtotal prendas</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[#524E47]">
                <span>{deliveryMode === 'pickup' ? 'Recogida en local' : 'Envío'}</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-[#141413] pt-2 border-t border-[#DCD6CE]">
                <span>Total a pagar</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#141413] text-[#FAF9F7] text-sm font-medium rounded-md hover:bg-[#2C2A27] cursor-pointer"
              >
                Confirmar pedido
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Post-Order Confirmed State */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 flex flex-col justify-center p-8 text-center">
            <CheckCircle2
              className="w-12 h-12 text-[#2E5238] mx-auto mb-4 stroke-[1.5]"
              aria-hidden="true"
            />
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A5C43] font-medium">
              Pedido #{confirmedOrder.orderNumber} confirmado
            </p>
            <h3 className="font-display text-3xl font-semibold text-[#141413] mt-2">
              Gracias, {confirmedOrder.name}
            </h3>
            <p className="mt-3 text-sm text-[#524E47] leading-relaxed">
              {confirmedOrder.deliveryMode === 'pickup'
                ? `Estamos preparando tus prendas para recogida en ${STORE_INFO.street}, ${STORE_INFO.unit}.`
                : 'Estamos preparando tu envío desde nuestro atelier de Salamanca.'}
            </p>
            <div className="mt-6 p-4 rounded-md bg-[#F2F0EC] border border-[#E6E2DC] text-sm flex items-center justify-between">
              <span className="text-[#524E47]">Importe confirmado</span>
              <span className="font-semibold text-[#141413] tabular-nums">
                {formatPrice(confirmedOrder.total)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full py-3 px-5 bg-[#141413] text-[#FAF9F7] text-sm font-medium rounded-md hover:bg-[#2C2A27] cursor-pointer"
            >
              Volver a la tienda
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
