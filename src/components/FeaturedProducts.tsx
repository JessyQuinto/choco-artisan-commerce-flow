
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Canasta Werregue Tradicional",
      slug: "canasta-werregue-tradicional",
      price: 145000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWuak5jgWo871dE3jZNJ_8aDHOp10aVRkJSkUubDDhHyzSfadTmqTTcJDIHCG34XHuEsoQr399x-2AuCDM8q7izUxr7VFLFCePR_mB7ddHoZG1Y36WtsNHFr6oixC2uP4kqrELEFtkEkmwBJDSAirr7D1bnx5ViffcgCxLkRXwvLNuN-7XKOtA02d6kBcJw4spJ-b_xDhfs5GeFSuBp_iHI3yLsjxR7jMwh0KGntIBtUruBRdRqgwsR7KY2QXjcBcaD-zOcolZ",
      description: "Hermosa canasta tejida con fibra de werregue, técnica ancestral transmitida de generación en generación.",
      artisan: "María Eugenia Rentería",
      origin: "Chocó"
    },
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada",
      price: 220000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfdkZHi6mJGrVFvipEnHYxSNdT4c8GZl2Q3UuotA6-ftPzmdTj5hg2KQyYG9M2ltIntGZytn9d1ucB5pbYoQtBGx8oUYKEfL2scolrGal2IJ9Zi4zs_kOYoouEokw8K2t8BsCkcsFY_CPTJQpnZcgVC8-GlDj3CLPhJqjKZ6kDMXgI_xt9_FWXbDbQv7z5_KIFXW3n-QpyZ_v0UDu3V-naoEIISoC4vvW0cuJhrQT592C1P_ag_tOuEG4xYjFZBkR_HbL9vZyQ",
      description: "Máscara tallada en madera de cativo, utilizada en ceremonias tradicionales del Pacífico.",
      artisan: "Esteban Mosquera",
      origin: "Chocó"
    },
    {
      id: 3,
      name: "Collar de Semillas Nativas",
      slug: "collar-semillas-nativas",
      price: 85000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACdHKq8dpJVu1OFr11VadzGaSw98CpGJKBtrV90esdnvOmcQhpA5qYnSzOVt_cJ1QyDspxrquXaWnxVN0lqO-OPH5IzXucoqwW0xA4xKVc7KJ-v5kpbpmVbg4ZGIn6VgTNNZ-WZ7Avagzer_SYt1Z8zE3WXkk3Qsbi21wT18nw0hGZTJUiJb3GwcVGzpB6yNbIE32LDlGUjdBO4gB9HK5Z_NqVyZKgse-ZVxv2giWIDYgBsBs6vzTq-HPIw47UR47HGH9iq3qk",
      description: "Collar elaborado con semillas de la selva chocoana, diseño contemporáneo con raíces ancestrales.",
      artisan: "Yurany Palacios",
      origin: "Chocó"
    },
    {
      id: 4,
      name: "Tambor Currulao Artesanal",
      slug: "tambor-currulao-artesanal",
      price: 180000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRdgRfqoOraHvKi0q2qUDAVJBVJtdadXA7aFZ1M1eDEIsi03aVASS8H2K0tPFbMJe0eh35A5jWP9sMeVNuQIYEoINt7kJC2erc8vUwXB5wikkd9e3VFoRmLaI6YctlzDQaZAK9MJs6yfOAtCBBRTh2pNKEglQIac794d-s6OYfpSkelReNobGQ7dJg17hoiZIoVVWslSbATj-1Rw2ec9eHOBrdsAhINbaaTN8Dz77LYj2gi6VhWc8XQ4j8cBb-asVmePVmll65",
      description: "Tambor tradicional para currulao, construido con maderas nativas y cuero de res curtido.",
      artisan: "Carlos Moreno",
      origin: "Chocó"
    }
  ]);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-primary-background" id="productos-destacados">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-text">
              Productos Destacados
            </h2>
            <p className="text-lg text-primary-secondary max-w-2xl mx-auto">
              Descubre las creaciones más populares de nuestros talentosos artesanos
            </p>
          </div>
          <LoadingSpinner 
            variant="skeleton" 
            skeletonType="product" 
            count={4}
            text="Cargando productos destacados..."
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          />
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-primary-background animate-fade-in" 
      id="productos-destacados"
      aria-labelledby="featured-products-title"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-16 space-y-4">
          <h2 
            id="featured-products-title"
            className="text-3xl md:text-4xl font-bold text-primary-text"
          >
            Productos Destacados
          </h2>
          <p className="text-lg text-primary-secondary max-w-2xl mx-auto leading-relaxed">
            Descubre las creaciones más populares de nuestros talentosos artesanos, 
            cada una con su propia historia y significado cultural.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <footer className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-4 bg-primary-action hover:bg-primary-action/90 text-background font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-action focus:ring-offset-2 min-h-[48px]"
            aria-label="Ver todos los productos disponibles en la tienda"
          >
            Ver Todos los Productos
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default FeaturedProducts;
