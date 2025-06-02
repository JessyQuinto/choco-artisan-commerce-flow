
import { ShoppingCart, Search, Menu, User, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const [isLoggedIn] = useState(false); // Mock auth state
  const [user] = useState({ name: "Usuario", email: "usuario@email.com" }); // Mock user

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-primary-secondary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-action to-primary-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">C</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary-text">
                <a href="/">Chocó Artesanal</a>
              </h1>
              <p className="text-xs text-primary-secondary hidden sm:block">Tesoros del Pacífico</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href="/" className="text-primary-text hover:text-primary-action font-medium transition-colors">
              Inicio
            </a>
            <a href="/shop" className="text-primary-text hover:text-primary-action font-medium transition-colors">
              Tienda
            </a>
            <a href="/#historias" className="text-primary-text hover:text-primary-action font-medium transition-colors">
              Historias
            </a>
            <a href="/about" className="text-primary-text hover:text-primary-action font-medium transition-colors">
              Sobre Nosotros
            </a>
            <a href="/contact" className="text-primary-text hover:text-primary-action font-medium transition-colors">
              Contacto
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background p-2">
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Auth Section - Hidden on small screens when menu is closed */}
            <div className="hidden md:flex items-center space-x-2">
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background" asChild>
                    <a href="/profile" className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user.name}</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background p-2">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background text-xs lg:text-sm" asChild>
                    <a href="/login">Iniciar Sesión</a>
                  </Button>
                  <Button size="sm" className="bg-primary-action hover:bg-primary-action/90 text-white text-xs lg:text-sm" asChild>
                    <a href="/register">Registrarse</a>
                  </Button>
                </>
              )}
            </div>

            <Button variant="ghost" size="sm" className="relative text-primary-secondary hover:text-primary-action hover:bg-primary-background p-2" asChild>
              <a href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-action text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                    {cartCount}
                  </span>
                )}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary-secondary hover:text-primary-action hover:bg-primary-background p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-primary-secondary/20 py-4 bg-white">
            <nav className="flex flex-col space-y-3">
              <a 
                href="/" 
                className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                onClick={closeMenu}
              >
                Inicio
              </a>
              <a 
                href="/shop" 
                className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                onClick={closeMenu}
              >
                Tienda
              </a>
              <a 
                href="/#historias" 
                className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                onClick={closeMenu}
              >
                Historias
              </a>
              <a 
                href="/about" 
                className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </a>
              <a 
                href="/contact" 
                className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                onClick={closeMenu}
              >
                Contacto
              </a>
              
              {/* Auth Section in Mobile Menu */}
              <div className="border-t border-primary-secondary/20 pt-3 mt-2">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <a 
                      href="/profile" 
                      className="flex items-center space-x-2 text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </a>
                    <button className="flex items-center space-x-2 text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <a 
                      href="/login" 
                      className="block text-primary-text hover:text-primary-action font-medium py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      Iniciar Sesión
                    </a>
                    <a 
                      href="/register" 
                      className="block text-primary-action hover:text-primary-action/80 font-medium py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      Registrarse
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
