
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-text text-white relative z-10 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 xs:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-action to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm xs:text-lg sm:text-xl">C</span>
              </div>
              <div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold">Chocó Artesanal</h3>
                <p className="text-xs xs:text-sm text-gray-300">Tesoros del Pacífico</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed max-w-sm">
              Conectando el talento artesanal afrocolombiano con el mundo, 
              preservando tradiciones y creando oportunidades justas.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Enlaces Rápidos</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#tienda" className="text-gray-300 hover:text-white transition-colors">Tienda</a></li>
              <li><a href="#historias" className="text-gray-300 hover:text-white transition-colors">Historias Culturales</a></li>
              <li><a href="#nosotros" className="text-gray-300 hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Categorías */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Categorías</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cestería</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Textiles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cerámica</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Joyería</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Instrumentos</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Soporte</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de Envíos</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-gray-300 text-xs xs:text-sm order-2 sm:order-1">
              © 2024 Chocó Artesanal. Todos los derechos reservados.
            </p>
            
            <div className="flex flex-col xs:flex-row items-center space-y-2 xs:space-y-0 xs:space-x-4 order-1 sm:order-2">
              <span className="text-gray-300 text-xs xs:text-sm">Síguenos:</span>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                  <Facebook className="h-4 w-4 xs:h-5 xs:w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                  <Instagram className="h-4 w-4 xs:h-5 xs:w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors p-1">
                  <Twitter className="h-4 w-4 xs:h-5 xs:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
