
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Breadcrumb className="mb-6 sm:mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sobre Nosotros</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 sm:mb-8 lg:mb-12 text-center leading-tight">
            Sobre Chocó Artesanal
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
            <div className="order-2 md:order-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLswbkOAcmwcFCNgL_xY92lp3tt-l8P_xdDa9NeBLMyAhttCigBtSeeMSBDYWe9t_a6Il0UXOknWI2os6CCt1I9dLJmTvuRwrdpcO5fU8cRdUV6BfD-ABk2X1qCIK4IVXewqMtVh3bp2ZjzYQUxMaICtzPAt-r9sk8cOmScenvCgfOu49lG540ua8ia-fYXo2vJf_I8K9z2g9-wk6qgaeYcJdr8X-iW-TIozAwtMBin40N51OqI-zRafq_1_esIJVjr_nxzGj1"
                alt="Artesanos del Chocó trabajando"
                className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center order-1 md:order-2">
              <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4 lg:mb-6">
                Nuestra Misión
              </h2>
              <p className="text-secondary text-sm xs:text-base sm:text-lg leading-relaxed">
                Conectamos las tradiciones ancestrales del Pacífico colombiano con el mundo, 
                ofreciendo productos artesanales únicos que reflejan la riqueza cultural y 
                la maestría de nuestros artesanos chocoanos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-primary mb-3 sm:mb-4 lg:mb-6">
                Nuestra Historia
              </h2>
              <p className="text-secondary text-sm xs:text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                Desde hace más de 10 años, trabajamos directamente con comunidades 
                afrodescendientes e indígenas del Chocó, promoviendo el comercio justo 
                y la preservación de técnicas tradicionales.
              </p>
              <p className="text-secondary text-sm xs:text-base sm:text-lg leading-relaxed">
                Cada producto cuenta una historia de resistencia, creatividad y amor 
                por la tradición que se transmite de generación en generación.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARjqnGyGs8CvQ7D1JDSXhxnB5MeH2OfnX5F5ui3Im92a7iJxkR17wyt54-hX-JqeuJqqVkl7hPUqaTL0xxeGl1DVk9KjZgVpm3GhkCPf4nLPG-4cKFm3OSbZgpkKgkZIF9-ecJ-a7_xfMiF16m-fT6Pzs6FcL5rB4iRaRaQAssWyBd09WQxJbxSZciQzHbIJTJ4E29ZRAak6zXpQKgKdxjQDH8SsKLT9hLdfftb1M8dq1f14rTRoLobFn5fgtgYf7EJs1_S70j"
                alt="Tradiciones culturales del Chocó"
                className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="bg-background border border-secondary/20 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
            <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 sm:mb-6 lg:mb-8 text-center">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center p-2 sm:p-4">
                <h3 className="text-lg xs:text-xl font-semibold text-primary mb-2 sm:mb-3">Autenticidad</h3>
                <p className="text-secondary text-sm xs:text-base leading-relaxed">
                  Productos 100% auténticos, elaborados con técnicas tradicionales
                </p>
              </div>
              <div className="text-center p-2 sm:p-4">
                <h3 className="text-lg xs:text-xl font-semibold text-primary mb-2 sm:mb-3">Comercio Justo</h3>
                <p className="text-secondary text-sm xs:text-base leading-relaxed">
                  Pagamos precios justos que dignifican el trabajo artesanal
                </p>
              </div>
              <div className="text-center p-2 sm:p-4 xs:col-span-1 sm:col-span-2 lg:col-span-1">
                <h3 className="text-lg xs:text-xl font-semibold text-primary mb-2 sm:mb-3">Sostenibilidad</h3>
                <p className="text-secondary text-sm xs:text-base leading-relaxed">
                  Respetamos el medio ambiente y las tradiciones ancestrales
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
