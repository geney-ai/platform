import { Facebook, Twitter, Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  // TODO: Replace with your actual email if you want to include it
  const email = "your-email@example.com";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Project Name</h3>
            <p className="text-sm">
              Your project description goes here. Add a brief summary of what
              your project does.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#stats" className="text-sm hover:underline">
                  Stats
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-secondary">
                <Github size={24} />
              </a>
              <a href={`mailto:${email}`} className="hover:text-secondary">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm">
          &copy; {new Date().getFullYear()} Project Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
