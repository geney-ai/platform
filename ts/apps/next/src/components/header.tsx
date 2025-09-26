"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4">
      <header className="flex items-center w-full max-w-screen-2xl mx-auto shadow-xl backdrop-blur-md bg-background/90 border border-border/50 rounded-2xl px-4 py-2 sm:px-8 sm:py-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center px-2 py-1.5 sm:px-4 sm:py-3 hover:bg-muted rounded-xl transition-colors"
          >
            <Image
              src="/icon.svg"
              alt="Icon"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-3 dark:invert dark:brightness-90"
            />
            <div className="flex flex-col">
              <span className="font-black text-xl sm:text-2xl leading-none">
                Geney
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex items-center flex-grow justify-end">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/#features"
              className="px-6 py-2.5 text-foreground hover:text-accent font-medium transition-colors"
            >
              Product
            </Link>
            <Link
              href="/blog"
              className="px-6 py-2.5 text-foreground hover:text-accent font-medium transition-colors"
            >
              Blog
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000"}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-full text-base font-medium hover:bg-accent/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Beta →
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-background border border-border rounded-xl shadow-xl sm:hidden">
            <div className="py-2">
              <Link
                href="/#features"
                className="block px-6 py-3 text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/blog"
                className="block px-6 py-3 text-foreground hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href={
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000"
                }
                className="block px-6 py-3 text-accent font-medium hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Beta →
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
