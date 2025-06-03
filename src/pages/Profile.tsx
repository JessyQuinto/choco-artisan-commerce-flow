
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShoppingBag, Heart, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore, useAuth } from "@/store/useStore";
import { useNotifications } from "@/hooks/useNotifications";

const Profile = () => {
  const { updateUser, cartItems, wishlist } = useStore();
  const { user, isLoggedIn } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
      return;
    }
    
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || ""
    });
  }, [isLoggedIn, user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      showError("Por favor, completa todos los campos");
      return;
    }

    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`
    });
    
    setIsEditing(false);
    showSuccess("Perfil actualizado exitosamente");
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
    setIsEditing(false);
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  const totalSpent = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Mi Perfil
            </h1>
            <p className="text-secondary">
              Gestiona tu información personal y revisa tu actividad
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Favoritos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Información Personal</CardTitle>
                      <CardDescription>
                        Actualiza tu información de contacto
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>{isEditing ? "Cancelar" : "Editar"}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-primary">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-secondary/30 focus:border-action"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-secondary/30 focus:border-action"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-primary">
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 border-secondary/30 focus:border-action"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button onClick={handleSave} className="bg-action hover:bg-action/90">
                        Guardar Cambios
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Resumen de Actividad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">{cartItems.length}</div>
                      <div className="text-sm text-secondary">Productos en carrito</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">{wishlist.length}</div>
                      <div className="text-sm text-secondary">Productos favoritos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-action">${totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-secondary">Total en carrito</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pedidos</CardTitle>
                  <CardDescription>
                    Revisa tus compras anteriores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      No tienes pedidos aún
                    </h3>
                    <p className="text-secondary mb-6">
                      Explora nuestra tienda y realiza tu primera compra
                    </p>
                    <Button asChild className="bg-action hover:bg-action/90">
                      <a href="/shop">Ir a la Tienda</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Favoritos</CardTitle>
                  <CardDescription>
                    Productos que has guardado para más tarde
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-12 w-12 text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        No tienes favoritos aún
                      </h3>
                      <p className="text-secondary mb-6">
                        Explora productos y añádelos a tu lista de favoritos
                      </p>
                      <Button asChild className="bg-action hover:bg-action/90">
                        <a href="/shop">Explorar Productos</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product) => (
                        <div key={product.id} className="border border-secondary/20 rounded-lg p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <h4 className="font-semibold text-primary mb-2 line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-secondary text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-action">
                              ${product.price.toLocaleString()}
                            </span>
                            <Button size="sm" asChild className="bg-action hover:bg-action/90">
                              <a href={`/product-detail?slug=${product.slug}`}>Ver</a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
