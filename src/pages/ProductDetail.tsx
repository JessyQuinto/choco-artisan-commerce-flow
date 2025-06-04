
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('slug') || 'canasta-werregue-tradicional';
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, removeFromWishlist } = useStore();
  const wishlist = useStore(state => state.wishlist);
  const { showSuccess } = useNotifications();

  // Mock product data - to be replaced with API call
  const product = {
    id: 1,
    name: "Canasta Werregue Tradicional",
    slug: "canasta-werregue-tradicional",
    price: 125000,
    originalPrice: 150000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1",
    description: "Hermosa canasta tejida a mano con técnica ancestral werregue por artesanas del Chocó. Cada pieza es única y representa siglos de tradición cultural afrocolombiana.",
    longDescription: "Esta canasta werregue es el resultado de un proceso artesanal que puede tomar hasta una semana de trabajo continuo. Las fibras de palma werregue son recolectadas en las primeras horas del amanecer, cuando mantienen su flexibilidad natural. Luego son tratadas con tintes naturales obtenidos de plantas y cortezas del bosque chocoano para crear los hermosos patrones que caracterizan estas piezas únicas.",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn"
    ],
    artisan: "María del Carmen Mosquera",
    origin: "Quibdó, Chocó",
    category: "Cestas y Canastas",
    materials: ["Fibra de werregue", "Tintes naturales"],
    dimensions: "30cm x 25cm x 15cm",
    inStock: true,
    rating: 4.8,
    reviews: 24
  };

  const inWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(`¡${product.name} añadido al carrito!`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showSuccess(`${product.name} eliminado de favoritos`);
    } else {
      addToWishlist(product);
      showSuccess(`¡${product.name} añadido a favoritos!`);
    }
  };

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
              <BreadcrumbLink href="/shop">Tienda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-action' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary-secondary">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text mb-2">
                {product.name}
              </h1>
              <p className="text-primary-secondary">
                Por <span className="font-medium">{product.artisan}</span> • {product.origin}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-2xl md:text-3xl font-bold text-primary-action">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-primary-secondary line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            <p className="text-primary-secondary text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-primary-background rounded-xl">
              <div>
                <h4 className="font-semibold text-primary-text mb-2">Detalles del Producto</h4>
                <ul className="space-y-1 text-sm text-primary-secondary">
                  <li><strong>Categoría:</strong> {product.category}</li>
                  <li><strong>Dimensiones:</strong> {product.dimensions}</li>
                  <li><strong>Materiales:</strong> {product.materials.join(', ')}</li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <Truck className="h-4 w-4" />
                  <span>Envío gratis a toda Colombia</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <Shield className="h-4 w-4" />
                  <span>Garantía de autenticidad</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-primary-secondary">
                  <RotateCcw className="h-4 w-4" />
                  <span>Devoluciones en 30 días</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-primary-text">Cantidad:</label>
                <div className="flex items-center border border-primary-secondary/30 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-primary-secondary hover:text-primary-action"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-primary-secondary hover:text-primary-action"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-action hover:bg-primary-action/90 text-white border-0 shadow-md hover:shadow-lg transition-all"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al Carrito
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  size="lg"
                  className={`border-primary-action ${
                    inWishlist 
                      ? 'bg-primary-action text-white' 
                      : 'text-primary-action hover:bg-primary-action hover:text-white'
                  } border-2 shadow-sm hover:shadow-md transition-all`}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-primary-text mb-6">Descripción Detallada</h3>
          <p className="text-primary-secondary text-lg leading-relaxed">
            {product.longDescription}
          </p>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
