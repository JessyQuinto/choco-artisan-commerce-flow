
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useStore } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const Cart = () => {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart 
  } = useStore();
  const { showSuccess, showError } = useNotifications();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartQuantity(itemId, newQuantity);
      showSuccess("Cantidad actualizada");
    }
  };

  const handleRemoveItem = (itemId: number, itemName: string) => {
    removeFromCart(itemId);
    showSuccess(`${itemName} eliminado del carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    showSuccess("Carrito vacío");
  };

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.19); // 19% IVA
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!acceptTerms) {
      showError("Debes aceptar los términos y condiciones");
      return;
    }
    
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to checkout
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner size="lg" text="Procesando..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Carrito de Compras</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            Tu Carrito
          </h1>
          {cartCount > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white text-sm xs:text-base px-3 xs:px-4"
            >
              Vaciar Carrito
            </Button>
          )}
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto px-4">
              <ShoppingBag className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 text-secondary/50 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
                Tu carrito está vacío
              </h2>
              <p className="text-secondary mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg leading-relaxed">
                Descubre nuestros productos únicos y añade algunos a tu carrito
              </p>
              <Button asChild className="bg-action hover:bg-action/90 text-white px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base w-full xs:w-auto">
                <Link to="/shop" className="flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-4 w-4 xs:h-5 xs:w-5" />
                  <span>Ir a la Tienda</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mb-4 space-y-2 xs:space-y-0">
                <h2 className="text-lg xs:text-xl font-semibold text-primary">
                  Productos ({cartCount} {cartCount === 1 ? 'artículo' : 'artículos'})
                </h2>
                <Button variant="ghost" asChild className="text-action hover:text-action/80 text-sm xs:text-base px-2 xs:px-3">
                  <Link to="/shop" className="flex items-center space-x-1 xs:space-x-2">
                    <ArrowLeft className="h-3 w-3 xs:h-4 xs:w-4" />
                    <span>Continuar Comprando</span>
                  </Link>
                </Button>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-secondary/20 rounded-xl p-3 xs:p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="flex flex-col space-y-4">
                    {/* Mobile Layout - Stacked */}
                    <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-3 xs:space-y-0 xs:space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-full xs:w-20 sm:w-24 md:w-28">
                        <Link to={`/product-detail?slug=${item.slug}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg hover:opacity-80 transition-opacity"
                          />
                        </Link>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 space-y-1 xs:space-y-2">
                        <Link to={`/product-detail?slug=${item.slug}`}>
                          <h3 className="text-base xs:text-lg font-semibold text-primary hover:text-action transition-colors truncate">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-secondary text-xs xs:text-sm line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <p className="text-action font-medium text-xs xs:text-sm">
                          Por {item.artisan} • {item.origin}
                        </p>
                        <p className="text-base xs:text-lg font-bold text-action">
                          ${item.price.toLocaleString()} c/u
                        </p>
                      </div>

                      {/* Remove Button - Top Right on Mobile */}
                      <div className="xs:hidden absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full bg-white/80"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Mobile Controls Row */}
                    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between space-y-3 xs:space-y-0 pt-3 border-t border-secondary/20">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 xs:space-x-3">
                        <span className="text-xs xs:text-sm text-secondary font-medium whitespace-nowrap">
                          Cantidad:
                        </span>
                        <div className="flex items-center border border-secondary/30 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 xs:h-8 xs:w-8 p-0 hover:bg-secondary/20"
                          >
                            <Minus className="h-3 w-3 xs:h-4 xs:w-4" />
                          </Button>
                          <span className="px-2 xs:px-4 py-1 xs:py-2 font-medium min-w-[2.5rem] xs:min-w-[3rem] text-center text-sm xs:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-7 w-7 xs:h-8 xs:w-8 p-0 hover:bg-secondary/20"
                          >
                            <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Total and Remove (Desktop) */}
                      <div className="flex items-center justify-between xs:justify-end space-x-3 xs:space-x-4 w-full xs:w-auto">
                        <div className="text-lg xs:text-xl font-bold text-action">
                          ${item.total.toLocaleString()}
                        </div>
                        <div className="hidden xs:block">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-background border border-secondary/20 rounded-xl p-4 xs:p-5 sm:p-6 h-fit lg:sticky lg:top-8 shadow-lg">
              <h2 className="text-xl xs:text-2xl font-bold text-primary mb-4 xs:mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-3 xs:space-y-4 mb-5 xs:mb-6">
                <div className="flex justify-between text-sm xs:text-base">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm xs:text-base">
                  <span className="text-secondary">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm xs:text-base">
                  <span className="text-secondary">IVA (19%):</span>
                  <span className="font-semibold">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-secondary/30 pt-3 xs:pt-4">
                  <div className="flex justify-between text-base xs:text-lg">
                    <span className="font-bold text-primary">Total:</span>
                    <span className="font-bold text-action text-lg xs:text-xl">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 xs:space-x-3 mb-5 xs:mb-6">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs xs:text-sm text-secondary leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={!acceptTerms || cartCount === 0}
                className="w-full bg-action hover:bg-action/90 text-white py-3 xs:py-4 text-base xs:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                asChild={acceptTerms && cartCount > 0}
              >
                {acceptTerms && cartCount > 0 ? (
                  <Link to="/checkout">Proceder al Checkout</Link>
                ) : (
                  <span>Proceder al Checkout</span>
                )}
              </Button>

              <p className="text-xs text-secondary mt-3 xs:mt-4 text-center">
                Compra segura y protegida
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
