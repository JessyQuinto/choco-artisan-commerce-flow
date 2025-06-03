
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
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

    // Validate form
    if (!formData.email || !formData.password) {
      showError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      showError("Por favor, ingresa un email válido");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      const userData = {
        id: "user-1",
        name: "Usuario Demo",
        email: formData.email,
        firstName: "Usuario",
        lastName: "Demo"
      };
      
      login(userData);
      showSuccess("¡Bienvenido de vuelta!");
      navigate("/profile");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-secondary/20 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Iniciar Sesión
              </h1>
              <p className="text-secondary">
                Accede a tu cuenta de Chocó Artesanal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-primary">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-primary">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 border-secondary/30 focus:border-action"
                  placeholder="Tu contraseña"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-action hover:bg-action/90 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-secondary">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-action hover:underline font-semibold">
                  Regístrate aquí
                </Link>
              </p>
              <Link to="#" className="text-secondary hover:text-action text-sm mt-2 inline-block">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
