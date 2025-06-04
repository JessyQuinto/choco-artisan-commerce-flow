
const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
      {/* Full-width responsive background image */}
      <div className="absolute inset-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5n2_AaYybSc-oi8aRe4-yADQdflQPJgHRihbTxUd5qvSTtuknxeDKf0rRfuoARX9LW7IXNQM2Eyn_hiqRMWRXBB466EPwiPNjfEiWaLevgdAJ8EydB8VG7ugowjB8NweXz_6JOhsb8zY_iq7uT9RDc--OMwgmksIWyBS4tQYULI3isQJNMySM4JX8iE0K-pUyijAPf4jynySu5vdub-C6GopDl9WI7RlaKqtaXa0bepak7--tPCqgEwgxyca5iPDw8B1wLkFN"
          alt="Artesana chocoana trabajando en sus creaciones"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center space-y-6 sm:space-y-8 max-w-6xl mx-auto">
            {/* Main headline */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] sm:leading-tight text-white">
                <span className="block mb-2 sm:mb-3 hero-text-shadow">Descubre el</span>
                <span className="block text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text hero-gradient-text drop-shadow-lg">
                  Alma de Chocó
                </span>
              </h1>
              <div className="max-w-4xl mx-auto px-3 sm:px-4 hero-backdrop rounded-xl py-4 sm:py-6 mt-6 sm:mt-8">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light hero-text-shadow mb-2 sm:mb-3">
                  Artesanías únicas hechas a mano por maestros artesanos afrocolombianos.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light hero-text-shadow">
                  Cada pieza cuenta una historia de tradición, cultura y amor por el arte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Mejorado para móviles */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/60 rounded-full flex justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-1 h-2 sm:h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs sm:text-sm text-white/70 font-light hidden sm:block">Desliza para explorar</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
