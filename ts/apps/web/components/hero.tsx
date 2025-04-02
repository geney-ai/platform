import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Project Headline
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          A compelling description of your project. Explain what makes it
          special in a sentence or two.
        </p>
        <Button size="lg" asChild>
          <a href="#about">Learn More</a>
        </Button>
      </div>
    </section>
  );
}
