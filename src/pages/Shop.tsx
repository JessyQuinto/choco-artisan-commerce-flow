import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import VirtualizedProductGrid from "@/components/VirtualizedProductGrid";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { useFilters, useSearchQuery } from "@/store/useStore";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List, SlidersHorizontal, Search } from "lucide-react";
import { useMemo as useMemoCallback } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filters = useFilters();
  const searchQuery = useSearchQuery();
  const [localFilters, setLocalFilters] = useState({
    category: "all",
    priceRange: "all",
    artisan: "",
    sortBy: "name",
  });
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || searchQuery || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const categoryMatch = localFilters.category === "all" || product.category === localFilters.category;
      const searchMatch = product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(localSearch.toLowerCase());
      const artisanMatch = !localFilters.artisan || product.artisan.toLowerCase().includes(localFilters.artisan.toLowerCase());
      
      let priceMatch = true;
      if (localFilters.priceRange !== "all") {
        if (localFilters.priceRange === "low") priceMatch = product.price < 100000;
        else if (localFilters.priceRange === "medium") priceMatch = product.price >= 100000 && product.price <= 200000;
        else if (localFilters.priceRange === "high") priceMatch = product.price > 200000;
      }
      
      return categoryMatch && searchMatch && artisanMatch && priceMatch;
    });

    // Ordenar con optimización
    const sortProducts = (products, sortBy) => {
      switch (sortBy) {
        case "price-low":
          return [...products].sort((a, b) => a.price - b.price);
        case "price-high":
          return [...products].sort((a, b) => b.price - a.price);
        case "name":
          return [...products].sort((a, b) => a.name.localeCompare(b.name));
        default:
          return products;
      }
    };

    return sortProducts(filtered, localFilters.sortBy);
  }, [products, localFilters, localSearch]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
    setIsSearching(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const clearFilters = useCallback(() => {
    setLocalFilters({
      category: "all",
      priceRange: "all",
      artisan: "",
      sortBy: "name",
    });
    setLocalSearch("");
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 flex-1">
          <div className="mb-6">
            <div className="bg-gray-200 h-6 w-48 rounded animate-pulse mb-4" />
            <div className="bg-gray-200 h-8 w-64 rounded animate-pulse" />
          </div>
          <ProductGridSkeleton count={12} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 flex-1">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tienda</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 sm:mb-8 leading-tight">
          Nuestra Tienda
        </h1>

        {/* Controles superiores */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden border-action text-action hover:bg-action hover:text-white text-sm xs:text-base flex-1 sm:flex-none"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`${viewMode === "grid" ? "bg-action hover:bg-action/90" : "border-action text-action hover:bg-action hover:text-white"} p-2 xs:px-3`}
              >
                <Grid className="h-3 w-3 xs:h-4 xs:w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${viewMode === "list" ? "bg-action hover:bg-action/90" : "border-action text-action hover:bg-action hover:text-white"} p-2 xs:px-3`}
              >
                <List className="h-3 w-3 xs:h-4 xs:w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-2 xs:space-y-0 xs:space-x-3 sm:space-x-4 w-full sm:w-auto">
            <Label htmlFor="sort" className="text-primary font-medium whitespace-nowrap text-sm xs:text-base">
              Ordenar por:
            </Label>            <Select value={localFilters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger className="w-full xs:w-48 h-9 xs:h-10 text-sm xs:text-base">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre (A-Z)</SelectItem>
                <SelectItem value="price-low">Precio (Menor a Mayor)</SelectItem>
                <SelectItem value="price-high">Precio (Mayor a Menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sidebar de filtros */}
          <div className={`lg:w-1/4 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-background border border-secondary/20 rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base xs:text-lg font-semibold text-primary flex items-center">
                  <Filter className="h-4 w-4 xs:h-5 xs:w-5 mr-2" />
                  Filtros
                </h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-action hover:text-action/80 text-xs xs:text-sm px-2 xs:px-3">
                  Limpiar
                </Button>
              </div>

              <div className="space-y-4 sm:space-y-6">                {/* Búsqueda optimizada */}
                <div>
                  <Label htmlFor="search" className="text-primary font-medium mb-2 block text-sm xs:text-base">
                    Buscar
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Buscar productos..."
                      value={localSearch}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="border-secondary/30 focus:border-action h-9 xs:h-10 text-sm xs:text-base pl-10"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin h-4 w-4 border-2 border-action border-t-transparent rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <Label className="text-primary font-medium mb-2 block text-sm xs:text-base">
                    Categoría
                  </Label>                  <Select value={localFilters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger className="h-9 xs:h-10 text-sm xs:text-base">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="cesteria">Cestería</SelectItem>
                      <SelectItem value="tallado">Tallado</SelectItem>
                      <SelectItem value="joyeria">Joyería</SelectItem>
                      <SelectItem value="musica">Música</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="ceramica">Cerámica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rango de precio */}
                <div>
                  <Label className="text-primary font-medium mb-2 block text-sm xs:text-base">
                    Rango de Precio
                  </Label>                  <Select value={localFilters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
                    <SelectTrigger className="h-9 xs:h-10 text-sm xs:text-base">
                      <SelectValue placeholder="Seleccionar rango" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los precios</SelectItem>
                      <SelectItem value="low">Menos de $100.000</SelectItem>
                      <SelectItem value="medium">$100.000 - $200.000</SelectItem>
                      <SelectItem value="high">Más de $200.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Artesano */}
                <div>
                  <Label htmlFor="artisan" className="text-primary font-medium mb-2 block text-sm xs:text-base">
                    Artesano
                  </Label>
                  <Input
                    id="artisan"
                    type="text"
                    placeholder="Buscar por artesano..."
                    value={localFilters.artisan}
                    onChange={(e) => handleFilterChange("artisan", e.target.value)}
                    className="border-secondary/30 focus:border-action h-9 xs:h-10 text-sm xs:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Productos */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-primary mb-3 sm:mb-4">
                  No se encontraron productos
                </h2>
                <p className="text-secondary mb-6 sm:mb-8 text-sm xs:text-base">
                  Intenta ajustar los filtros o la búsqueda
                </p>
                <Button onClick={clearFilters} className="bg-action hover:bg-action/90 text-white px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base">
                  Limpiar Filtros
                </Button>
              </div>
            ) : (
              <>                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <p className="text-secondary text-sm xs:text-base">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                  </p>
                </div>

                {viewMode === "grid" ? (
                  <VirtualizedProductGrid products={filteredProducts} />
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="flex bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1">{product.name}</h3>
                          <p className="text-sm text-secondary mb-2">{product.description}</p>
                          <p className="text-sm text-action font-medium">Por {product.artisan}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-bold text-action">${product.price.toLocaleString()}</span>
                            <Button size="sm" className="bg-action hover:bg-action/90">
                              Ver Detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
