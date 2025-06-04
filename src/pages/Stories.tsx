
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { storiesData } from "@/data/stories";
import StoryCard from "@/components/StoryCard";

const Stories = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Breadcrumb className="mb-4 sm:mb-6 lg:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Historias Culturales</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            Historias Culturales
          </h1>
          <p className="text-sm xs:text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed px-2">
            Cada artesanía lleva consigo siglos de historia y tradición. 
            Conoce las raíces culturales que dan vida a estas creaciones únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {storiesData.map((story) => (
            <StoryCard key={story.id} story={story} variant="detailed" />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stories;
