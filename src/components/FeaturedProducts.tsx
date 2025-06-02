
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Canasta Werregue Tradicional",
      slug: "canasta-werregue-tradicional",
      price: 145000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      description: "Hermosa canasta tejida con fibra de werregue, técnica ancestral transmitida de generación en generación.",
      artisan: "María Eugenia Rentería",
      origin: "Chocó"
    },
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada",
      price: 220000,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      description: "Máscara tallada en madera de cativo, utilizada en ceremonias tradicionales del Pacífico.",
      artisan: "Esteban Mosquera",
      origin: "Chocó"
    },
    {
      id: 3,
      name: "Collar de Semillas Nativas",
      slug: "collar-semillas-nativas",
      price: 85000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
      description: "Collar elaborado con semillas de la selva chocoana, diseño contemporáneo con raíces ancestrales.",
      artisan: "Yurany Palacios",
      origin: "Chocó"
    },
    {
      id: 4,
      name: "Tambor Currulao Artesanal",
      slug: "tambor-currulao-artesanal",
      price: 180000,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      description: "Tambor tradicional para currulao, construido con maderas nativas y cuero de res curtido.",
      artisan: "Carlos Moreno",
      origin: "Chocó"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-selva-50" id="productos-destacados">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-choco-800">
            Productos Destacados
          </h2>
          <p className="text-lg text-choco-600 max-w-2xl mx-auto">
            Descubre las creaciones más populares de nuestros talentosos artesanos, 
            cada una con su propia historia y significado cultural.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center px-8 py-4 bg-selva-600 hover:bg-selva-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Ver Todos los Productos
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
