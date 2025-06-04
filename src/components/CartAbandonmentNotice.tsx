
import { useEffect, useState } from 'react';
import { AlertTriangle, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';

const CartAbandonmentNotice = () => {
  const { cartCount, cartTotal } = useStore();
  const [showNotice, setShowNotice] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartCount > 0 && !hasBeenDismissed) {
      const timer = setTimeout(() => {
        setShowNotice(true);
      }, 30000); // Show after 30 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [cartCount, hasBeenDismissed]);

  const handleDismiss = () => {
    setShowNotice(false);
    setHasBeenDismissed(true);
    localStorage.setItem('cartNotificationDismissed', Date.now().toString());
  };

  const handleGoToCart = () => {
    navigate('/cart');
    setShowNotice(false);
  };

  if (!showNotice || cartCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-orange-200 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-in slide-in-from-bottom">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">
            ¡No olvides tu carrito!
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            Tienes {cartCount} {cartCount === 1 ? 'producto' : 'productos'} por ${cartTotal.toLocaleString()}
          </p>
          <div className="flex space-x-2 mt-3">
            <Button
              size="sm"
              onClick={handleGoToCart}
              className="bg-action hover:bg-action/90 text-white text-xs h-7 px-3"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Ver Carrito
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700 text-xs h-7 px-2"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAbandonmentNotice;
