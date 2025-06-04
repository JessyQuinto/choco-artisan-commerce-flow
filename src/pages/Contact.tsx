
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/hooks/useNotifications";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotifications();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validación
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      showError("Por favor, ingresa un email válido");
      setLoading(false);
      return;
    }

    // Simular envío
    setTimeout(() => {
      showSuccess("¡Mensaje enviado exitosamente! Te contactaremos pronto.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setLoading(false);
    }, 1000);
  };

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
              <BreadcrumbPage>Contacto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 sm:mb-8 lg:mb-12 text-center leading-tight">
            Contáctanos
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Información de contacto */}
            <div className="order-2 lg:order-1">
              <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                Información de Contacto
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-background/50">
                  <MapPin className="h-5 w-5 xs:h-6 xs:w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm xs:text-base">Dirección</h3>
                    <p className="text-secondary text-sm xs:text-base leading-relaxed">
                      Quibdó, Chocó<br />
                      Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-background/50">
                  <Phone className="h-5 w-5 xs:h-6 xs:w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm xs:text-base">Teléfono</h3>
                    <p className="text-secondary text-sm xs:text-base">+57 (4) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-background/50">
                  <Mail className="h-5 w-5 xs:h-6 xs:w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm xs:text-base">Email</h3>
                    <p className="text-secondary text-sm xs:text-base">info@chocoartesanal.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-background/50">
                  <Clock className="h-5 w-5 xs:h-6 xs:w-6 text-action mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary text-sm xs:text-base">Horario de Atención</h3>
                    <p className="text-secondary text-sm xs:text-base leading-relaxed">
                      Lunes - Viernes: 8:00 AM - 6:00 PM<br />
                      Sábado: 9:00 AM - 4:00 PM<br />
                      Domingo: Cerrado
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 hidden sm:block">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4XGsCBZ76gbzDLTBUKPL654varlCw0is3FwR5TP-2AgtxRDmuVaQBUgQYhGv5lkIHEZsWWoTzSz5B6CnSZG445gOdpFxA-mfBdpWwyXT2LK2_kjvbec21WiHOYY5MISY1EsF8KIoE8BYs4YizVUXxi_PcuMovWowjXjJOe-Aud0g0665YSEPgGeqresF6-ik1fkpMda7X3H2Fuy7Z-NCCwKrKppYK1w5ST3LJqrn1ab2J-3KsqfY1lFMG0Ew2BfvAIB8BVMn"
                  alt="Contacto Chocó Artesanal"
                  className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="order-1 lg:order-2">
              <div className="bg-background border border-secondary/20 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <h2 className="text-xl xs:text-2xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                  Envíanos un Mensaje
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-primary text-sm xs:text-base font-medium">
                      Nombre Completo *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1.5 sm:mt-2 border-secondary/30 focus:border-action h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-primary text-sm xs:text-base font-medium">
                      Correo Electrónico *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1.5 sm:mt-2 border-secondary/30 focus:border-action h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-primary text-sm xs:text-base font-medium">
                      Asunto *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-1.5 sm:mt-2 border-secondary/30 focus:border-action h-10 xs:h-11 sm:h-12 text-sm xs:text-base"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-primary text-sm xs:text-base font-medium">
                      Mensaje *
                    </Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1.5 sm:mt-2 w-full px-3 sm:px-4 py-2 sm:py-3 border border-secondary/30 rounded-md focus:border-action focus:outline-none resize-vertical text-sm xs:text-base min-h-[100px]"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-action hover:bg-action/90 text-white py-2.5 xs:py-3 sm:py-4 text-sm xs:text-base sm:text-lg font-semibold disabled:opacity-50 transition-all"
                  >
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
