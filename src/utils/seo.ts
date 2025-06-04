// SEO Optimization Utilities
// Provides dynamic meta tags, structured data, and SEO best practices

import React from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  price?: string;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  category?: string;
}

interface ProductSEO {
  name: string;
  description: string;
  image: string[];
  price: string;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand: string;
  category: string;
  sku: string;
  gtin?: string;
  mpn?: string;
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
  reviews?: {
    rating: number;
    count: number;
  };
}

class SEOManager {
  private defaultConfig: SEOConfig = {
    title: 'Chocó Artisan Commerce Flow - Artesanías Afrocolombianas Auténticas',
    description: 'Descubre auténticas artesanías afrocolombianas del Chocó. Productos únicos hechos a mano que preservan tradiciones culturales y apoyan comunidades locales.',
    keywords: ['artesanías', 'afrocolombiano', 'chocó', 'colombia', 'hecho a mano', 'cultura', 'tradición'],
    image: '/og-image.jpg',
    type: 'website'
  };

  updatePageSEO(config: Partial<SEOConfig>): void {
    const seoConfig = { ...this.defaultConfig, ...config };
    
    // Update document title
    document.title = seoConfig.title;
    
    // Update meta tags
    this.updateMetaTags(seoConfig);
    
    // Update Open Graph tags
    this.updateOpenGraphTags(seoConfig);
    
    // Update Twitter Card tags
    this.updateTwitterCardTags(seoConfig);
    
    // Update structured data
    this.updateStructuredData(seoConfig);
  }

  private updateMetaTags(config: SEOConfig): void {
    this.setMetaTag('name', 'description', config.description);
    this.setMetaTag('name', 'keywords', config.keywords?.join(', ') || '');
    this.setMetaTag('name', 'author', config.author || 'Chocó Artisan Commerce');
    this.setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    this.setMetaTag('name', 'theme-color', '#D97706');
    
    // Canonical URL
    if (config.url) {
      this.setLinkTag('canonical', config.url);
    }
  }

  private updateOpenGraphTags(config: SEOConfig): void {
    this.setMetaTag('property', 'og:title', config.title);
    this.setMetaTag('property', 'og:description', config.description);
    this.setMetaTag('property', 'og:type', config.type || 'website');
    this.setMetaTag('property', 'og:image', config.image || this.defaultConfig.image!);
    this.setMetaTag('property', 'og:site_name', 'Chocó Artisan Commerce Flow');
    this.setMetaTag('property', 'og:locale', 'es_ES');
    
    if (config.url) {
      this.setMetaTag('property', 'og:url', config.url);
    }
    
    if (config.publishedTime) {
      this.setMetaTag('property', 'article:published_time', config.publishedTime);
    }
    
    if (config.modifiedTime) {
      this.setMetaTag('property', 'article:modified_time', config.modifiedTime);
    }
    
    if (config.author) {
      this.setMetaTag('property', 'article:author', config.author);
    }
  }

  private updateTwitterCardTags(config: SEOConfig): void {
    this.setMetaTag('name', 'twitter:card', 'summary_large_image');
    this.setMetaTag('name', 'twitter:title', config.title);
    this.setMetaTag('name', 'twitter:description', config.description);
    this.setMetaTag('name', 'twitter:image', config.image || this.defaultConfig.image!);
    this.setMetaTag('name', 'twitter:site', '@ChocoArtisan');
    this.setMetaTag('name', 'twitter:creator', '@ChocoArtisan');
  }

  private updateStructuredData(config: SEOConfig): void {
    const structuredData = this.generateStructuredData(config);
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
  }

