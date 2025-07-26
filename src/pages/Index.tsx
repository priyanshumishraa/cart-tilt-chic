import { useState } from 'react';
import { SwipeStack } from '@/components/SwipeStack';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

// Import product images
import watch1 from '@/assets/watch-1.jpg';
import shoe1 from '@/assets/shoe-1.jpg';
import jacket1 from '@/assets/jacket-1.jpg';
import watch2 from '@/assets/watch-2.jpg';
import shirt1 from '@/assets/shirt-1.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Smartwatch',
    price: 299,
    category: 'Watches',
    image: watch1,
  },
  {
    id: '2',
    name: 'Premium Sneakers',
    price: 159,
    category: 'Shoes',
    image: shoe1,
  },
  {
    id: '3',
    name: 'Leather Jacket',
    price: 449,
    category: 'Clothing',
    image: jacket1,
  },
  {
    id: '4',
    name: 'Classic Watch',
    price: 199,
    category: 'Watches',
    image: watch2,
  },
  {
    id: '5',
    name: 'Dress Shirt',
    price: 89,
    category: 'Clothing',
    image: shirt1,
  },
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SwipeShop</h1>
            <p className="text-sm text-muted-foreground">Swipe. Shop. Style.</p>
          </div>
        </div>
        
        <CartSidebar cart={cart} onUpdateCart={setCart} />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Instructions */}
          <div className="text-center mb-8 space-y-4">
            <h2 className="text-3xl font-bold">Discover Your Style</h2>
            <p className="text-muted-foreground">
              Swipe right to add to cart, left to pass
            </p>
            
            {/* Swipe Indicators */}
            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center space-x-2 text-destructive">
                <div className="w-8 h-8 rounded-full bg-gradient-reject flex items-center justify-center">
                  <span className="text-white font-bold">←</span>
                </div>
                <span className="text-sm font-medium">Pass</span>
              </div>
              
              <div className="flex items-center space-x-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-gradient-accept flex items-center justify-center">
                  <span className="text-white font-bold">→</span>
                </div>
                <span className="text-sm font-medium">Add to Cart</span>
              </div>
            </div>
          </div>

          {/* Swipe Stack */}
          <SwipeStack products={products} onCartChange={setCart} />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-muted-foreground border-t border-border mt-12">
        <p className="flex items-center justify-center space-x-2">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>for shopping lovers</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;