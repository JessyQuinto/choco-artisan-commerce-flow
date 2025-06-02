
import { ShoppingCart, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Mock cart count
  const [isLoggedIn] = useState(false); // Mock auth state
  const [user] = useState({ name: "Usuario", email: "usuario@email.com" }); // Mock user

  return (
    <header className="bg-white shadow-sm border-b border-primary-secondary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-action to-primary-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-text">
                <a href="/">Chocó Artesanal</a>
              </h1>
              <p className="text-xs text-primary-secondary hidden sm:block">Tesoros del Pacífico</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background">
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background" asChild>
                  <a href="/profile">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">{user.name}</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-primary-secondary hover:text-primary-action hover:bg-primary-background" asChild>
                  <a href="/login">Iniciar Sesión</a>
                </Button>
                <Button size="sm" className="bg-primary-action hover:bg-primary-action/90 text-white" asChild>
                  <a href="/register">Registrarse</a>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="sm" className="relative text-primary-secondary hover:text-primary-action hover:bg-primary-background" asChild>
              <a href="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-action text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-secondary hover:text-primary-action hover:bg-primary-background"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-secondary/20 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                Inicio
              </a>
              <a href="/shop" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                Tienda
              </a>
              <a href="/#historias" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                Historias
              </a>
              <a href="/about" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                Sobre Nosotros
              </a>
              <a href="/contact" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                Contacto
              </a>
              {!isLoggedIn && (
                <>
                  <a href="/login" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                    Iniciar Sesión
                  </a>
                  <a href="/register" className="text-primary-text hover:text-primary-action font-medium py-2 transition-colors">
                    Registrarse
                  </a>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
