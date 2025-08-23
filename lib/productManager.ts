'use client'

import { Product } from '@/data/products';
import { hierarchicalProducts, MainProduct, SubProduct } from '@/data/products-hierarchy';

// Extended Product interface for admin with hierarchical metadata
export interface ExtendedProduct {
  id: string;
  category: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  pricing: {
    usd: number;
    aed: number;
  };
  specifications?: string[];
  sizes?: string[];
  image: string;
  featured?: boolean;
  availability?: 'in_stock' | 'out_of_stock' | 'limited' | 'low_stock';

  // Hierarchical metadata
  parentProductId?: string;
  isMainProduct?: boolean;
  mainProductName?: {
    en: string;
    ar: string;
  };
  mainProductDescription?: {
    en: string;
    ar: string;
  };
  applications?: string[];
  features?: string[];

  // Enhanced admin fields
  stockQuantity?: number;
  minStockLevel?: number;
  lastUpdated?: string;
}

// Product Manager Service
export class ProductManagerService {
  // Convert hierarchical products to flat extended products
  static hierarchicalToFlat(): ExtendedProduct[] {
    const flatProducts: ExtendedProduct[] = [];

    hierarchicalProducts.forEach((mainProduct) => {
      // Add main product as a container/category product
      const mainProductFlat: ExtendedProduct = {
        id: mainProduct.id,
        category: mainProduct.category,
        name: mainProduct.name,
        description: mainProduct.description,
        pricing: {
          // Use the minimum price from sub-products
          usd: Math.min(...mainProduct.subProducts.map(sub => sub.pricing.usd)),
          aed: Math.min(...mainProduct.subProducts.map(sub => sub.pricing.aed))
        },
        image: mainProduct.image,
        featured: mainProduct.featured,
        specifications: [`${mainProduct.subProducts.length} variants available`],
        sizes: [`${mainProduct.subProducts.length} options`],
        availability: 'in_stock',
        isMainProduct: true,
        applications: mainProduct.applications?.en || [],
        features: mainProduct.features?.en || [],
        stockQuantity: 100, // Default stock for main products
        minStockLevel: 10,
        lastUpdated: new Date().toISOString()
      };

      flatProducts.push(mainProductFlat);

      // Add each sub-product as individual products
      mainProduct.subProducts.forEach((subProduct) => {
        const flatSubProduct: ExtendedProduct = {
          id: subProduct.id,
          category: mainProduct.category,
          name: subProduct.name,
          description: subProduct.description,
          pricing: subProduct.pricing,
          image: subProduct.image,
          featured: false, // Sub-products are not featured, only main products
          specifications: subProduct.specifications || [],
          sizes: subProduct.sizes || [],
          availability: subProduct.availability || 'in_stock',
          parentProductId: mainProduct.id,
          isMainProduct: false,
          mainProductName: mainProduct.name,
          mainProductDescription: mainProduct.description,
          applications: mainProduct.applications?.en || [],
          features: mainProduct.features?.en || [],
          stockQuantity: 50, // Default stock for sub-products
          minStockLevel: 5,
          lastUpdated: new Date().toISOString()
        };

        flatProducts.push(flatSubProduct);
      });
    });

    return flatProducts;
  }

  // Convert flat products back to hierarchical structure
  static flatToHierarchical(flatProducts: ExtendedProduct[]): MainProduct[] {
    const hierarchical: MainProduct[] = [];
    const mainProducts = flatProducts.filter(p => p.isMainProduct);

    mainProducts.forEach((mainProduct) => {
      const subProducts = flatProducts.filter(p => 
        p.parentProductId === mainProduct.id && !p.isMainProduct
      );

      const hierarchicalProduct: MainProduct = {
        id: mainProduct.id,
        category: mainProduct.category,
        name: mainProduct.name,
        description: mainProduct.description,
        overview: mainProduct.description, // Use description as overview
        icon: this.getCategoryIcon(mainProduct.category),
        image: mainProduct.image,
        featured: mainProduct.featured || false,
        applications: {
          en: mainProduct.applications || [],
          ar: mainProduct.applications || [] // For now, use English for both
        },
        features: {
          en: mainProduct.features || [],
          ar: mainProduct.features || [] // For now, use English for both
        },
        subProducts: subProducts.map(subProduct => ({
          id: subProduct.id,
          name: subProduct.name,
          description: subProduct.description,
          pricing: subProduct.pricing,
          specifications: subProduct.specifications || [],
          sizes: subProduct.sizes || [],
          image: subProduct.image,
          availability: (subProduct.availability === 'low_stock' ? 'limited' : subProduct.availability) || 'in_stock'
        }))
      };

      hierarchical.push(hierarchicalProduct);
    });

    return hierarchical;
  }

