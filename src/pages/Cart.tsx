
import { useState, useEffect } from "react";
import { Trash2, ArrowUp, ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Mock cart data
  const mockCartItems: CartItem[] = [
    {
      id: 1,
      product_id: 1,
      name: "Canasta Werregue Tradicional",
      price: 145000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=200&q=80",
      quantity: 2,
      total: 290000
    },
    {
      id: 2,
      product_id: 3,
      name: "Collar de Semillas Nativas",
      price: 85000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=200&q=80",
      quantity: 1,
      total: 85000
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setCartItems(items =>
        items.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
            : item
        )
      );
    }
  };

  const removeItem = (itemId: number) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = 0; // Free shipping
  const taxes = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + shipping + taxes;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-selva-600"></div>
          <span className="ml-4 text-choco-600">Cargando carrito...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-choco-800 mb-8">
          Tu Carrito
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-choco-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-choco-600 mb-8">
              Descubre nuestros productos únicos y añade algunos a tu carrito
            </p>
            <Button asChild className="bg-selva-600 hover:bg-selva-700">
              <a href="/shop">Ir a la Tienda</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-choco-200 rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-choco-800">
                        {item.name}
                      </h3>
                      <p className="text-choco-600">
                        ${item.price.toLocaleString()} c/u
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-choco-600">Cantidad:</span>
                      <div className="flex items-center border border-choco-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="hover:bg-choco-50"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:bg-choco-50"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Total and Remove */}
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-selva-600">
                        ${item.total.toLocaleString()}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-selva-50 rounded-xl p-6 h-fit sticky top-8">
              <h2 className="text-2xl font-bold text-choco-800 mb-6">
                Resumen del Pedido
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-choco-600">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-choco-600">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-choco-600">Impuestos Estimados:</span>
                  <span className="font-semibold">${taxes.toLocaleString()}</span>
                </div>
                <div className="border-t border-choco-300 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-choco-800">Total:</span>
                    <span className="font-bold text-selva-600">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 mb-6">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                />
                <label htmlFor="terms" className="text-sm text-choco-600 leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <a href="#" className="text-selva-600 hover:underline">
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a href="#" className="text-selva-600 hover:underline">
                    política de privacidad
                  </a>
                </label>
              </div>

              <Button
                asChild
                disabled={!acceptTerms}
                className="w-full bg-oro-500 hover:bg-oro-600 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <a href="/checkout">Proceder al Checkout</a>
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
