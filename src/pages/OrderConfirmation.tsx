
import { useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || 'CHO-2024-001';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6">
              <CheckCircle className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-green-600" />
            </div>
            
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
              ¡Gracias por tu pedido!
            </h1>
            
            <p className="text-sm xs:text-base sm:text-lg text-secondary mb-6 sm:mb-8 leading-relaxed px-2">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación 
              con los detalles y el seguimiento de tu envío.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-4 xs:p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            <h2 className="text-lg xs:text-xl font-semibold text-primary mb-3 sm:mb-4">
              Detalles del Pedido
            </h2>
            
            <div className="space-y-2 xs:space-y-3 text-left">
              <div className="flex flex-col xs:flex-row xs:justify-between space-y-1 xs:space-y-0">
                <span className="text-secondary text-sm xs:text-base">Número de Pedido:</span>
                <span className="font-semibold text-primary text-sm xs:text-base">#{orderId}</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between space-y-1 xs:space-y-0">
                <span className="text-secondary text-sm xs:text-base">Fecha:</span>
                <span className="font-semibold text-primary text-sm xs:text-base">
                  {new Date().toLocaleDateString('es-CO', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between space-y-1 xs:space-y-0">
                <span className="text-secondary text-sm xs:text-base">Total:</span>
                <span className="font-bold text-action text-base xs:text-lg">$412.500</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between items-start xs:items-center space-y-1 xs:space-y-0">
                <span className="text-secondary text-sm xs:text-base">Estado:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Procesando
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-amber-50 rounded-xl p-4 xs:p-5 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-left">
            <h3 className="text-base xs:text-lg font-semibold text-primary mb-3 sm:mb-4">
              ¿Qué sigue ahora?
            </h3>
            
            <ul className="space-y-2 xs:space-y-3 text-secondary">
              <li className="flex items-start space-x-2 xs:space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs xs:text-sm sm:text-base leading-relaxed">Recibirás un email de confirmación en los próximos minutos</span>
              </li>
              <li className="flex items-start space-x-2 xs:space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs xs:text-sm sm:text-base leading-relaxed">Tu pedido será preparado y empacado con cuidado por nuestros artesanos</span>
              </li>
              <li className="flex items-start space-x-2 xs:space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs xs:text-sm sm:text-base leading-relaxed">Recibirás información de seguimiento cuando tu pedido sea enviado</span>
              </li>
              <li className="flex items-start space-x-2 xs:space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-xs xs:text-sm sm:text-base leading-relaxed">Tu pedido llegará en 5-7 días hábiles</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-xl p-4 xs:p-5 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base xs:text-lg font-semibold text-primary mb-2">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-secondary text-xs xs:text-sm leading-relaxed">
              Si tienes preguntas sobre tu pedido, no dudes en contactarnos en{" "}
              <a href="mailto:contacto@chocoartesanal.com" className="text-action hover:underline break-all">
                contacto@chocoartesanal.com
              </a>{" "}
              o al teléfono{" "}
              <a href="tel:+573001234567" className="text-action hover:underline">
                +57 300 123 4567
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild className="bg-action hover:bg-action/90 text-white py-2.5 xs:py-3 text-sm xs:text-base">
              <a href="/shop">
                <ShoppingBag className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
                Seguir Comprando
              </a>
            </Button>
            
            <Button variant="outline" asChild className="border-gray-300 text-secondary hover:bg-gray-50 py-2.5 xs:py-3 text-sm xs:text-base">
              <a href="/">Volver al Inicio</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
