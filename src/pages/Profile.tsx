
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-primary mb-2 leading-tight">
              Mi Perfil
            </h1>
            <p className="text-secondary text-sm xs:text-base">
              Gestiona tu información personal y revisa tu actividad
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="profile" className="flex flex-col xs:flex-row items-center space-y-1 xs:space-y-0 xs:space-x-2 py-2 xs:py-3 text-xs xs:text-sm">
                <User className="h-3 w-3 xs:h-4 xs:w-4" />
                <span className="hidden xs:inline">Perfil</span>
                <span className="xs:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex flex-col xs:flex-row items-center space-y-1 xs:space-y-0 xs:space-x-2 py-2 xs:py-3 text-xs xs:text-sm">
                <ShoppingBag className="h-3 w-3 xs:h-4 xs:w-4" />
                <span>Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex flex-col xs:flex-row items-center space-y-1 xs:space-y-0 xs:space-x-2 py-2 xs:py-3 text-xs xs:text-sm">
                <Heart className="h-3 w-3 xs:h-4 xs:w-4" />
                <span className="hidden xs:inline">Favoritos</span>
                <span className="xs:hidden">Fav</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader className="pb-4 sm:pb-6">
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0">
                    <div>
                      <CardTitle className="text-lg xs:text-xl">Información Personal</CardTitle>
                      <CardDescription className="text-sm xs:text-base">
                        Actualiza tu información de contacto
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <Edit2 className="h-3 w-3 xs:h-4 xs:w-4" />
                      <span>{isEditing ? "Cancelar" : "Editar"}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-primary text-sm xs:text-base">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary text-sm xs:text-base">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
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
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 h-10 xs:h-11 sm:h-12 text-sm xs:text-base border-secondary/30 focus:border-action"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-4">
                      <Button onClick={handleSave} className="bg-action hover:bg-action/90 text-sm xs:text-base">
                        Guardar Cambios
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="text-sm xs:text-base">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4 sm:mt-6">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg xs:text-xl">Resumen de Actividad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center p-3 xs:p-4 bg-background rounded-lg border border-secondary/20">
                      <div className="text-xl xs:text-2xl font-bold text-action">{cartItems.length}</div>
                      <div className="text-xs xs:text-sm text-secondary mt-1">Productos en carrito</div>
                    </div>
                    <div className="text-center p-3 xs:p-4 bg-background rounded-lg border border-secondary/20">
                      <div className="text-xl xs:text-2xl font-bold text-action">{wishlist.length}</div>
                      <div className="text-xs xs:text-sm text-secondary mt-1">Productos favoritos</div>
                    </div>
                    <div className="text-center p-3 xs:p-4 bg-background rounded-lg border border-secondary/20">
                      <div className="text-xl xs:text-2xl font-bold text-action">${totalSpent.toLocaleString()}</div>
                      <div className="text-xs xs:text-sm text-secondary mt-1">Total en carrito</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg xs:text-xl">Historial de Pedidos</CardTitle>
                  <CardDescription className="text-sm xs:text-base">
                    Revisa tus compras anteriores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 sm:py-12">
                    <ShoppingBag className="h-10 w-10 xs:h-12 xs:w-12 text-secondary mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base xs:text-lg font-semibold text-primary mb-2">
                      No tienes pedidos aún
                    </h3>
                    <p className="text-secondary mb-4 sm:mb-6 text-sm xs:text-base">
                      Explora nuestra tienda y realiza tu primera compra
                    </p>
                    <Button asChild className="bg-action hover:bg-action/90 w-full xs:w-auto text-sm xs:text-base">
                      <a href="/shop">Ir a la Tienda</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg xs:text-xl">Lista de Favoritos</CardTitle>
                  <CardDescription className="text-sm xs:text-base">
                    Productos que has guardado para más tarde
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                      <Heart className="h-10 w-10 xs:h-12 xs:w-12 text-secondary mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base xs:text-lg font-semibold text-primary mb-2">
                        No tienes favoritos aún
                      </h3>
                      <p className="text-secondary mb-4 sm:mb-6 text-sm xs:text-base">
                        Explora productos y añádelos a tu lista de favoritos
                      </p>
                      <Button asChild className="bg-action hover:bg-action/90 w-full xs:w-auto text-sm xs:text-base">
                        <a href="/shop">Explorar Productos</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {wishlist.map((product) => (
                        <div key={product.id} className="border border-secondary/20 rounded-lg p-3 sm:p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 xs:h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                          />
                          <h4 className="font-semibold text-primary mb-2 line-clamp-2 text-sm xs:text-base">
                            {product.name}
                          </h4>
                          <p className="text-secondary text-xs xs:text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-base xs:text-lg font-bold text-action">
                              ${product.price.toLocaleString()}
                            </span>
                            <Button size="sm" asChild className="bg-action hover:bg-action/90 text-xs xs:text-sm px-2 xs:px-3">
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
