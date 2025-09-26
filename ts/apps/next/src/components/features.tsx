import { Beaker, Bot, Workflow, Brain } from "lucide-react";

const features = [
  {
    icon: Beaker,
    title: "Experiment Design",
    description:
      "AI-assisted protocol generation and optimization for your research",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Transform complex multi-step processes into streamlined automated pipelines",
  },
  {
    icon: Bot,
    title: "Research Agents",
    description:
      "Intelligent agents that help analyze data, suggest experiments, and find patterns",
  },
  {
    icon: Brain,
    title: "Knowledge Synthesis",
    description:
      "Automatically aggregate and synthesize findings from literature and experiments",
  },
];

export default function Features() {
  return (
    <section id="features" className="pt-40 pb-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Research Tools for the AI Era
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Accelerate discovery with intelligent automation and AI-powered
            insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-background border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
