import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Story } from "@/data/stories";

interface StoryCardProps {
  story: Story;
  variant?: "featured" | "detailed";
}

const StoryCard = ({ story, variant = "featured" }: StoryCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-44 xs:h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 xs:px-3 py-1 text-xs font-semibold text-primary-action flex items-center space-x-1 shadow-sm">
          <Clock className="h-3 w-3" />
          <span>{story.readTime}</span>
        </div>
      </div>

      <div className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
        {variant === "detailed" && (
          <div className="flex items-center text-primary-secondary text-xs xs:text-sm space-x-2">
            <span>{story.author}</span>
            <span>•</span>
            <span>{story.date}</span>
          </div>
        )}
        
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-primary-text group-hover:text-primary-action transition-colors leading-tight">
          {story.title}
        </h3>
        
        <p className="text-primary-secondary line-clamp-3 text-sm xs:text-base leading-relaxed">
          {story.excerpt}
        </p>
        
        <Button 
          asChild 
          className={variant === "featured" 
            ? "w-full bg-primary-action hover:bg-primary-action/90 text-white border-0 shadow-md hover:shadow-lg transition-all text-sm xs:text-base py-2 xs:py-3"
            : "w-full border-primary-action text-primary-action hover:bg-primary-action hover:text-white text-sm xs:text-base py-2 xs:py-3"
          }
          variant={variant === "featured" ? "default" : "outline"}
        >
          <Link to={`/story/${story.id}`} className="flex items-center justify-center space-x-2">
            <span>Leer Historia Completa</span>
            <ArrowRight className="h-3 w-3 xs:h-4 xs:w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default StoryCard;
