
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        console.log("Login successful", formData);
        // Redirect to profile or home
        window.location.href = "/profile";
      } else {
        setError("Por favor, completa todos los campos");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-primary-secondary/20 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-text mb-2">
                Iniciar Sesión
              </h1>
              <p className="text-primary-secondary">
                Accede a tu cuenta de Chocó Artesanal
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-primary-text">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 border-primary-secondary/30 focus:border-primary-action"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-primary-text">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 border-primary-secondary/30 focus:border-primary-action"
                  placeholder="Tu contraseña"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-action hover:bg-primary-action/90 text-white py-3 text-lg font-semibold"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-primary-secondary">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="text-primary-action hover:underline font-semibold">
                  Regístrate aquí
                </a>
              </p>
              <a href="#" className="text-primary-secondary hover:text-primary-action text-sm mt-2 inline-block">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
