
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useStore();
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Validation
    if (!acceptTerms) {
      showError("Debes aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      showError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      showError("Por favor, ingresa un email válido");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      showError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: "user-" + Date.now(),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName
      };
      
      login(userData);
      showSuccess("¡Cuenta creada exitosamente! Bienvenido a Chocó Artesanal");
      navigate("/profile");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-secondary/20 rounded-xl p-4 xs:p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl xs:text-3xl font-bold text-primary mb-2 leading-tight">
                Crear Cuenta
              </h1>
              <p className="text-secondary text-sm xs:text-base">
                Únete a la comunidad de Chocó Artesanal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-primary text-sm xs:text-base">
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1.5 sm:mt-2 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-primary text-sm xs:text-base">
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1.5 sm:mt-2 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-primary text-sm xs:text-base">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1.5 sm:mt-2 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-primary text-sm xs:text-base">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1.5 sm:mt-2 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-primary text-sm xs:text-base">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1.5 sm:mt-2 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                  placeholder="Repite tu contraseña"
                />
              </div>

              <div className="flex items-start space-x-2 xs:space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked === true);
                  }}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs xs:text-sm text-secondary leading-relaxed cursor-pointer">
                  Acepto los{" "}
                  <Link to="/terms" className="text-action hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link to="/privacy" className="text-action hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || !acceptTerms}
                className="w-full bg-action hover:bg-action/90 text-white py-2.5 xs:py-3 text-sm xs:text-base lg:text-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>

            <div className="mt-4 xs:mt-6 text-center">
              <p className="text-secondary text-sm xs:text-base">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-action hover:underline font-semibold">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
