import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Build <span className="gradient-text">faster</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A modern, full-stack TypeScript application template with
              authentication, API integration, and a clean UI.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="/app/dashboard" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="text-center">
            <img
              src="/icon.svg"
              alt="generic"
              width={500}
              height={500}
              className="mx-auto w-full"
              style={{
                maxWidth: "500px",
                height: "500px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
