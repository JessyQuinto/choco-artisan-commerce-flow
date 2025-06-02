
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-background via-white to-primary-background py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary-secondary rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary-action rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-primary-text rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary-text">Descubre el</span>
                <br />
                <span className="text-primary-action">Alma de Chocó</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-secondary leading-relaxed max-w-xl">
                Artesanías únicas hechas a mano por maestros artesanos afrocolombianos. 
                Cada pieza cuenta una historia de tradición, cultura y amor por el arte.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary-action hover:bg-primary-action/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href="/shop">Explorar Tienda</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-secondary text-primary-text hover:bg-primary-background px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Conoce las Historias
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-action">500+</div>
                <div className="text-sm text-primary-secondary">Artesanías Únicas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-action">50+</div>
                <div className="text-sm text-primary-secondary">Artesanos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-action">100%</div>
                <div className="text-sm text-primary-secondary">Auténtico</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-float">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n2_AaYybSc-oi8aRe4-yADQdflQPJgHRihbTxUd5qvSTtuknxeDKf0rRfuoARX9LW7IXNQM2Eyn_hiqRMWRXBB466EPwiPNjfEiWaLevgdAJ8EydB8VG7ugowjB8NweXz_6JOhsb8zY_iq7uT9RDc--OMwgmksIWyBS4tQYULI3isQJNMySM4JX8iE0K-pUyijAPf4jynySu5vdub-C6GopDl9WI7RlaKqtaXa0bepak7--tPCqgEwgxyca5iPDw8B1wLkFN"
                alt="Artesana chocoana trabajando en sus creaciones"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-primary-action/20">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-action rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-primary-text">Comercio Justo</div>
                  <div className="text-xs text-primary-secondary">Directo del artesano</div>
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
