
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockProducts = [
    {
      id: 1,
      name: "Canasta Werregue Tradicional",
      slug: "canasta-werregue-tradicional",
      price: 145000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWuak5jgWo871dE3jZNJ_8aDHOp10aVRkJSkUubDDhHyzSfadTmqTTcJDIHCG34XHuEsoQr399x-2AuCDM8q7izUxr7VFLFCePR_mB7ddHoZG1Y36WtsNHFr6oixC2uP4kqrELEFtkEkmwBJDSAirr7D1bnx5ViffcgCxLkRXwvLNuN-7XKOtA02d6kBcJw4spJ-b_xDhfs5GeFSuBp_iHI3yLsjxR7jMwh0KGntIBtUruBRdRqgwsR7KY2QXjcBcaD-zOcolZ",
      description: "Hermosa canasta tejida con fibra de werregue",
      category: "cesteria",
      artisan: "María Eugenia Rentería",
      origin: "Chocó"
    },
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada", 
      price: 220000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfdkZHi6mJGrVFvipEnHYxSNdT4c8GZl2Q3UuotA6-ftPzmdTj5hg2KQyYG9M2ltIntGZytn9d1ucB5pbYoQtBGx8oUYKEfL2scolrGal2IJ9Zi4zs_kOYoouEokw8K2t8BsCkcsFY_CPTJQpnZcgVC8-GlDj3CLPhJqjKZ6kDMXgI_xt9_FWXbDbQv7z5_KIFXW3n-QpyZ_v0UDu3V-naoEIISoC4vvW0cuJhrQT592C1P_ag_tOuEG4xYjFZBkR_HbL9vZyQ",
      description: "Máscara tallada en madera de cativo",
      category: "tallado",
      artisan: "Esteban Mosquera",
      origin: "Chocó"
    },
    {
      id: 3,
      name: "Collar de Semillas Nativas",
      slug: "collar-semillas-nativas",
      price: 85000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACdHKq8dpJVu1OFr11VadzGaSw98CpGJKBtrV90esdnvOmcQhpA5qYnSzOVt_cJ1QyDspxrquXaWnxVN0lqO-OPH5IzXucoqwW0xA4xKVc7KJ-v5kpbpmVbg4ZGIn6VgTNNZ-WZ7Avagzer_SYt1Z8zE3WXkk3Qsbi21wT18nw0hGZTJUiJb3GwcVGzpB6yNbIE32LDlGUjdBO4gB9HK5Z_NqVyZKgse-ZVxv2giWIDYgBsBs6vzTq-HPIw47UR47HGH9iq3qk",
      description: "Collar elaborado con semillas de la selva",
      category: "joyeria",
      artisan: "Yurany Palacios",
      origin: "Chocó"
    },
    {
      id: 4,
      name: "Tambor Currulao Artesanal",
      slug: "tambor-currulao-artesanal",
      price: 180000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRdgRfqoOraHvKi0q2qUDAVJBVJtdadXA7aFZ1M1eDEIsi03aVASS8H2K0tPFbMJe0eh35A5jWP9sMeVNuQIYEoINt7kJC2erc8vUwXB5wikkd9e3VFoRmLaI6YctlzDQaZAK9MJs6yfOAtCBBRTh2pNKEglQIac794d-s6OYfpSkelReNobGQ7dJg17hoiZIoVVWslSbATj-1Rw2ec9eHOBrdsAhINbaaTN8Dz77LYj2gi6VhWc8XQ4j8cBb-asVmePVmll65",
      description: "Tambor tradicional para currulao",
      category: "musica",
      artisan: "Carlos Moreno",
      origin: "Chocó"
    },
    {
      id: 5,
      name: "Tejido Tradicional Chocoano",
      slug: "tejido-tradicional-chocoano",
      price: 95000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuRqtTIaVTX8ggRhtSGkmfAbVfqwMCkX0x_QG7jplgAC7I2-tApvb5ZZBtOrPkkCHy50Y5YLT8GWQpUTg0UZdPkhn0a9YifV3YTpcncS_z0cBp2_Qu6CKgAnTJlWhKhgB4rQ-RarJghFH2IrdSAJtS2laKfGCULR92JYexkS2gnKT-bVHA7ZkGGa2HFIPbQTr6b5NiHb9Xop2OBhZdKP51yS4od6aSMl8kcBNiIebDvnWcRkLBoe1bHIZg8oqMacDribbtutVr",
      description: "Textil artesanal con patrones tradicionales",
      category: "textiles",
      artisan: "Ana Lucía Moreno",
      origin: "Chocó"
    },
    {
      id: 6,
      name: "Vasija de Barro Tradicional",
      slug: "vasija-barro-tradicional",
      price: 120000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4NKKNBrdjKmefojYoBUYHShZWMp2RSCAqNnFxVnvbrgK3fuCbv1feF6P37mGEkpnOYR59lp8McDKZfjZPPoXWqM6EoB7QR4uMdhr4KbwGxRJYMRk4Zqqe-sD9igP_rSKJ3CEvBxwMD31c1aKVVOrYXDtmutc5i3Ttm_Pt88DZxJGOGHCpBHgIWUWOZbbb3v4-EHQ9irtPxIDXshXCCBy30gSvMrMBUTFQQKDyfGohFVlSztaZDf1rTFvVOLERpQjc5RYmXkSt",
      description: "Vasija de barro cocido a mano",
      category: "ceramica",
      artisan: "Roberto Sinisterra",
      origin: "Chocó"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryFilter === "all" || product.category === categoryFilter;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-action"></div>
          <span className="ml-4 text-primary-text">Cargando productos...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text mb-8">
          Nuestra Tienda
        </h1>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <label htmlFor="category" className="text-primary-text font-medium whitespace-nowrap">
              Filtrar por categoría:
            </label>
            <select
              id="category"
              className="w-full sm:w-auto border border-primary-secondary/30 rounded-md px-4 py-2 focus:border-primary-action focus:outline-none"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">Todas las categorías</option>
              <option value="cesteria">Cestería</option>
              <option value="tallado">Tallado</option>
              <option value="joyeria">Joyería</option>
              <option value="musica">Música</option>
              <option value="textiles">Textiles</option>
              <option value="ceramica">Cerámica</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <label htmlFor="search" className="text-primary-text font-medium whitespace-nowrap">
              Buscar producto:
            </label>
            <input
              type="text"
              id="search"
              className="w-full sm:w-auto border border-primary-secondary/30 rounded-md px-4 py-2 focus:border-primary-action focus:outline-none"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl md:text-2xl font-semibold text-primary-text mb-4">
              No se encontraron productos
            </h2>
            <p className="text-primary-secondary mb-8">
              Intenta ajustar los filtros o la búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
