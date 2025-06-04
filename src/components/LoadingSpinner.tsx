
const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary-secondary text-sm">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
