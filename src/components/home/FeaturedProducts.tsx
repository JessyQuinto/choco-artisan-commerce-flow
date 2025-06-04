
import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../product/ProductCard';
import { fetchFeaturedProducts } from '@/services/productApi';
import { Product } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";
import Container from '@/components/layout/Container';

const FeaturedProducts: React.FC = () => {
  const { 
    data: allFeaturedProducts, 
    isLoading, 
    isError,
    error
  } = useQuery<Product[], Error>({
    queryKey: ['featuredProducts'],
    queryFn: fetchFeaturedProducts,
    staleTime: 60000,
  });

  const displayedFeaturedProducts = allFeaturedProducts?.slice(0, 3) || [];

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
         <div key={index} className="flex flex-col space-y-4">
           <Skeleton className="h-[300px] w-full rounded-2xl" />
           <div className="space-y-2">
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
             <Skeleton className="h-4 w-full" />
           </div>
         </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111816] mb-4">
              Featured Treasures
            </h2>
            <p className="text-lg text-[#608a7c] max-w-xl">
              Discover our curated selection of exceptional handcrafted pieces from the Pacific
            </p>
          </div>
          <Link 
            to="/productos" 
            className="btn-modern flex items-center gap-2"
          >
            View All Products
            <ArrowRight size={20} />
          </Link>
        </div>

        {isLoading && renderSkeletons()}

        {isError && (
          <div className="text-center text-red-500">
            <p>Error loading featured products: {error?.message}</p>
          </div>
        )}
        
        {!isLoading && !isError && displayedFeaturedProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedFeaturedProducts.map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#f0f5f3] rounded-2xl p-8 max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-[#0cf2a5]/10 p-4 rounded-2xl mb-6">
                <ShoppingBag size={32} className="text-[#0cf2a5]" />
              </div>
              <h3 className="text-xl font-bold text-[#111816] mb-3">
                Are you an artisan from Chocó?
              </h3>
              <p className="text-[#608a7c] mb-6 text-center leading-relaxed">
                Join our platform and share your creations with the world
              </p>
              <Link 
                to="/contact" 
                className="btn-modern-primary flex items-center gap-2"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
