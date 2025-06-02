
import { useState } from "react";
import { Star, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  const mockProduct = {
    id: 1,
    name: "Canasta Werregue Tradicional",
    slug: "canasta-werregue-tradicional",
    price: 145000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFaUMzL0TJ3ftO-Z9NP77vsHxLxWz8xqypo9txaRXzBkKEJA-6B0kNc9RmimWHtg5DYe0bR9z4VK4dwwJQ_PGvoSgHiUu-fYFKRnnpIbPjOf1Y3dnWXLJeZz8ePVufdb1XbL5FNmTLl6YE_9BqI5KPoUZSZbeOOmqTDoTiSf4GZKpcrt8vviX4rnPpSHLg5VqN4O33vX86QBQOuDfwxajQlmG6gXXI1j-uQjzzvK0cyGTTpoCNEybCHkvK9n0_zf4AlEd9Zhao",
    description: "Esta hermosa canasta werregue es un ejemplo perfecto de la artesanía tradicional del Pacífico colombiano. Tejida completamente a mano utilizando fibras naturales de la palma werregue, cada pieza es única y representa siglos de conocimiento ancestral transmitido de generación en generación.",
    category: "Cestería",
    materials: "Fibra de werregue natural",
    dimensions: "25 cm de diámetro x 15 cm de altura",
    careInstructions: "Limpiar con paño seco. Evitar exposición directa al sol.",
    origin: "Chocó, Colombia",
    artisan: "María Eugenia Rentería",
    artisanStory: "María Eugenia ha dedicado más de 30 años al arte del tejido werregue. Aprendió esta técnica de su abuela cuando tenía apenas 12 años, y desde entonces ha perfeccionado su craft, convirtiéndose en una de las maestras tejedoras más respetadas de su comunidad. Sus creaciones no solo son hermosas, sino que también preservan una tradición cultural invaluable."
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada",
      price: 220000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4ETYgokQhj0nQBAVVmX7jxxWPqRwDD77G87DzC-MtkjkH7VBJvOGXdb1N6NqbqhNLMiOstfWZds4tKmJrhS_MHjwuLJeJy4l-M2MmvLGlcq9BxNsypxw0YDJA6-4sWTEZdr5KNz1b9NoDjgXx33_AnVhGOtpEiKgYKWlFziDiysWTvAVDzT5Z9lQI7nNbACCu8ARdK3ih1G7gQgpwJGu9ADij66Cs84Qg8u3M_Edkcmy8Qp2VTPF9OCBWAfqRDR3kIUHCE1HY",
      description: "Máscara tallada en madera de cativo",
      artisan: "Esteban Mosquera",
      origin: "Chocó"
    },
    {
      id: 3,
      name: "Collar de Semillas Nativas",
      slug: "collar-semillas-nativas",
      price: 85000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCB3cuxe17dLdnRPw5cAkauzqFxQvWLXVvGlSVpZa-1flKj0CvY0cpvtVtxd50EOgSgrZqpd-pf84xyhdRZ3t9h9ZvWoFRcoLXnlTPKRJsYRRqBeqXraKNKKgdG2KpHMMxgXIXlSR4zsjKvpnPn7cHxV1dOh3CR8Kh7DQYNhNlCRN_5t9XOXD5inpGtfvwD3wWJMIVf-oUHXvgTtQ9fp9BpKBrfS6tek19Xw9r8dp0AtiSbBqrrU_FEbRCVF0cY_ggAx5d0uSA",
      description: "Collar elaborado con semillas de la selva",
      artisan: "Yurany Palacios",
      origin: "Chocó"
    },
    {
      id: 4,
      name: "Tambor Currulao Artesanal",
      slug: "tambor-currulao-artesanal",
      price: 180000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmFalOoc0UJxnoTjxOSjaD77-9sNtPEnOKHhiPvXXLexU4fzNpj6E3r5XenD36rr14XqnPgjYkbbLeRCjPHxzXqTGVGxUbBQLbkpxJWr2k4nbMdEGyQxkfuoTVGYaL16xiOApLWMT50U7Lm-7sx2Z8HD5t6_D6cbgQ3jNH02vx7i3RuiDVQjERop1O6wgAk3JhU1nRj2CRO_gioJ-1BgZ7RTfRfvZWC4MgFUbzWqUk7UuLU9n4xx-p_r8PnlWgcNCD9HIX6K7y",
      description: "Tambor tradicional para currulao",
      artisan: "Carlos Moreno",
      origin: "Chocó"
    }
  ];

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${quantity} of product ${mockProduct.id} to cart`);
    alert(`¡${quantity} x ${mockProduct.name} añadido al carrito!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Product Image */}
          <div className="order-1 lg:order-1">
            <img
              src={mockProduct.image}
              alt={mockProduct.name}
              className="w-full h-auto rounded-xl shadow-md object-cover max-h-96 md:max-h-none"
            />
          </div>

          {/* Product Info */}
          <div className="order-2 lg:order-2 space-y-4 md:space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-text">
              {mockProduct.name}
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 md:h-5 md:w-5 text-gray-300" />
              </div>
              <span className="text-primary-secondary text-sm md:text-base">
                (32 valoraciones)
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary-action">
              ${mockProduct.price.toLocaleString()}
            </div>
            <p className="text-primary-secondary leading-relaxed text-sm md:text-base">
              {mockProduct.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Quantity */}
              <div className="flex items-center border border-primary-secondary/30 rounded-lg w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  className="hover:bg-primary-background px-3 py-2"
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 font-medium flex-grow text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="hover:bg-primary-background px-3 py-2"
                >
                  +
                </Button>
              </div>

              {/* Add to Cart */}
              <Button
                className="bg-primary-action hover:bg-primary-action/90 text-white flex items-center justify-center space-x-2 rounded-lg px-6 py-3 w-full sm:w-auto"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Añadir al Carrito</span>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 pt-4 border-t border-primary-secondary/20">
              <div className="flex items-center space-x-2 text-primary-secondary">
                <Truck className="h-4 w-4" />
                <span className="text-sm md:text-base">Envío gratis a todo el país</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <p className="text-primary-secondary">
                  <span className="font-medium">Categoría:</span> {mockProduct.category}
                </p>
                <p className="text-primary-secondary">
                  <span className="font-medium">Materiales:</span> {mockProduct.materials}
                </p>
                <p className="text-primary-secondary">
                  <span className="font-medium">Dimensiones:</span> {mockProduct.dimensions}
                </p>
                <p className="text-primary-secondary">
                  <span className="font-medium">Cuidados:</span> {mockProduct.careInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Info */}
        <div className="mb-12 bg-primary-background border border-primary-secondary/20 rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-primary-text mb-4 md:mb-6">
            Sobre el Artesano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2jvYcgUdbO3j_QmJPRSCbJeAMz2SfGi9AfeKEr9XnG3VlHPxaCFDwrKvCnsnPaMCMMlNfaVFA_V2S9MdVCZQQaR1uknllkTBbdX81L1uwxzdFBf-qiX97m0tSuDShVXVS4q6V1mpV82iqU195Gs4ZIo2MC23wUNZEVLDy8ilkV504DJDyME7D6xheARyvgL54b50c-EF9uWtFE-bZnSxvs8YaEwPylTu8marr8C-PxmSrxAEKNBv_a_eD-zc01JdY331G_Wo2"
                alt={`Foto de ${mockProduct.artisan}`}
                className="w-full h-40 md:h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-primary-text">
                {mockProduct.artisan}
              </h3>
              <p className="text-primary-secondary">
                <span className="font-medium">Origen:</span> {mockProduct.origin}
              </p>
              <p className="text-primary-secondary leading-relaxed text-sm md:text-base">
                {mockProduct.artisanStory}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-primary-text mb-6">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
