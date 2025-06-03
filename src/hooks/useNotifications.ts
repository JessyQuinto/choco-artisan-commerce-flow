
import { useToast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const { toast } = useToast();

  const showSuccess = (message: string) => {
    toast({
      title: "Éxito",
      description: message,
      variant: "default"
    });
  };

  const showError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive"
    });
  };

  const showInfo = (message: string) => {
    toast({
      title: "Información",
      description: message,
      variant: "default"
    });
  };

  return {
    showSuccess,
    showError,
    showInfo
  };
};
