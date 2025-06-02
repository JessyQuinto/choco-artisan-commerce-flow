
import { Button } from "@/components/ui/button";

const CulturalStories = () => {
  const stories = [
    {
      id: 1,
      title: "El Arte del Werregue",
      excerpt: "Conoce la técnica milenaria de tejido con fibras naturales que ha pasado de madres a hijas durante siglos en las comunidades afrocolombianas del Chocó.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80",
      readTime: "5 min lectura"
    },
    {
      id: 2,
      title: "Música y Tradición: El Currulao",
      excerpt: "Descubre cómo los ritmos ancestrales del Pacífico se entrelazan con la creación artesanal, siendo el currulao el corazón de nuestra identidad cultural.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80",
      readTime: "7 min lectura"
    },
    {
      id: 3,
      title: "Sabiduría Ancestral en Cada Talla",
      excerpt: "Los maestros talladores del Chocó mantienen viva una tradición que conecta el mundo espiritual con el material a través de la madera sagrada.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
      readTime: "6 min lectura"
    }
  ];

  return (
    <section className="py-20 bg-choco-50" id="historias">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-choco-800">
            Historias Culturales
          </h2>
          <p className="text-lg text-choco-600 max-w-2xl mx-auto">
            Cada artesanía lleva consigo siglos de historia y tradición. 
            Conoce las raíces culturales que dan vida a estas creaciones únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-oro-700">
                  {story.readTime}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-choco-800 group-hover:text-selva-700 transition-colors">
                  {story.title}
                </h3>
                <p className="text-choco-600 line-clamp-3">
                  {story.excerpt}
                </p>
                <Button variant="outline" className="w-full border-selva-300 text-selva-700 hover:bg-selva-50">
                  Leer Historia Completa
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-choco-300 text-choco-700 hover:bg-choco-50 px-8 py-4 text-lg font-semibold"
          >
            Ver Todas las Historias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalStories;
