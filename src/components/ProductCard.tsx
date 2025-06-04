import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { memo, useCallback } from "react";
import { useCartActions, useWishlistActions, useIsInWishlist } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";
import LazyImage from "./LazyImage";

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

const ProductCard = memo(({ product }: ProductCardProps) => {
  const { addToCart } = useCartActions();
  const { addToWishlist, removeFromWishlist } = useWishlistActions();
  const { showSuccess } = useNotifications();
  const inWishlist = useIsInWishlist(product.id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showSuccess(`¡${product.name} añadido al carrito!`);
  }, [addToCart, product, showSuccess]);

  const handleWishlistToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      showSuccess(`${product.name} eliminado de favoritos`);
    } else {
      addToWishlist(product);
      showSuccess(`${product.name} añadido a favoritos`);
    }
  }, [inWishlist, removeFromWishlist, addToWishlist, product, showSuccess]);

  const productDetailLink = `/product-detail?slug=${product.slug}`;
  const formattedPrice = product.price.toLocaleString();

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-secondary/20 overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden">
        <Link to={productDetailLink}>          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-44 xs:h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-action shadow-sm">
          {product.origin}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlistToggle}
          className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm ${
            inWishlist 
              ? 'bg-action text-white hover:bg-action/90' 
              : 'bg-white/90 text-secondary hover:bg-white hover:text-action'
          }`}
          aria-label={inWishlist ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
        </Button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-3 xs:p-4 md:p-6 space-y-3 md:space-y-4">
        <div>
          <Link to={productDetailLink}>
            <h3 className="font-bold text-sm xs:text-base md:text-lg text-primary group-hover:text-action transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs xs:text-sm text-secondary line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
          <p className="text-xs text-action font-medium mt-2">
            Por {product.artisan}
          </p>
        </div>

        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-3">
          <div className="text-lg xs:text-xl md:text-2xl font-bold text-action">
            ${formattedPrice}
          </div>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="bg-action hover:bg-action/90 text-white flex items-center space-x-2 rounded-lg transition-all duration-300 transform hover:scale-105 w-full xs:w-auto justify-center shadow-md hover:shadow-lg text-xs xs:text-sm"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCart className="h-3 w-3 xs:h-4 xs:w-4" />
            <span>Añadir</span>
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
