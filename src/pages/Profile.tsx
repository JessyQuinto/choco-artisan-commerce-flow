
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Save, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    phone: "+57 300 123 4567",
    address: "Calle 123 #45-67",
    city: "Bogotá",
    country: "Colombia"
  });

  const [mockOrders] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 145000,
      status: "Entregado",
      items: [
        { name: "Canasta Werregue Tradicional", quantity: 1, price: 145000 }
      ]
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      total: 305000,
      status: "En tránsito",
      items: [
        { name: "Máscara Ceremonial Tallada", quantity: 1, price: 220000 },
        { name: "Collar de Semillas Nativas", quantity: 1, price: 85000 }
      ]
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Profile updated", userInfo);
      setIsEditing(false);
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "text-green-600 bg-green-50";
      case "En tránsito":
        return "text-blue-600 bg-blue-50";
      case "Pendiente":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-text mb-8">
            Mi Perfil
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-primary-secondary/20 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary-text">
                    Información Personal
                  </h2>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-primary-action text-primary-action hover:bg-primary-action hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-primary-action hover:bg-primary-action/90 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? "Guardando..." : "Guardar"}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-primary-secondary text-primary-secondary hover:bg-primary-background"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2jvYcgUdbO3j_QmJPRSCbJeAMz2SfGi9AfeKEr9XnG3VlHPxaCFDwrKvCnsnPaMCMMlNfaVFA_V2S9MdVCZQQaR1uknllkTBbdX81L1uwxzdFBf-qiX97m0tSuDShVXVS4q6V1mpV82iqU195Gs4ZIo2MC23wUNZEVLDy8ilkV504DJDyME7D6xheARyvgL54b50c-EF9uWtFE-bZnSxvs8YaEwPylTu8marr8C-PxmSrxAEKNBv_a_eD-zc01JdY331G_Wo2" />
                      <AvatarFallback className="bg-primary-background text-primary-text">
                        {userInfo.firstName[0]}{userInfo.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-primary-text">
                        {userInfo.firstName} {userInfo.lastName}
                      </h3>
                      <p className="text-primary-secondary">{userInfo.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-primary-text">
                        Nombre
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-primary-text">
                        Apellido
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-primary-text">
                        Correo Electrónico
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-primary-text">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-primary-text">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-primary-text">
                        Ciudad
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={userInfo.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-primary-text">
                        País
                      </Label>
                      <Input
                        id="country"
                        name="country"
                        value={userInfo.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 border-primary-secondary/30 focus:border-primary-action disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div>
              <div className="bg-white border border-primary-secondary/20 rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-primary-text mb-6">
                  Mis Pedidos
                </h2>
                
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-primary-secondary/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-primary-text">
                          {order.id}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-primary-secondary mb-2">
                        {new Date(order.date).toLocaleDateString('es-ES')}
                      </p>
                      <div className="space-y-1 mb-3">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-xs text-primary-secondary">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                      <p className="font-bold text-primary-action">
                        ${order.total.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6 border-primary-secondary text-primary-text hover:bg-primary-background"
                >
                  Ver Todos los Pedidos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
