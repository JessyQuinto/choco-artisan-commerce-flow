
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-selva-50 via-white to-oro-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-selva-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-oro-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-choco-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-choco-800">Descubre el</span>
                <br />
                <span className="text-selva-600">Alma de Chocó</span>
              </h1>
              <p className="text-lg md:text-xl text-choco-600 leading-relaxed max-w-xl">
                Artesanías únicas hechas a mano por maestros artesanos afrocolombianos. 
                Cada pieza cuenta una historia de tradición, cultura y amor por el arte.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-selva-600 hover:bg-selva-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Explorar Tienda
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-choco-300 text-choco-700 hover:bg-choco-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Conoce las Historias
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-selva-600">500+</div>
                <div className="text-sm text-choco-600">Artesanías Únicas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-oro-600">50+</div>
                <div className="text-sm text-choco-600">Artesanos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pacifico-600">100%</div>
                <div className="text-sm text-choco-600">Auténtico</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Artesana chocoana trabajando en sus creaciones"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-oro-200">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-selva-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-choco-800">Comercio Justo</div>
                  <div className="text-xs text-choco-600">Directo del artesano</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
