import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-6xl xs:text-7xl sm:text-8xl font-bold text-action mb-4">404</h1>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
              Página no encontrada
            </h2>
            <p className="text-secondary text-sm xs:text-base sm:text-lg leading-relaxed">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Button asChild className="w-full xs:w-auto bg-action hover:bg-action/90 text-white px-6 py-3 text-sm xs:text-base">
              <Link to="/" className="flex items-center justify-center space-x-2">
                <Home className="h-4 w-4 xs:h-5 xs:w-5" />
                <span>Volver al Inicio</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full xs:w-auto border-action text-action hover:bg-action hover:text-white px-6 py-3 text-sm xs:text-base">
              <Link to="/shop" className="flex items-center justify-center space-x-2">
                <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5" />
                <span>Explorar Tienda</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
