
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  artisan: string;
  origin: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Adding product ${product.id} to cart`);
    alert(`¡${product.name} añadido al carrito!`);
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-secondary/20 overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden">
        <a href={`/product-detail?slug=${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </a>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-primary-action">
          {product.origin}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <div>
          <a href={`/product-detail?slug=${product.slug}`}>
            <h3 className="font-bold text-base md:text-lg text-primary-text group-hover:text-primary-action transition-colors line-clamp-2">
              {product.name}
            </h3>
          </a>
          <p className="text-sm text-primary-secondary line-clamp-2 mt-1">
            {product.description}
          </p>
          <p className="text-xs text-primary-action font-medium mt-2">
            Por {product.artisan}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xl md:text-2xl font-bold text-primary-action">
            ${product.price.toLocaleString()}
          </div>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="bg-primary-action hover:bg-primary-action/90 text-white flex items-center space-x-2 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto justify-center"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">Añadir</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
