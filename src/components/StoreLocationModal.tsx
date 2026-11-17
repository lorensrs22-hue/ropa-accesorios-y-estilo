import { useState } from 'react';
import { Check, Clock, Copy, Mail, MapPin, Phone, Train, X } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoreLocationModal({ isOpen, onClose }: StoreLocationModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullAddress = `${STORE_INFO.street}, ${STORE_INFO.unit}, ${STORE_INFO.postalAndCity}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-location-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FAF9F7] rounded-lg border border-[#DCD6CE] overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6E2DC] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#7A5C43] font-medium">
              Tienda Física · Visítanos
            </p>
            <h2
              id="store-location-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#141413] mt-0.5"
            >
              {STORE_INFO.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de dirección"
            className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-[#DCD6CE] text-[#141413] hover:bg-[#F2F0EC] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Address, Hours, Contact */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7A5C43] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-xs uppercase tracking-[0.12em] text-[#6B665E] font-medium">
                    Dirección exacta del local
                  </h3>
                  <p className="mt-1 text-base font-semibold text-[#141413]">
                    {STORE_INFO.street}
                  </p>
                  <p className="text-sm text-[#524E47]">{STORE_INFO.unit}</p>
                  <p className="text-sm text-[#524E47]">{STORE_INFO.postalAndCity}</p>
                  <p className="mt-1 text-xs text-[#6B665E]">
                    {STORE_INFO.neighborhood}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#DCD6CE] rounded-md bg-[#F2F0EC] text-[#141413] hover:border-[#141413] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2E5238]" aria-hidden="true" />
                    <span>Dirección copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copiar dirección</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 border-t border-[#E6E2DC]">
              <div className="flex items-center gap-2 mb-2.5">
                <Clock className="w-4 h-4 text-[#7A5C43]" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.12em] text-[#6B665E] font-medium">
                  Horario de apertura
                </h3>
              </div>
              <dl className="space-y-1.5 text-sm">
                {STORE_INFO.hours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between gap-4">
                    <dt className="text-[#524E47]">{item.day}</dt>
                    <dd className="font-medium text-[#141413] tabular-nums">
                      {item.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-4 border-t border-[#E6E2DC] space-y-2 text-sm text-[#524E47]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7A5C43]" aria-hidden="true" />
                <span className="tabular-nums text-[#141413] font-medium">
                  {STORE_INFO.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7A5C43]" aria-hidden="true" />
                <span>{STORE_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Right: Clean Architectural Street Plan SVG + Transit */}
          <div className="flex flex-col justify-between gap-4">
            <div className="rounded-md border border-[#DCD6CE] bg-[#F2F0EC] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.12em] text-[#6B665E] font-medium">
                  Plano de acceso · Salamanca
                </span>
                <span className="text-xs text-[#7A5C43] font-medium">Madrid</span>
              </div>

              {/* Architectural schematic map */}
              <svg
                viewBox="0 0 360 220"
                role="img"
                aria-label="Plano esquemático de la ubicación de Casa Vértice en Calle de Velázquez 62, Madrid"
                className="w-full h-auto rounded bg-[#FAF9F7] border border-[#E6E2DC]"
              >
                {/* City blocks */}
                <rect x="16" y="16" width="90" height="52" fill="#EFECE6" rx="2" />
                <rect x="130" y="16" width="96" height="52" fill="#EFECE6" rx="2" />
                <rect x="250" y="16" width="94" height="52" fill="#EFECE6" rx="2" />

                <rect x="16" y="88" width="90" height="56" fill="#EFECE6" rx="2" />
                <rect x="130" y="88" width="96" height="56" fill="#EAE5DC" stroke="#7A5C43" strokeWidth="1" rx="2" />
                <rect x="250" y="88" width="94" height="56" fill="#EFECE6" rx="2" />

                <rect x="16" y="164" width="90" height="40" fill="#EFECE6" rx="2" />
                <rect x="130" y="164" width="96" height="40" fill="#EFECE6" rx="2" />
                <rect x="250" y="164" width="94" height="40" fill="#EFECE6" rx="2" />

                {/* Streets labels */}
                <text x="178" y="81" textAnchor="middle" fill="#6B665E" fontSize="8.5" fontFamily="sans-serif" letterSpacing="1">
                  C. DE DON RAMÓN DE LA CRUZ
                </text>
                <text x="178" y="157" textAnchor="middle" fill="#6B665E" fontSize="8.5" fontFamily="sans-serif" letterSpacing="1">
                  CALLE DE AYALA
                </text>
                <text
                  x="118"
                  y="116"
                  textAnchor="middle"
                  fill="#141413"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  transform="rotate(-90 118 116)"
                >
                  C. DE VELÁZQUEZ
                </text>
                <text
                  x="238"
                  y="116"
                  textAnchor="middle"
                  fill="#6B665E"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                  transform="rotate(-90 238 116)"
                >
                  C. NÚÑEZ DE BALBOA
                </text>

                {/* Metro pin */}
                <circle cx="242" cy="154" r="6" fill="#141413" />
                <text x="242" y="157" textAnchor="middle" fill="#FAF9F7" fontSize="7" fontWeight="700">
                  M
                </text>
                <text x="254" y="176" fill="#524E47" fontSize="8">
                  Metro Velázquez
                </text>

                {/* Boutique pin */}
                <circle cx="136" cy="116" r="10" fill="#7A5C43" opacity="0.2" />
                <circle cx="136" cy="116" r="5.5" fill="#141413" />
                <text x="148" y="114" fill="#141413" fontSize="9.5" fontWeight="700">
                  Casa Vértice
                </text>
                <text x="148" y="125" fill="#7A5C43" fontSize="8">
                  Velázquez, 62 · Local B
                </text>
              </svg>
            </div>

            <div className="space-y-2 text-xs text-[#524E47]">
              <div className="flex items-center gap-1.5 text-[#141413] font-medium uppercase tracking-[0.1em]">
                <Train className="w-3.5 h-3.5 text-[#7A5C43]" aria-hidden="true" />
                <span>Transporte y acceso</span>
              </div>
              <ul className="space-y-1 leading-relaxed">
                {STORE_INFO.transit.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                <li className="text-[#7A5C43] font-medium pt-0.5">{STORE_INFO.parking}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
