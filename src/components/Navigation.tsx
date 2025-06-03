
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const Navigation = ({ 
  items, 
  className = "", 
  orientation = "horizontal" 
}: NavigationProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className={`${className} ${orientation === "vertical" ? "flex flex-col space-y-2" : "flex space-x-4"}`}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant={isActive(item.href) ? "default" : "ghost"}
          size="sm"
          asChild
          className={`transition-colors ${
            isActive(item.href) 
              ? "bg-primary-action text-white" 
              : "text-primary-secondary hover:text-primary-action"
          }`}
        >
          <Link to={item.href}>
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
};

export default Navigation;
