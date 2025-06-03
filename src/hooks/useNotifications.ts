
import { toast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const showSuccess = (message: string, title?: string) => {
    toast({
      title: title || "¡Éxito!",
      description: message,
      variant: "default"
    });
  };

  const showError = (message: string, title?: string) => {
    toast({
      title: title || "Error",
      description: message,
      variant: "destructive"
    });
  };

  const showInfo = (message: string, title?: string) => {
    toast({
      title: title || "Información",
      description: message,
      variant: "default"
    });
  };

  return { showSuccess, showError, showInfo };
};
