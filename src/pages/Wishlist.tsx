
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Breadcrumb className="mb-4 sm:mb-6 lg:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lista de Favoritos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-3 mb-6 sm:mb-8">
          <Heart className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 text-action flex-shrink-0" />
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            Mis Favoritos
          </h1>
          {wishlist.length > 0 && (
            <span className="bg-action text-white text-xs xs:text-sm px-2 xs:px-3 py-1 rounded-full ml-auto xs:ml-0">
              {wishlist.length}
            </span>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto px-4">
              <Heart className="h-16 w-16 xs:h-20 xs:w-20 sm:h-24 sm:w-24 text-secondary/50 mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
                Tu lista de favoritos está vacía
              </h2>
              <p className="text-secondary mb-6 sm:mb-8 text-sm xs:text-base sm:text-lg leading-relaxed">
                Explora nuestra tienda y guarda los productos que más te gusten para encontrarlos fácilmente después.
              </p>
              <Button asChild className="bg-action hover:bg-action/90 text-white px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base w-full xs:w-auto">
                <Link to="/shop" className="flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-4 w-4 xs:h-5 xs:w-5" />
                  <span>Explorar Tienda</span>
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <p className="text-secondary text-sm xs:text-base sm:text-lg">
                {wishlist.length} {wishlist.length === 1 ? 'producto guardado' : 'productos guardados'}
              </p>
              <Button asChild variant="outline" className="border-action text-action hover:bg-action hover:text-white text-sm xs:text-base px-3 xs:px-4 w-full sm:w-auto">
                <Link to="/shop" className="flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-3 w-3 xs:h-4 xs:w-4" />
                  <span>Continuar Comprando</span>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
