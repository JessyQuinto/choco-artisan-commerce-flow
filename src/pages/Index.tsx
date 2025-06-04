
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import CulturalStories from "@/components/CulturalStories";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartAbandonmentNotice from "@/components/CartAbandonmentNotice";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CulturalStories />
        <CartAbandonmentNotice />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
