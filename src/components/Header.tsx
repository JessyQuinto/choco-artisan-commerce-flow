
import { ShoppingCart, Search, Menu, User, LogOut, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore, useAuth } from "@/store/useStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount, searchQuery, setSearchQuery, logout, wishlist } = useStore();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/shop", label: "Tienda" },
    { to: "/stories", label: "Historias" },
    { to: "/about", label: "Sobre Nosotros" },
    { to: "/contact", label: "Contacto" }
  ];

  const renderNavLink = (link: typeof navLinks[0], isMobile = false) => {
    const className = `text-primary hover:text-action font-medium transition-colors ${
      isMobile ? 'py-2' : ''
    }`;
    
    return (
      <Link
        key={link.label}
        to={link.to}
        className={className}
        onClick={isMobile ? closeMenu : undefined}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="bg-background shadow-sm border-b border-secondary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-action to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">C</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary">
                <Link to="/">Chocó Artesanal</Link>
              </h1>
              <p className="text-xs text-secondary hidden sm:block">Tesoros del Pacífico</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map(link => renderNavLink(link))}
          </nav>

          {/* Search Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 text-sm border-secondary/30 focus:border-action"
                  autoFocus
                />
                <Button type="submit" size="sm" className="bg-action hover:bg-action/90">
                  <Search className="h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-secondary hover:text-action hover:bg-background p-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Mobile Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-secondary hover:text-action hover:bg-background p-2"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Auth Section - Hidden on small screens when menu is closed */}
            <div className="hidden md:flex items-center space-x-2">
              {isLoggedIn && user ? (
                <>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-action hover:bg-background" asChild>
                    <Link to="/profile" className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">{user.firstName || user.name}</span>
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-secondary hover:text-action hover:bg-background p-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-action hover:bg-background text-xs lg:text-sm" asChild>
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button size="sm" className="bg-action hover:bg-action/90 text-white text-xs lg:text-sm" asChild>
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative text-secondary hover:text-action hover:bg-background p-2" asChild>
              <Link to="/wishlist">
                <Heart className="h-4 w-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-action text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative text-secondary hover:text-action hover:bg-background p-2" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-action text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-secondary hover:text-action hover:bg-background p-2"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-secondary/20 py-4 bg-background">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm border-secondary/30 focus:border-action"
                autoFocus
              />
              <Button type="submit" size="sm" className="bg-action hover:bg-action/90">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-secondary/20 py-4 bg-background">
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => renderNavLink(link, true))}
              
              {/* Auth Section in Mobile Menu */}
              <div className="border-t border-secondary/20 pt-3 mt-2">
                {isLoggedIn && user ? (
                  <div className="space-y-2">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-primary hover:text-action font-medium py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4" />
                      <span>{user.firstName || user.name}</span>
                    </Link>
                    <button 
                      className="flex items-center space-x-2 text-primary hover:text-action font-medium py-2 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      className="block text-primary hover:text-action font-medium py-2 transition-colors"
                      onClick={closeMenu}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      to="/register" 
                      className="block text-action hover:text-action/80 font-medium py-2 transition-colors"
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