  // Get category icon helper
  static getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'primers': '🎨',
      'membranes': '🛡️',
      'protection-boards': '🔲',
      'water-stoppers': '🚰',
      'coatings': '✨',
      'sealants': '🔧',
      'concrete-repair': '🔨',
      'grp-lining': '🛡️',
      'repair-mortars': '🏗️',
      'geotextiles': '🧵',
      'thermal-insulation': '🌡️',
      'aluminum-flashing': '⚡',
      'sandwich-panels': '🥪',
      'concrete-grouts': '🏗️',
      'tiles': '🔷',
      'gravel': '🪨',
      'landscaping': '🌿',
      'tools-accessories': '🔧'
    };
    return iconMap[category] || '📦';
  }

  // Merge existing products with hierarchical data
  static mergeProductData(existingProducts: Product[], hierarchicalData: ExtendedProduct[]): ExtendedProduct[] {
    const merged: ExtendedProduct[] = [];
    const existingIds = new Set(existingProducts.map(p => p.id));

    // Add existing products first (preserve any admin customizations)
    existingProducts.forEach(product => {
      const hierarchicalMatch = hierarchicalData.find(h => h.id === product.id);
      
      const extendedProduct: ExtendedProduct = {
        ...product,
        // Add hierarchical metadata if available
        ...(hierarchicalMatch && {
          parentProductId: hierarchicalMatch.parentProductId,
          isMainProduct: hierarchicalMatch.isMainProduct,
          mainProductName: hierarchicalMatch.mainProductName,
          mainProductDescription: hierarchicalMatch.mainProductDescription,
          applications: hierarchicalMatch.applications,
          features: hierarchicalMatch.features
        }),
        // Add default admin fields if missing
        stockQuantity: 50,
        minStockLevel: 5,
        lastUpdated: new Date().toISOString()
      };

      merged.push(extendedProduct);
    });

    // Add new hierarchical products that don't exist in admin
    hierarchicalData.forEach(hierarchicalProduct => {
      if (!existingIds.has(hierarchicalProduct.id)) {
        merged.push(hierarchicalProduct);
      }
    });

    return merged;
  }

  // Get products by parent (for hierarchical display)
  static getProductsByParent(products: ExtendedProduct[], parentId: string): ExtendedProduct[] {
    return products.filter(p => p.parentProductId === parentId);
  }

  // Get main products only
  static getMainProducts(products: ExtendedProduct[]): ExtendedProduct[] {
    return products.filter(p => p.isMainProduct === true);
  }

  // Get sub-products only
  static getSubProducts(products: ExtendedProduct[]): ExtendedProduct[] {
    return products.filter(p => p.isMainProduct === false);
  }

  // Search products (enhanced with hierarchical context)
  static searchProducts(products: ExtendedProduct[], query: string): ExtendedProduct[] {
    const lowercaseQuery = query.toLowerCase();
    
    return products.filter(product => 
      product.name.en.toLowerCase().includes(lowercaseQuery) ||
      product.name.ar.includes(lowercaseQuery) ||
      product.description.en.toLowerCase().includes(lowercaseQuery) ||
      product.description.ar.includes(lowercaseQuery) ||
      product.specifications?.some(spec => spec.toLowerCase().includes(lowercaseQuery)) ||
      product.mainProductName?.en.toLowerCase().includes(lowercaseQuery) ||
      product.mainProductName?.ar.includes(lowercaseQuery) ||
      product.applications?.some(app => app.toLowerCase().includes(lowercaseQuery)) ||
      product.features?.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get product with full hierarchical context
  static getProductWithContext(products: ExtendedProduct[], productId: string): {
    product: ExtendedProduct | undefined;
    mainProduct?: ExtendedProduct;
    siblings?: ExtendedProduct[];
  } {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return { product: undefined };
    }

    let mainProduct: ExtendedProduct | undefined;
    let siblings: ExtendedProduct[] = [];

    if (product.isMainProduct) {
      mainProduct = product;
      siblings = products.filter(p => p.parentProductId === product.id);
    } else if (product.parentProductId) {
      mainProduct = products.find(p => p.id === product.parentProductId);
      siblings = products.filter(p => 
        p.parentProductId === product.parentProductId && 
        p.id !== product.id
      );
    }

    return {
      product,
      mainProduct,
      siblings
    };
  }

  // Initialize comprehensive product data
  static initializeComprehensiveData(): ExtendedProduct[] {
    // Convert hierarchical to flat
    const hierarchicalFlat = this.hierarchicalToFlat();
    
    // Get any existing products from localStorage
    const existingProductsJson = localStorage.getItem('admin_products');
    const existingProducts: Product[] = existingProductsJson 
      ? JSON.parse(existingProductsJson) 
      : [];

    // Merge existing with hierarchical data
    const comprehensive = this.mergeProductData(existingProducts, hierarchicalFlat);

    // Save back to localStorage
    localStorage.setItem('admin_products', JSON.stringify(comprehensive));

    return comprehensive;
  }
}

// Export for use in components
export default ProductManagerService;
