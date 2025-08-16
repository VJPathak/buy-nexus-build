import { useState } from 'react';
import { ProductCard, Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 324,
    isNew: true,
    isOnSale: true,
  },
  {
    id: '2',
    name: 'Minimalist Watch Collection',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.6,
    reviewCount: 156,
    isNew: true,
  },
  {
    id: '3',
    name: 'Designer Sneakers',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    category: 'Fashion',
    rating: 4.7,
    reviewCount: 89,
    isOnSale: true,
  },
  {
    id: '4',
    name: 'Smart Fitness Tracker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviewCount: 267,
  },
  {
    id: '5',
    name: 'Organic Cotton T-Shirt',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Fashion',
    rating: 4.4,
    reviewCount: 123,
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 201,
    isOnSale: true,
  },
  {
    id: '7',
    name: 'Leather Crossbody Bag',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviewCount: 178,
  },
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleProducts, setVisibleProducts] = useState(8);

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const filterProducts = (category: string) => {
    if (category === 'All') return mockProducts;
    return mockProducts.filter(product => product.category === category);
  };

  const loadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully curated for quality and style.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterProducts(category)
                  .slice(0, visibleProducts)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.has(product.id)}
                    />
                  ))}
              </div>

              {/* Load More Button */}
              {filterProducts(category).length > visibleProducts && (
                <div className="text-center mt-12">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={loadMore}
                    className="px-8"
                  >
                    Load More Products
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};