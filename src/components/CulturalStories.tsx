
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { storiesData } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

const CulturalStories = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-primary-background" id="historias">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text leading-tight">
            Historias Culturales
          </h2>
          <p className="text-base xs:text-lg sm:text-lg md:text-xl text-primary-secondary max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
            Cada artesanía lleva consigo siglos de historia y tradición. 
            Conoce las raíces culturales que dan vida a estas creaciones únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} variant="featured" />
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12 lg:mt-16">
          <Button asChild size="lg" className="bg-primary-action hover:bg-primary-action/90 text-white px-6 xs:px-8 py-3 xs:py-4 text-base xs:text-lg font-semibold border-0 shadow-md hover:shadow-lg transition-all w-full xs:w-auto max-w-xs xs:max-w-none">
            <Link to="/stories" className="flex items-center justify-center space-x-2">
              <span>Ver Todas las Historias</span>
              <ArrowRight className="h-4 w-4 xs:h-5 xs:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalStories;
