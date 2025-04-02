import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          About The Project
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Describe your project's mission here. What problem does it
                solve? Why did you create it? This is a good place to explain
                your project's purpose and goals.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Explain your approach or methodology here. How does your project
                work? What makes it unique? This is where you can highlight your
                project's special qualities or techniques.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
