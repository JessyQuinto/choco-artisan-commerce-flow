
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count

  return (
    <header className="bg-white shadow-sm border-b border-choco-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-selva-500 to-choco-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-choco-800">
                <a href="/">Chocó Artesanal</a>
              </h1>
              <p className="text-xs text-choco-600 hidden sm:block">Tesoros del Pacífico</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-choco-700 hover:text-selva-600 font-medium transition-colors">
              Inicio
            </a>
            <a href="/shop" className="text-choco-700 hover:text-selva-600 font-medium transition-colors">
              Tienda
            </a>
            <a href="#historias" className="text-choco-700 hover:text-selva-600 font-medium transition-colors">
              Historias
            </a>
            <a href="#nosotros" className="text-choco-700 hover:text-selva-600 font-medium transition-colors">
              Sobre Nosotros
            </a>
            <a href="#contacto" className="text-choco-700 hover:text-selva-600 font-medium transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative" asChild>
              <a href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-oro-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-choco-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-choco-700 hover:text-selva-600 font-medium py-2 transition-colors">
                Inicio
              </a>
              <a href="/shop" className="text-choco-700 hover:text-selva-600 font-medium py-2 transition-colors">
                Tienda
              </a>
              <a href="#historias" className="text-choco-700 hover:text-selva-600 font-medium py-2 transition-colors">
                Historias
              </a>
              <a href="#nosotros" className="text-choco-700 hover:text-selva-600 font-medium py-2 transition-colors">
                Sobre Nosotros
              </a>
              <a href="#contacto" className="text-choco-700 hover:text-selva-600 font-medium py-2 transition-colors">
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
