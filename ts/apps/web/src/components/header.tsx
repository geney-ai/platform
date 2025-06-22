import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-stretch w-full shadow-sm">
      <div className="flex items-center w-48">
        <a
          href="/"
          className="flex items-center px-4 py-2 hover:bg-muted rounded-full mx-2 my-1"
        >
          <img
            src="/icon.svg"
            alt="Icon"
            width={32}
            height={32}
            className="mr-2"
          />
          <div className="flex flex-col">
            <span className="font-black text-xl leading-none">GenericTS</span>
          </div>
        </a>
      </div>

      <nav className="flex items-stretch flex-grow">
        <div className="flex items-center gap-6 ml-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#roadmap"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Roadmap
          </a>
        </div>
      </nav>

      <div className="flex items-center gap-2 mr-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="relative"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}
