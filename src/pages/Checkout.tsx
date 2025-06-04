
import { useState } from "react";
import { CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useStore } from "@/store/useStore";

const Checkout = () => {
  const { cartItems, cartTotal, completeOrder } = useStore();
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
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl xs:text-3xl font-bold text-primary mb-4">Carrito Vacío</h1>
            <p className="text-secondary mb-6 sm:mb-8 text-sm xs:text-base">No tienes productos en tu carrito para proceder al checkout.</p>
            <Button asChild className="bg-action hover:bg-action/90 w-full xs:w-auto">
              <a href="/shop">Ir a la Tienda</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <nav className="mb-4 sm:mb-6 lg:mb-8">
          <ol className="flex items-center space-x-2 text-sm text-secondary">
            <li><a href="/cart" className="hover:text-action">Carrito</a></li>
            <li>/</li>
            <li className="text-primary font-medium">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-primary mb-6 sm:mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Shipping Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white border border-secondary/20 rounded-xl p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                Información de Envío
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm xs:text-base">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.fullName ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm xs:text-base">Dirección *</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.address ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm xs:text-base">Ciudad *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                      className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.city ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode" className="text-sm xs:text-base">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                      className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.postalCode ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm xs:text-base">País *</Label>
                  <select
                    id="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full h-10 xs:h-11 sm:h-12 px-3 py-2 border border-secondary/30 rounded-md focus:outline-none focus:ring-2 focus:ring-action text-sm xs:text-base"
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
            <div className="bg-white border border-secondary/20 rounded-xl p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
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
                  <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer text-sm xs:text-base">
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
                  <Label htmlFor="paypal" className="cursor-pointer text-sm xs:text-base">PayPal</Label>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 border-t border-secondary/20 pt-6">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm xs:text-base">Número de Tarjeta *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                        maxLength={19}
                        className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.cardNumber ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-sm xs:text-base">Fecha de Expiración *</Label>
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
                          className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.expiry ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                        />
                        {errors.expiry && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.expiry}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cvv" className="text-sm xs:text-base">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, "") }))}
                          maxLength={4}
                          className={`h-10 xs:h-11 sm:h-12 text-sm xs:text-base ${errors.cvv ? "border-red-500" : "border-secondary/30 focus:border-action"}`}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs xs:text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-background border border-secondary/20 rounded-xl p-4 sm:p-5 lg:p-6 h-fit lg:sticky lg:top-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-primary text-xs xs:text-sm truncate">{item.name}</h4>
                    <p className="text-secondary text-xs">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-xs xs:text-sm">${item.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 sm:space-y-3 border-t border-secondary/30 pt-3 sm:pt-4">
              <div className="flex justify-between text-sm xs:text-base">
                <span className="text-secondary">Subtotal:</span>
                <span className="font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm xs:text-base">
                <span className="text-secondary">Envío:</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between text-sm xs:text-base">
                <span className="text-secondary">Impuestos:</span>
                <span className="font-semibold">${taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base xs:text-lg border-t border-secondary/30 pt-2 sm:pt-3">
                <span className="font-bold text-primary">Total:</span>
                <span className="font-bold text-action">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="w-full mt-4 sm:mt-6 bg-action hover:bg-action/90 text-white py-3 xs:py-4 text-sm xs:text-base lg:text-lg font-semibold disabled:opacity-50"
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
