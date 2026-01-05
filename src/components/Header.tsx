import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, ChevronDown, Menu, X, BookOpen, Home, Info, Phone, Shield } from "lucide-react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [{
    name: "Home",
    href: "/",
    icon: Home
  }, {
    name: "About",
    href: "/about",
    icon: Info
  }, {
    name: "Contact",
    href: "/contact",
    icon: Phone
  }];
  return <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">Smart shikshan</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => <Link key={link.name} to={link.href} className="px-4 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 font-medium">
              {link.name}
            </Link>)}

          {/* My Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 text-muted-foreground hover:text-primary hover:bg-primary/5">
                <User className="h-4 w-4" />
                <span>My Account</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/my-account")} className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                My Downloads
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/admin">
            <Button variant="outline" size="sm" className="ml-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-96 border-t border-border" : "max-h-0"}`}>
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
          {navLinks.map(link => {
          const Icon = link.icon;
          return <Link key={link.name} to={link.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/5 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>;
        })}
          <Link to="/my-account" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/5 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
            <User className="h-4 w-4" />
            My Account
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-primary/5 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
            <Shield className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      </div>
    </header>;
};
export default Header;