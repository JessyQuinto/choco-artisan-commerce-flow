
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUp, ArrowDown, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  artisan: string;
  origin: string;
  category_id: number;
  materials: string;
  dimensions: string;
  care_instructions: string;
  artisan_story: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const productSlug = searchParams.get('slug');
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Canasta Werregue Tradicional",
      slug: "canasta-werregue-tradicional",
      price: 145000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      description: "Hermosa canasta tejida con fibra de werregue, técnica ancestral transmitida de generación en generación. Esta pieza representa siglos de tradición artesanal del Pacífico colombiano.",
      artisan: "María Eugenia Rentería",
      origin: "Chocó, Colombia",
      category_id: 1,
      materials: "Fibra de werregue natural",
      dimensions: "25cm x 30cm x 15cm",
      care_instructions: "Limpiar con paño húmedo, evitar exposición directa al sol",
      artisan_story: "María Eugenia ha dedicado más de 30 años al arte del tejido con werregue. Aprendió esta técnica de su abuela, quien a su vez la heredó de generaciones anteriores. Cada canasta que crea lleva consigo la sabiduría ancestral de su pueblo y el amor por preservar las tradiciones afrocolombianas."
    },
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada",
      price: 220000,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      description: "Máscara tallada en madera de cativo, utilizada en ceremonias tradicionales del Pacífico.",
      artisan: "Esteban Mosquera",
      origin: "Chocó, Colombia",
      category_id: 2,
      materials: "Madera de cativo, pigmentos naturales",
      dimensions: "20cm x 15cm x 8cm",
      care_instructions: "Mantener en lugar seco, aplicar aceite natural ocasionalmente",
      artisan_story: "Esteban es un maestro tallador que ha perfeccionado su arte durante 25 años. Sus máscaras son utilizadas en ceremonias tradicionales y representan la conexión espiritual de su comunidad con la naturaleza."
    }
  ];

  const mockCategories: Category[] = [
    { id: 1, name: "Cestería", slug: "cesteria" },
    { id: 2, name: "Tallas en Madera", slug: "tallas-madera" }
  ];

  useEffect(() => {
    if (productSlug) {
      // Simulate API call
      setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.slug === productSlug);
        if (foundProduct) {
          setProduct(foundProduct);
          const foundCategory = mockCategories.find(c => c.id === foundProduct.category_id);
          setCategory(foundCategory || null);
          
          // Get related products (same category, excluding current)
          const related = mockProducts.filter(p => 
            p.category_id === foundProduct.category_id && p.id !== foundProduct.id
          ).slice(0, 3);
          setRelatedProducts(related);
        }
        setLoading(false);
      }, 1000);
    }
  }, [productSlug]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log(`Adding ${quantity} of product ${product?.id} to cart`);
    // Show notification
    alert(`¡${product?.name} añadido al carrito!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-selva-600"></div>
          <span className="ml-4 text-choco-600">Cargando producto...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-choco-800 mb-4">Producto no encontrado</h1>
          <Button onClick={() => window.history.back()}>Volver</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-choco-600">
            <li><a href="/" className="hover:text-selva-600">Inicio</a></li>
            <li>/</li>
            <li><a href="/shop" className="hover:text-selva-600">Tienda</a></li>
            <li>/</li>
            {category && (
              <>
                <li><span className="hover:text-selva-600">{category.name}</span></li>
                <li>/</li>
              </>
            )}
            <li className="text-choco-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-selva-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-choco-800 mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-selva-600 mb-6">
                ${product.price.toLocaleString()}
              </div>
              <p className="text-lg text-choco-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-oro-700 font-medium mt-4">
                Creado por {product.artisan}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-choco-700 font-medium">Cantidad:</span>
              <div className="flex items-center border border-choco-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="hover:bg-choco-50"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  className="hover:bg-choco-50"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-oro-500 hover:bg-oro-600 text-white py-4 text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Añadir al Carrito</span>
            </Button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-selva-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-choco-800 mb-6">Detalles del Producto</h2>
            <div className="space-y-4">
              <div className="flex">
                <span className="font-medium text-choco-700 w-32">Material:</span>
                <span className="text-choco-600">{product.materials}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-choco-700 w-32">Dimensiones:</span>
                <span className="text-choco-600">{product.dimensions}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-choco-700 w-32">Cuidados:</span>
                <span className="text-choco-600">{product.care_instructions}</span>
              </div>
              <div className="flex">
                <span className="font-medium text-choco-700 w-32">Origen:</span>
                <span className="text-choco-600">{product.origin}</span>
              </div>
            </div>
          </div>

          <div className="bg-oro-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-choco-800 mb-6">Historia del Artesano</h2>
            <p className="text-choco-600 leading-relaxed">
              {product.artisan_story}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-choco-800 mb-8 text-center">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
