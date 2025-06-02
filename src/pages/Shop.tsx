
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  artisan: string;
  origin: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Canasta Werregue Tradicional",
      slug: "canasta-werregue-tradicional",
      price: 145000,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&q=80",
      description: "Hermosa canasta tejida con fibra de werregue, técnica ancestral transmitida de generación en generación.",
      artisan: "María Eugenia Rentería",
      origin: "Chocó",
      category_id: 1
    },
    {
      id: 2,
      name: "Máscara Ceremonial Tallada",
      slug: "mascara-ceremonial-tallada",
      price: 220000,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      description: "Máscara tallada en madera de cativo, utilizada en ceremonias tradicionales del Pacífico.",
      artisan: "Esteban Mosquera",
      origin: "Chocó",
      category_id: 2
    },
    {
      id: 3,
      name: "Collar de Semillas Nativas",
      slug: "collar-semillas-nativas",
      price: 85000,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
      description: "Collar elaborado con semillas de la selva chocoana, diseño contemporáneo con raíces ancestrales.",
      artisan: "Yurany Palacios",
      origin: "Chocó",
      category_id: 3
    },
    {
      id: 4,
      name: "Tambor Currulao Artesanal",
      slug: "tambor-currulao-artesanal",
      price: 180000,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      description: "Tambor tradicional para currulao, construido con maderas nativas y cuero de res curtido.",
      artisan: "Carlos Moreno",
      origin: "Chocó",
      category_id: 4
    },
    {
      id: 5,
      name: "Cesta de Fibra Natural",
      slug: "cesta-fibra-natural",
      price: 95000,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      description: "Cesta elaborada con fibras naturales de la región, perfecta para decoración o almacenamiento.",
      artisan: "Rosa Palacios",
      origin: "Chocó",
      category_id: 1
    },
    {
      id: 6,
      name: "Escultura en Madera",
      slug: "escultura-madera",
      price: 310000,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
      description: "Escultura tallada a mano en madera de cativo, representando la fauna local del Chocó.",
      artisan: "Miguel Torres",
      origin: "Chocó",
      category_id: 2
    }
  ];

  const mockCategories: Category[] = [
    { id: 1, name: "Cestería", slug: "cesteria" },
    { id: 2, name: "Tallas en Madera", slug: "tallas-madera" },
    { id: 3, name: "Joyería", slug: "joyeria" },
    { id: 4, name: "Instrumentos", slug: "instrumentos" }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           categories.find(cat => cat.slug === selectedCategory)?.id === product.category_id;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-choco-800 mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-lg text-choco-600">
            Descubre la auténtica artesanía afrocolombiana del Chocó
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-selva-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-choco-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 border-choco-200 focus:ring-selva-500 focus:border-selva-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter("all")}
                className={selectedCategory === "all" ? "bg-selva-600 hover:bg-selva-700" : "border-choco-300 text-choco-700 hover:bg-choco-50"}
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={selectedCategory === category.slug ? "bg-selva-600 hover:bg-selva-700" : "border-choco-300 text-choco-700 hover:bg-choco-50"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-selva-600"></div>
            <span className="ml-4 text-choco-600">Cargando productos...</span>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-choco-600">
                Mostrando {filteredProducts.length} de {products.length} productos
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-choco-800 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-choco-600 mb-6">
                  Intenta cambiar los filtros o el término de búsqueda
                </p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }} className="bg-selva-600 hover:bg-selva-700">
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
