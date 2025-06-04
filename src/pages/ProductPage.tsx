import React from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '@/utils/seo';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart, Share2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  inStock: boolean;
  sku: string;
  brand: string;
  tags: string[];
}

interface ProductPageProps {
  product?: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const { id } = useParams<{ id: string }>();  // Mock product data for demonstration
  const mockProduct: Product = {
    id: id || 'artisan-dark-chocolate-bar',
    name: 'Premium Dark Chocolate Bar 85%',
    description: 'Our signature dark chocolate bar crafted from single-origin Ecuadorian cacao beans. Rich, complex flavors with notes of cherry and vanilla. Perfect for chocolate connoisseurs who appreciate the finest quality.',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 127,
    image: '/images/dark-chocolate-bar.jpg',
    category: 'Dark Chocolate',
    inStock: true,
    sku: 'CHO-DARK-85-001',
    brand: 'Chocó Artisan',
    tags: ['premium', 'single-origin', '85% cacao', 'ecuador', 'vegan'],
  };

  const currentProduct = product || mockProduct;

  // Comprehensive SEO implementation for product page
  useSEO({
    title: `${currentProduct.name} - Premium Artisan Chocolate | Chocó Artisan`,
    description: `${currentProduct.description.substring(0, 150)}... ⭐ ${currentProduct.rating}/5 (${currentProduct.reviewCount} reviews) 🚚 Free shipping on orders over $50`,
    keywords: [
      currentProduct.name.toLowerCase(),
      'artisan chocolate',
      'premium cocoa',
      'handcrafted chocolate',
      currentProduct.category.toLowerCase(),
      ...currentProduct.tags,
    ],
    image: currentProduct.image,
    type: 'product',
    url: `${window.location.origin}/products/${currentProduct.id}`,
    price: currentProduct.price.toString(),
    currency: 'USD',
    availability: currentProduct.inStock ? 'InStock' : 'OutOfStock',
    brand: currentProduct.brand,
    category: currentProduct.category,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct.name,
          text: currentProduct.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb for SEO and UX */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li>›</li>
            <li><a href="/products" className="hover:text-blue-600">Products</a></li>
            <li>›</li>
            <li><a href={`/category/${currentProduct.category.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600">{currentProduct.category}</a></li>
            <li>›</li>
            <li className="text-gray-900 font-medium">{currentProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={currentProduct.image}
                alt={`${currentProduct.name} - Premium artisan dark chocolate bar made from single-origin Ecuadorian cacao`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="eager" // Important for LCP
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{currentProduct.category}</Badge>
                {!currentProduct.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentProduct.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(currentProduct.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {currentProduct.rating} ({currentProduct.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${currentProduct.price}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${currentProduct.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {currentProduct.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentProduct.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!currentProduct.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {currentProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mt-4">
                <p><strong>SKU:</strong> {currentProduct.sku}</p>
                <p><strong>Brand:</strong> {currentProduct.brand}</p>
                <p><strong>Free shipping</strong> on orders over $50</p>
                <p><strong>Returns:</strong> 30-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional SEO-friendly content sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Everything you need to know about this artisan chocolate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Origin & Sourcing</h3>
                  <p className="text-sm text-gray-600">
                    Our chocolate is crafted from premium cacao beans sourced directly from small farms 
                    in Ecuador. We maintain long-term relationships with our growers to ensure 
                    sustainable and ethical sourcing practices.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Crafting Process</h3>
                  <p className="text-sm text-gray-600">
                    Each bar is carefully crafted in small batches using traditional methods. 
                    We control every step from bean selection to final tempering to create 
                    the perfect texture and flavor profile.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tasting Notes</h3>
                  <p className="text-sm text-gray-600">
                    Rich and complex with initial notes of dark fruit, followed by hints 
                    of vanilla and a subtle earthy finish. The 85% cacao content provides 
                    an intense chocolate experience without overwhelming bitterness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose Artisan Chocolate?</CardTitle>
              <CardDescription>The difference quality makes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Superior Ingredients</h3>
                  <p className="text-sm text-gray-600">
                    We use only the finest single-origin cacao beans, carefully selected 
                    for their unique flavor profiles and quality.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Artisan Craftsmanship</h3>
                  <p className="text-sm text-gray-600">
                    Every bar is handcrafted by our master chocolatiers using time-honored 
                    techniques passed down through generations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Ethical & Sustainable</h3>
                  <p className="text-sm text-gray-600">
                    We're committed to fair trade practices and environmental sustainability, 
                    ensuring our chocolate is as good for the world as it is for your taste buds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section for SEO */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about our artisan chocolate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How should I store this chocolate?</h3>
                <p className="text-sm text-gray-600">
                  Store in a cool, dry place away from direct sunlight. Ideal temperature is 60-70°F (15-21°C). 
                  Avoid refrigeration as it can cause bloom and affect texture.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Is this chocolate vegan-friendly?</h3>
                <p className="text-sm text-gray-600">
                  Yes! This dark chocolate bar contains only cacao beans and organic cane sugar, 
                  making it suitable for vegan diets.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What makes 85% cacao special?</h3>
                <p className="text-sm text-gray-600">
                  The high cacao content delivers intense chocolate flavor and provides antioxidants. 
                  It's perfect for those who appreciate the pure taste of premium cacao.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
