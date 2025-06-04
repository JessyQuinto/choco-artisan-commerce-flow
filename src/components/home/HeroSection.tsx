
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import Container from '@/components/layout/Container';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-[480px] flex items-end justify-start bg-gradient-to-t from-black/60 to-black/20 bg-cover bg-center" 
         style={{
           backgroundImage: `url('https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop')`
         }}>
      <Container className="pb-12">
        <div className="flex flex-col gap-6 items-start max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Discover the Soul of Chocó
          </h1>
          <p className="text-lg text-white/90 leading-relaxed">
            Authentic handcrafted treasures from Colombian Pacific artisans, preserving ancestral traditions and empowering local communities.
          </p>
          <Link
            to="/productos"
            className="btn-modern-primary inline-flex items-center gap-2"
          >
            Shop Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;
