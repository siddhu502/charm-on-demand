import { Link } from "react-router-dom";
import { BookOpen, Facebook, Instagram, Youtube, Send, MessageCircle } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const socialLinks = [
    { name: "YouTube", icon: Youtube, href: "https://www.youtube.com/@smartlyshikshan", hoverClass: "hover:bg-red-600" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/smartshikshan", hoverClass: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/smartlyshikshan", hoverClass: "hover:bg-blue-600" },
    { name: "Telegram", icon: Send, href: "https://t.me/smartshikshan", hoverClass: "hover:bg-sky-500" },
    { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/9730100160", hoverClass: "hover:bg-green-500" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        {/* Logo & Description */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center space-x-3 mb-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-shadow duration-300">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-heading text-secondary-foreground">
              Smart Abhyas
            </span>
          </Link>
          <p className="text-secondary-foreground/70 text-center max-w-md">
            Your trusted partner for exam preparation and study materials. Quality education made accessible.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {footerLinks.map((link, index) => (
            <div key={link.name} className="flex items-center">
              <Link
                to={link.href}
                className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="ml-4 text-secondary-foreground/30">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground transition-all duration-300 hover:scale-110 hover:text-white ${social.hoverClass}`}
                aria-label={social.name}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-secondary-foreground/10 pt-6">
          <p className="text-secondary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Smart Abhyas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
