import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface SwipeCardProps {
  product: Product;
  onSwipe: (direction: 'left' | 'right', product: Product) => void;
  isActive: boolean;
  zIndex: number;
  scale: number;
}

export const SwipeCard = ({ product, onSwipe, isActive, zIndex, scale }: SwipeCardProps) => {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0]);
  
  const acceptOpacity = useTransform(x, [0, 150, 300], [0, 0.5, 1]);
  const rejectOpacity = useTransform(x, [-300, -150, 0], [1, 0.5, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 150;
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitDirection(direction);
      onSwipe(direction, product);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        zIndex,
        scale,
        x,
        rotate,
        opacity,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitDirection ? {
        x: exitDirection === 'right' ? 400 : -400,
        rotate: exitDirection === 'right' ? 30 : -30,
        opacity: 0,
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-full rounded-2xl bg-gradient-card shadow-card overflow-hidden border border-border">
        {/* Accept Indicator */}
        <motion.div 
          className="absolute top-8 left-8 z-10 px-4 py-2 rounded-xl bg-gradient-accept text-white font-bold text-lg shadow-accept"
          style={{ opacity: acceptOpacity }}
        >
          ADD TO CART
        </motion.div>
        
        {/* Reject Indicator */}
        <motion.div 
          className="absolute top-8 right-8 z-10 px-4 py-2 rounded-xl bg-gradient-reject text-white font-bold text-lg shadow-reject"
          style={{ opacity: rejectOpacity }}
        >
          REMOVE
        </motion.div>

        {/* Product Image */}
        <div className="relative h-3/4 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Product Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <Badge variant="secondary" className="ml-2">
              {product.category}
            </Badge>
          </div>
          <p className="text-3xl font-bold text-primary">${product.price}</p>
        </div>
      </div>
    </motion.div>
  );
};