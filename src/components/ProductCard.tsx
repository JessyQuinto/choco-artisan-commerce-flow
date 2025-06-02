
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
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
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-choco-100 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-selva-700">
          {product.origin}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-choco-800 group-hover:text-selva-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-choco-600 line-clamp-2 mt-1">
            {product.description}
          </p>
          <p className="text-xs text-oro-700 font-medium mt-2">
            Por {product.artisan}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-selva-600">
            ${product.price.toLocaleString()}
          </div>
          <Button 
            size="sm" 
            className="bg-oro-500 hover:bg-oro-600 text-white flex items-center space-x-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Añadir</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
