
import { useState } from "react";
import { CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrderSummaryItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const Checkout = () => {
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

  // Mock order summary data
  const orderItems: OrderSummaryItem[] = [
    {
      name: "Canasta Werregue Tradicional",
      quantity: 2,
      price: 290000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Collar de Semillas Nativas",
      quantity: 1,
      price: 85000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=100&q=80"
    }
  ];

  const subtotal = 375000;
  const shipping = 0;
  const taxes = 37500;
  const total = 412500;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Shipping validation
    if (!shippingInfo.fullName.trim()) newErrors.fullName = "El nombre completo es requerido";
    if (!shippingInfo.address.trim()) newErrors.address = "La dirección es requerida";
    if (!shippingInfo.city.trim()) newErrors.city = "La ciudad es requerida";
    if (!shippingInfo.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";

    // Credit card validation (if selected)
    if (paymentMethod === "credit-card") {
      if (!cardInfo.number.replace(/\s/g, "")) newErrors.cardNumber = "El número de tarjeta es requerido";
      if (!cardInfo.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Formato inválido (MM/AA)";
      if (!cardInfo.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      // Redirect to order confirmation
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-choco-600">
            <li><a href="/cart" className="hover:text-selva-600">Carrito</a></li>
            <li>/</li>
            <li className="text-choco-800 font-medium">Checkout</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-choco-800 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white border border-choco-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-choco-800 mb-6">
                Información de Envío
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nombre Completo *</Label>
                  <Input
                    id="fullName"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                    className={errors.address ? "border-red-500" : ""}
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
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                      className={errors.postalCode ? "border-red-500" : ""}
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
                    className="w-full px-3 py-2 border border-choco-300 rounded-md focus:outline-none focus:ring-2 focus:ring-selva-500"
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
            <div className="bg-white border border-choco-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-choco-800 mb-6">
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
                    className="text-selva-600"
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
                    className="text-selva-600"
                  />
                  <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                </div>

                {/* Credit Card Fields */}
                {paymentMethod === "credit-card" && (
                  <div className="mt-6 space-y-4 border-t border-choco-200 pt-6">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                        maxLength={19}
                        className={errors.cardNumber ? "border-red-500" : ""}
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
                          className={errors.expiry ? "border-red-500" : ""}
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
                          className={errors.cvv ? "border-red-500" : ""}
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
          <div className="bg-selva-50 rounded-xl p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-choco-800 mb-6">
              Resumen del Pedido
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-choco-800 text-sm">{item.name}</h4>
                    <p className="text-choco-600 text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-choco-300 pt-4">
              <div className="flex justify-between">
                <span className="text-choco-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-choco-600">Envío:</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between">
                <span className="text-choco-600">Impuestos:</span>
                <span className="font-semibold">${taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-choco-300 pt-3">
                <span className="font-bold text-choco-800">Total:</span>
                <span className="font-bold text-selva-600">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="w-full mt-6 bg-oro-500 hover:bg-oro-600 text-white py-4 text-lg font-semibold disabled:opacity-50"
            >
              {processing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
