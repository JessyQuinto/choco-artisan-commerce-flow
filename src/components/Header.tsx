import { ShoppingCart, Search, Menu, User, LogOut, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore, useAuth } from "@/store/useStore";
import Logo from "./Logo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount, searchQuery, setSearchQuery, logout, wishlist } = useStore();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      closeMenu();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-secondary/20 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" onClick={closeMenu}>
            <Logo size="sm" variant="default" showText={true} className="transform group-hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link to="/" className="text-primary hover:text-action font-medium py-2 px-3 rounded-lg hover:bg-action/5 transition-all">
              Inicio
            </Link>
            <Link to="/shop" className="text-primary hover:text-action font-medium py-2 px-3 rounded-lg hover:bg-action/5 transition-all">
              Tienda
            </Link>
            <Link to="/stories" className="text-primary hover:text-action font-medium py-2 px-3 rounded-lg hover:bg-action/5 transition-all">
              Historias
            </Link>
            <Link to="/about" className="text-primary hover:text-action font-medium py-2 px-3 rounded-lg hover:bg-action/5 transition-all">
              Sobre Nosotros
            </Link>
            <Link to="/contact" className="text-primary hover:text-action font-medium py-2 px-3 rounded-lg hover:bg-action/5 transition-all">
              Contacto
            </Link>
          </nav>

          {/* Search Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center space-x-2 animate-in slide-in-from-right duration-200">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 text-sm border-secondary/30 focus:border-action"
                  autoFocus
                />
                <Button type="submit" size="sm" className="bg-action hover:bg-action/90 shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsSearchOpen(false)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-secondary hover:text-action hover:bg-background p-2 rounded-lg"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-secondary hover:text-action hover:bg-action/5 p-2 rounded-lg"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Auth Section - Hidden on small screens when menu is closed */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {isLoggedIn && user ? (
                <>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-action hover:bg-action/5 rounded-lg" asChild>
                    <Link to="/profile" className="flex items-center space-x-1 py-2 px-3">
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline text-sm">{user.firstName || user.name}</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-action hover:bg-action/5 p-2 rounded-lg"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-action hover:bg-action/5 text-xs lg:text-sm py-2 px-3 rounded-lg" asChild>
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button size="sm" className="bg-action hover:bg-action/90 text-white text-xs lg:text-sm py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition-all" asChild>
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative text-secondary hover:text-action hover:bg-action/5 p-2 rounded-lg" asChild>
              <Link to="/wishlist">
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-action text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs font-medium shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative text-secondary hover:text-action hover:bg-action/5 p-2 rounded-lg" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-action text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs font-medium shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-secondary hover:text-action hover:bg-action/5 p-2 rounded-lg ml-1"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-secondary/20 py-3 bg-background animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm border-secondary/30 focus:border-action rounded-lg"
                autoFocus
              />
              <Button type="submit" size="sm" className="bg-action hover:bg-action/90 rounded-lg shadow-md">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-secondary/20 py-4 bg-background animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-1">
              <Link 
                to="/" 
                className="text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link 
                to="/shop" 
                className="text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={closeMenu}
              >
                Tienda
              </Link>
              <Link 
                to="/stories" 
                className="text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={closeMenu}
              >
                Historias
              </Link>
              <Link 
                to="/about" 
                className="text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </Link>
              <Link 
                to="/contact" 
                className="text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                onClick={closeMenu}
              >
                Contacto
              </Link>
              
              {/* Auth Section in Mobile Menu */}
              <div className="border-t border-secondary/20 pt-3 mt-3">
                {isLoggedIn && user ? (
                  <div className="space-y-1">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-3 text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                      onClick={closeMenu}
                    >
                      <User className="h-5 w-5" />
                      <span>{user.firstName || user.name}</span>
                    </Link>
                    <button 
                      className="flex items-center space-x-3 text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link 
                      to="/login" 
                      className="block text-primary hover:text-action hover:bg-action/5 font-medium py-3 px-4 rounded-lg transition-all"
                      onClick={closeMenu}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/register" 
                      className="block bg-action hover:bg-action/90 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md"
                      onClick={closeMenu}
                    >
                      Registrarse
                    </Link>
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
