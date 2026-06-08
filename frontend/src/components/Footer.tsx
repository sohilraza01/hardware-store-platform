import { Link } from "wouter";
import { Logo } from "./Logo";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-16 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Industrial strength meets modern precision. Ahmadi Hardware has been supplying top-tier tools and materials to professionals and enthusiasts for over 25 years.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiFacebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiInstagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <SiX size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors text-sm">Products</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products#power-tools" className="text-muted-foreground hover:text-primary transition-colors text-sm">Power Tools</Link>
              </li>
              <li>
                <Link href="/products#hand-tools" className="text-muted-foreground hover:text-primary transition-colors text-sm">Hand Tools</Link>
              </li>
              <li>
                <Link href="/products#fasteners" className="text-muted-foreground hover:text-primary transition-colors text-sm">Fasteners</Link>
              </li>
              <li>
                <Link href="/products#electrical" className="text-muted-foreground hover:text-primary transition-colors text-sm">Electrical</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-medium text-foreground">A:</span>
                123 Industrial Parkway, Suite 100<br />Metropolis, ST 12345
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-foreground">P:</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-foreground">E:</span>
                info@ahmadihardware.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Ahmadi Hardware. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
