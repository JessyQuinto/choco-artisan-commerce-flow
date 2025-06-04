
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n2_AaYybSc-oi8aRe4-yADQdflQPJgHRihbTxUd5qvSTtuknxeDKf0rRfuoARX9LW7IXNQM2Eyn_hiqRMWRXBB466EPwiPNjfEiWaLevgdAJ8EydB8VG7ugowjB8NweXz_6JOhsb8zY_iq7uT9RDc--OMwgmksIWyBS4tQYULI3isQJNMySM4JX8iE0K-pUyijAPf4jynySu5vdub-C6GopDl9WI7RlaKqtaXa0bepak7--tPCqgEwgxyca5iPDw8B1wLkFN"
          alt="Artesana chocoana trabajando en sus creaciones"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              <span className="block">Descubre el</span>
              <span className="block text-primary-action">Alma de Chocó</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Artesanías únicas hechas a mano por maestros artesanos afrocolombianos. 
              Cada pieza cuenta una historia de tradición, cultura y amor por el arte.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary-action hover:bg-primary-action/90 text-white px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              asChild
            >
              <Link to="/shop">Explorar Tienda</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-text px-12 py-6 text-xl font-semibold rounded-lg transition-all duration-300 bg-transparent backdrop-blur-sm shadow-lg"
              asChild
            >
              <Link to="/stories">Conoce las Historias</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
