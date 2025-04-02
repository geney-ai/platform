import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Impact() {
  const stats = [
    { number: "500+", label: "Devices Donated" },
    { number: "1000+", label: "People Helped" },
    { number: "50+", label: "Partner Organizations" },
  ];

  return (
    <section id="impact" className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-primary-foreground text-primary">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">
                  {stat.number}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
