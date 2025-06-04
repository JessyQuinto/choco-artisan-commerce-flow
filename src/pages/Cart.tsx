
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            Tu Carrito
          </h1>
          {cartCount > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              Vaciar Carrito
            </Button>
          )}
        </div>

        {cartCount === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="h-24 w-24 text-secondary/50 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-secondary mb-8 text-lg">
                Descubre nuestros productos únicos y añade algunos a tu carrito
              </p>
              <Button asChild className="bg-action hover:bg-action/90 text-white">
                <Link to="/shop" className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Ir a la Tienda</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-primary">
                  Productos ({cartCount} {cartCount === 1 ? 'artículo' : 'artículos'})
                </h2>
                <Button variant="ghost" asChild className="text-action hover:text-action/80">
                  <Link to="/shop" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Continuar Comprando</span>
                  </Link>
                </Button>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-secondary/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Link to={`/product-detail?slug=${item.slug}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <Link to={`/product-detail?slug=${item.slug}`}>
                        <h3 className="text-lg font-semibold text-primary hover:text-action transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-secondary text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-action font-medium">
                        Por {item.artisan} • {item.origin}
                      </p>
                      <p className="text-lg font-bold text-action">
                        ${item.price.toLocaleString()} c/u
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-secondary font-medium">Cantidad:</span>
                      <div className="flex items-center border border-secondary/30 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0 hover:bg-secondary/20"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-secondary/20"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Total and Remove */}
                    <div className="flex items-center space-x-4">
                      <div className="text-xl font-bold text-action">
                        ${item.total.toLocaleString()}
                      </div>
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
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-background border border-secondary/20 rounded-xl p-6 h-fit sticky top-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">IVA (19%):</span>
                  <span className="font-semibold">${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-secondary/30 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-primary">Total:</span>
                    <span className="font-bold text-action text-xl">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 mb-6">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <label htmlFor="terms" className="text-sm text-secondary leading-relaxed cursor-pointer">
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
                className="w-full bg-action hover:bg-action/90 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                asChild={acceptTerms && cartCount > 0}
              >
                {acceptTerms && cartCount > 0 ? (
                  <Link to="/checkout">Proceder al Checkout</Link>
                ) : (
                  <span>Proceder al Checkout</span>
                )}
              </Button>

              <p className="text-xs text-secondary mt-4 text-center">
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
