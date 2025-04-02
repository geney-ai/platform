"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  // Replace with your actual email
  const contactEmail = "your-email@example.com";

  const handleContactClick = () => {
    window.location.href = `mailto:${contactEmail}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="text-2xl font-bold text-primary">
          Project Name
        </a>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <a
                href="#about"
                className="text-sm font-medium hover:text-primary"
              >
                About
              </a>
            </li>
            <li>
              <Button
                variant="ghost"
                className="flex items-center gap-1"
                onClick={handleContactClick}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
