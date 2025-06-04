import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function About() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
        <p className="text-xl mb-8 opacity-90">
          Get started with a modern TypeScript web application template.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <a href="/app/dashboard" className="flex items-center justify-center">
            Start Free
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
