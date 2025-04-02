import { Zap, Shield, BarChart } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-12 w-12 mb-4 text-primary" />,
      title: "Feature One",
      description:
        "Describe your first key feature here. What makes it valuable to users?",
    },
    {
      icon: <Shield className="h-12 w-12 mb-4 text-primary" />,
      title: "Feature Two",
      description:
        "Describe your second key feature here. How does it benefit your users?",
    },
    {
      icon: <BarChart className="h-12 w-12 mb-4 text-primary" />,
      title: "Feature Three",
      description:
        "Describe your third key feature here. What problem does it solve?",
    },
  ];

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
