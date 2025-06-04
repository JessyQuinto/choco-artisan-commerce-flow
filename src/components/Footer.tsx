
import { Facebook, Instagram, Twitter } from "lucide-react";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = memo(() => {
  // Memoize footer links to prevent unnecessary re-renders
  const footerLinks = useMemo(() => ({
    quickLinks: [
      { to: "/", label: "Inicio" },
      { to: "/shop", label: "Tienda" },
      { to: "/stories", label: "Historias Culturales" },
      { to: "/about", label: "Sobre Nosotros" },
      { to: "/contact", label: "Contacto" }
    ],
    categories: [
      { to: "/shop?category=ceramica", label: "Cerámica" },
      { to: "/shop?category=textiles", label: "Textiles" },
      { to: "/shop?category=madera", label: "Madera" },
      { to: "/shop?category=joyeria", label: "Joyería" },
      { to: "/shop?category=gastronomia", label: "Gastronomía" }
    ],
    support: [
      { to: "/help", label: "Ayuda" },
      { to: "/shipping", label: "Envíos" },
      { to: "/returns", label: "Devoluciones" },
      { to: "/terms", label: "Términos y Condiciones" },
      { to: "/privacy", label: "Política de Privacidad" }
    ]
  }), []);

  const socialLinks = useMemo(() => [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" }
  ], []);

  return (
    <footer className="bg-amber-900 text-white relative z-10 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 xs:col-span-2 md:col-span-1">
            <Logo size="md" variant="white" showText={true} />
            <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed max-w-sm">
              Conectando el talento artesanal afrocolombiano con el mundo, 
              preservando tradiciones y creando oportunidades justas.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Enlaces Rápidos</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Categorías</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              {footerLinks.categories.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-bold text-sm xs:text-base sm:text-lg text-amber-400">Soporte</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs xs:text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a 
                    key={href}
                    href={href} 
                    className="text-gray-300 hover:text-white transition-colors p-1"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4 xs:h-5 xs:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