  private generateStructuredData(config: SEOConfig): any {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Chocó Artisan Commerce Flow',
      description: config.description,
      url: 'https://choco-artisan.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://choco-artisan.com/shop?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Chocó Artisan Commerce',
        logo: {
          '@type': 'ImageObject',
          url: 'https://choco-artisan.com/logo512.png'
        },
        sameAs: [
          'https://facebook.com/chocoartisan',
          'https://instagram.com/chocoartisan',
          'https://twitter.com/chocoartisan'
        ]
      }
    };

    if (config.type === 'article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image: config.image,
        author: {
          '@type': 'Person',
          name: config.author || 'Chocó Artisan Commerce'
        },
        publisher: baseData.publisher,
        datePublished: config.publishedTime,
        dateModified: config.modifiedTime || config.publishedTime
      };
    }

    return baseData;
  }

  generateProductStructuredData(product: ProductSEO): any {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      category: product.category,
      offers: {
        '@type': 'Offer',
        url: window.location.href,
        priceCurrency: product.currency,
        price: product.price,
        availability: `https://schema.org/${product.availability}`,
        seller: {
          '@type': 'Organization',
          name: 'Chocó Artisan Commerce'
        }
      }
    };

    if (product.gtin) {
      (structuredData as any).gtin = product.gtin;
    }

    if (product.mpn) {
      (structuredData as any).mpn = product.mpn;
    }

    if (product.condition) {
      (structuredData as any).offers.itemCondition = `https://schema.org/${product.condition}`;
    }

    if (product.reviews) {
      (structuredData as any).aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: product.reviews.rating,
        reviewCount: product.reviews.count
      };
    }

    return structuredData;
  }

  updateProductSEO(product: ProductSEO): void {
    const seoConfig: SEOConfig = {
      title: `${product.name} - Artesanía Afrocolombiana | Chocó Artisan`,
      description: product.description,
      type: 'product',
      image: product.image[0],
      url: window.location.href,
      keywords: [product.name, product.category, 'artesanía', 'afrocolombiano', 'chocó']
    };

    this.updatePageSEO(seoConfig);

    // Add product-specific structured data
    const productStructuredData = this.generateProductStructuredData(product);
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-product', 'true');
    script.textContent = JSON.stringify(productStructuredData, null, 2);
    document.head.appendChild(script);
  }

  generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
  }

  private setMetaTag(attribute: string, name: string, content: string): void {
    if (!content) return;
    
    let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    
    tag.content = content;
  }

  private setLinkTag(rel: string, href: string): void {
    let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = rel;
      document.head.appendChild(tag);
    }
    
    tag.href = href;
  }

  // SEO Analytics helpers
  trackPageView(pageName: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: { custom_parameter: pageName }
      });
    }
  }

  trackSiteSearch(searchTerm: string, resultsCount: number): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount
      });
    }
  }

  trackProductView(productId: string, productName: string, category: string, price: string): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_item', {
        currency: 'COP',
        value: parseFloat(price),
        items: [{
          item_id: productId,
          item_name: productName,
          category: category,
          price: parseFloat(price)
        }]
      });
    }
  }
}

// Utility functions for common SEO tasks
export const generatePageTitle = (pageTitle: string): string => {
  return `${pageTitle} | Chocó Artisan Commerce Flow`;
};

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  
  const truncated = content.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Export singleton instance
export const seoManager = new SEOManager();

// Get current SEO data from the page
export const getCurrentSEOData = () => {
  const getMetaContent = (selector: string): string => {
    const element = document.querySelector(selector) as HTMLMetaElement;
    return element?.content || '';
  };

  const getLinkHref = (selector: string): string => {
    const element = document.querySelector(selector) as HTMLLinkElement;
    return element?.href || '';
  };

  return {
    title: document.title || '',
    description: getMetaContent('meta[name="description"]'),
    keywords: getMetaContent('meta[name="keywords"]'),
    author: getMetaContent('meta[name="author"]'),
    robots: getMetaContent('meta[name="robots"]'),
    canonical: getLinkHref('link[rel="canonical"]'),
    ogTitle: getMetaContent('meta[property="og:title"]'),
    ogDescription: getMetaContent('meta[property="og:description"]'),
    ogImage: getMetaContent('meta[property="og:image"]'),
    ogType: getMetaContent('meta[property="og:type"]'),
    ogUrl: getMetaContent('meta[property="og:url"]'),
    twitterCard: getMetaContent('meta[name="twitter:card"]'),
    twitterTitle: getMetaContent('meta[name="twitter:title"]'),
    twitterDescription: getMetaContent('meta[name="twitter:description"]'),
    twitterImage: getMetaContent('meta[name="twitter:image"]'),
  };
};

// React hook for SEO with config parameter
export function useSEO(config?: Partial<SEOConfig>) {
  React.useEffect(() => {
    if (config) {
      seoManager.updatePageSEO(config);
    }
    
    return () => {
      // Cleanup: remove product-specific structured data when component unmounts
      const productScripts = document.querySelectorAll('script[data-product="true"]');
      productScripts.forEach(script => script.remove());
      
      const breadcrumbScripts = document.querySelectorAll('script[data-breadcrumb="true"]');
      breadcrumbScripts.forEach(script => script.remove());
    };
  }, [config ? JSON.stringify(config) : undefined]);

  return {
    getCurrentSEOData,
    updateSEO: (newConfig: Partial<SEOConfig>) => seoManager.updatePageSEO(newConfig),
    generatePageTitle,
    generateMetaDescription,
    generateSlug,
  };
}

// TypeScript declaration for gtag
declare global {
  function gtag(...args: any[]): void;
}
