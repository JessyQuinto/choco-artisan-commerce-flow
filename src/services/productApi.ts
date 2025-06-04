import { Product, Category } from '@/types'; // Import from centralized types
import { products as mockProducts, categories as mockCategories } from '@/data/mockData';

// Read API base URL from environment variables, with a fallback.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
// In a real scenario, if API_BASE_URL was crucial and not set, you might throw an error or have a more robust fallback.

const SIMULATED_DELAY = 500; // ms

/**
 * Fetches a list of products.
 * Can be filtered by categoryId and/or searchQuery.
 */
export const fetchProducts = async (categoryId?: number, searchQuery?: string): Promise<Product[]> => {
  let endpoint = `${API_BASE_URL}/products`;
  const params = new URLSearchParams();
  if (categoryId) {
    params.append('categoryId', categoryId.toString());
  }
  if (searchQuery) {
    params.append('search', searchQuery);
  }
  if (params.toString()) {
    endpoint += `?${params.toString()}`;
  }
  console.log(`Fetching products from: ${endpoint}`);
  
  // The actual data fetching will still return the mock data for now.
  // In a real app, you would use fetch() or axios() here:
  // const response = await fetch(endpoint);
  // if (!response.ok) throw new Error('Failed to fetch products');
  // const data = await response.json();
  // return data;

  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProducts = [...mockProducts];

      if (categoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
      }

      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery)
        );
      }
      resolve(filteredProducts);
    }, SIMULATED_DELAY);
  });
};

/**
 * Fetches a single product by its slug.
 */
export const fetchProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const endpoint = `${API_BASE_URL}/products/${slug}`;
  console.log(`Fetching product by slug from: ${endpoint}`);
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.slug === slug);
      resolve(product);
    }, SIMULATED_DELAY);
  });
};

/**
 * Fetches all categories.
 */
export const fetchCategories = async (): Promise<Category[]> => {
  const endpoint = `${API_BASE_URL}/categories`;
  console.log(`Fetching categories from: ${endpoint}`);

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCategories]);
    }, SIMULATED_DELAY);
  });
};

/**
 * Fetches a single category by its slug.
 */
export const fetchCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
  const endpoint = `${API_BASE_URL}/categories/${slug}`;
  console.log(`Fetching category by slug from: ${endpoint}`);

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = mockCategories.find(c => c.slug === slug);
      resolve(category);
    }, SIMULATED_DELAY);
  });
};

/**
 * Fetches featured products.
 */
export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const endpoint = `${API_BASE_URL}/products/featured`;
  console.log(`Fetching featured products from: ${endpoint}`);

  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = mockProducts.filter(product => product.featured);
      resolve(featured);
    }, SIMULATED_DELAY);
  });
};
