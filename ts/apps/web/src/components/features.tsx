import { Card } from "@/components/ui/card";
import { Zap, Lock, Code } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-12 w-12 mx-auto mb-4" />,
      title: "Lightning Fast",
      description:
        "Built with performance in mind. Modern TypeScript backend with Next.js frontend.",
      badge: "Fast",
    },
    {
      icon: <Lock className="h-12 w-12 mx-auto mb-4" />,
      title: "Secure by Default",
      description:
        "Authentication, authorization, and security best practices built in from the start.",
      badge: "Secure",
    },
    {
      icon: <Code className="h-12 w-12 mx-auto mb-4" />,
      title: "Developer Friendly",
      description:
        "Clean architecture, type safety, and modern tooling for a great developer experience.",
      badge: "Simple",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Why generic?</h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Everything you need to build modern TypeScript web applications
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <Card className="h-full p-6 relative">
                <span className="absolute top-2 right-2 text-xs bg-muted px-2 py-1 rounded">
                  {feature.badge}
                </span>
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
