import { useState, useEffect } from 'react';
import { SwipeCard } from './SwipeCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Check, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface SwipeStackProps {
  products: Product[];
  onCartChange: (cart: Product[]) => void;
}

export const SwipeStack = ({ products, onCartChange }: SwipeStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [removedItems, setRemovedItems] = useState<Product[]>([]);
  const { toast } = useToast();

  const visibleCards = 3;
  const currentProduct = products[currentIndex];

  useEffect(() => {
    onCartChange(cart);
  }, [cart, onCartChange]);

  const handleSwipe = (direction: 'left' | 'right', product: Product) => {
    if (direction === 'right') {
      // Add to cart
      setCart(prev => {
        const newCart = [...prev, product];
        toast({
          title: "Added to Cart! 🛒",
          description: `${product.name} has been added to your cart.`,
          className: "bg-gradient-accept text-white border-swipe-accept",
        });
        return newCart;
      });
    } else {
      // Remove/reject
      setRemovedItems(prev => [...prev, product]);
      toast({
        title: "Item Removed 🗑️",
        description: `${product.name} has been removed.`,
        className: "bg-gradient-reject text-white border-swipe-reject",
      });
    }
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleButtonAction = (action: 'reject' | 'accept') => {
    if (!currentProduct) return;
    handleSwipe(action === 'accept' ? 'right' : 'left', currentProduct);
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setCart([]);
    setRemovedItems([]);
    toast({
      title: "Stack Reset! 🔄",
      description: "All items have been reset. Start swiping again!",
    });
  };

  if (currentIndex >= products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold">All Done!</h2>
        <p className="text-muted-foreground text-lg">
          You've reviewed all products. 
        </p>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Items in cart: <span className="text-primary font-bold">{cart.length}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Items removed: <span className="text-destructive font-bold">{removedItems.length}</span>
          </p>
        </div>
        <Button onClick={resetStack} size="lg" className="mt-4">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Card Stack */}
      <div className="relative w-full h-[600px] mx-auto">
        {Array.from({ length: Math.min(visibleCards, products.length - currentIndex) }).map((_, index) => {
          const productIndex = currentIndex + index;
          const product = products[productIndex];
          
          if (!product) return null;

          const isActive = index === 0;
          const zIndex = visibleCards - index;
          const scale = 1 - (index * 0.05);

          return (
            <SwipeCard
              key={`${product.id}-${productIndex}`}
              product={product}
              onSwipe={handleSwipe}
              isActive={isActive}
              zIndex={zIndex}
              scale={scale}
            />
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleButtonAction('reject')}
          disabled={!currentProduct}
          className="w-16 h-16 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleButtonAction('accept')}
          disabled={!currentProduct}
          className="w-16 h-16 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
        >
          <Check className="w-6 h-6" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          {currentIndex + 1} of {products.length}
        </p>
        <div className="w-48 bg-muted rounded-full h-2 mx-auto mt-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};