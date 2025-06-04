
import { useState } from "react";
import { CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useStore, useCartItems, useCartTotal } from "@/store/useStore";

const Checkout = () => {
  const { completeOrder } = useStore();
  const cartItems = useCartItems();
  const cartTotal = useCartTotal();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [processing, setProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Colombia"
  });
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal;
  const shipping = 0;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + taxes;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
    if (!shippingInfo.address.trim()) newErrors.address = "La dirección es requerida";
    if (!shippingInfo.city.trim()) newErrors.city = "La ciudad es requerida";
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";

    if (paymentMethod === "credit-card") {
      if (!cardInfo.number.replace(/\s/g, "")) newErrors.cardNumber = "El número de tarjeta es requerido";
      if (!cardInfo.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Formato inválido (MM/AA)";
      if (!cardInfo.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm() || cartItems.length === 0) return;

    setProcessing(true);
    
    setTimeout(() => {
      // Complete the order and clear the cart
      completeOrder();
      setProcessing(false);
      
      const orderId = Math.random().toString(36).substr(2, 9);
      window.location.href = `/order-confirmation?order_id=${orderId}`;
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-text mb-4">Carrito Vacío</h1>
            <p className="text-primary-secondary mb-8">No tienes productos en tu carrito para proceder al checkout.</p>
            <Button asChild className="bg-action hover:bg-action/90">
              <a href="/shop">Ir a la Tienda</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-primary-secondary">
            <li><a href="/cart" className="hover:text-primary-action">Carrito</a></li>
            <li>/</li>
            <li className="text-primary-text font-medium">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Information */}
          <div className="space-y-8">
            <div className="bg-white border border-secondary/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                Información de Envío
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className={errors.fullName ? "border-red-500" : "border-secondary/30 focus:border-action"}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className={errors.address ? "border-red-500" : "border-secondary/30 focus:border-action"}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className={errors.city ? "border-red-500" : "border-secondary/30 focus:border-action"}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                      className={errors.postalCode ? "border-red-500" : "border-secondary/30 focus:border-action"}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">País *</Label>
                  <select
                    id="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 border border-secondary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-action"
                  >
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="España">España</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-secondary/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary-text mb-6">
                Método de Pago
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-action"
                  />
                  <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Tarjeta de Crédito</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-action"
                  />
                  <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 border-t border-secondary/20 pt-6">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-500" : "border-secondary/30 focus:border-action"}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Fecha de Expiración *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={cardInfo.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, "");
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + "/" + value.substring(2, 4);
                            }
                            setCardInfo(prev => ({ ...prev, expiry: value }));
                          }}
                          maxLength={5}
                          className={errors.expiry ? "border-red-500" : "border-secondary/30 focus:border-action"}
                        />
                        {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                          maxLength={4}
                          className={errors.cvv ? "border-red-500" : "border-secondary/30 focus:border-action"}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-primary-background rounded-xl p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-primary-text text-sm">{item.name}</h4>
                    <p className="text-primary-secondary text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-secondary/30 pt-4">
              <div className="flex justify-between">
                <span className="text-primary-secondary">Subtotal:</span>
                <span className="font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-secondary">Envío:</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-secondary">Impuestos:</span>
                <span className="font-semibold">${taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-secondary/30 pt-3">
                <span className="font-bold text-primary-text">Total:</span>
                <span className="font-bold text-action">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="w-full mt-6 bg-action hover:bg-action/90 text-white py-4 text-lg font-semibold disabled:opacity-50"
            >
              {processing ? (
                <div className="flex items-center justify-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Procesando...</span>
                </div>
              ) : (
                "Realizar Pedido"
              )}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
