
import { Button } from "@/components/ui/button";

const CulturalStories = () => {
  const stories = [
    {
      id: 1,
      title: "El Arte del Werregue",
      excerpt: "Conoce la técnica milenaria de tejido con fibras naturales que ha pasado de madres a hijas durante siglos en las comunidades afrocolombianas del Chocó.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1",
      readTime: "5 min lectura"
    },
    {
      id: 2,
      title: "Música y Tradición: El Currulao",
      excerpt: "Descubre cómo los ritmos ancestrales del Pacífico se entrelazan con la creación artesanal, siendo el currulao el corazón de nuestra identidad cultural.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j",
      readTime: "7 min lectura"
    },
    {
      id: 3,
      title: "Sabiduría Ancestral en Cada Talla",
      excerpt: "Los maestros talladores del Chocó mantienen viva una tradición que conecta el mundo espiritual con el material a través de la madera sagrada.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn",
      readTime: "6 min lectura"
    }
  ];

  return (
    <section className="py-20 bg-primary-background" id="historias">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text">
            Historias Culturales
          </h2>
          <p className="text-lg text-primary-secondary max-w-2xl mx-auto">
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary-action">
                  {story.readTime}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-primary-text group-hover:text-primary-action transition-colors">
                  {story.title}
                </h3>
                <p className="text-primary-secondary line-clamp-3">
                  {story.excerpt}
                </p>
                <Button variant="outline" className="w-full border-primary-action text-primary-action hover:bg-primary-action hover:text-white">
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
            className="border-primary-secondary text-primary-text hover:bg-primary-background px-8 py-4 text-lg font-semibold"
          >
            Ver Todas las Historias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CulturalStories;
