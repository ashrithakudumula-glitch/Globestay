import { Globe, Users, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Globe, title: "Global Reach", desc: "Hotels in 50+ destinations worldwide", color: "text-globe-sky" },
  { icon: Shield, title: "Secure Booking", desc: "Your payments and data are always protected", color: "text-globe-mint" },
  { icon: Users, title: "24/7 Support", desc: "Our team is always here to help you", color: "text-globe-coral" },
  { icon: Sparkles, title: "Best Prices", desc: "We guarantee the lowest rates available", color: "text-globe-sun" },
];

const About = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-to-br from-globe-sky to-globe-purple px-4 py-20 text-center">
      <h1 className="font-fredoka text-5xl font-bold text-primary-foreground">About GlobeStay</h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
        Making travel dreams come true since 2024. We connect travelers with the world's most amazing hotels.
      </p>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="border-none text-center shadow-lg">
            <CardContent className="p-6">
              <f.icon className={`mx-auto h-10 w-10 ${f.color}`} />
              <h3 className="mt-4 font-fredoka text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl space-y-6 text-center">
        <h2 className="font-fredoka text-3xl font-bold text-foreground">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          GlobeStay was born from a simple idea: everyone deserves an unforgettable stay. We handpick the finest hotels
          across the globe, ensuring each property meets our high standards for comfort, service, and value. Whether
          you're planning a romantic getaway in Santorini or a business trip to Tokyo, we've got you covered.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our team of travel enthusiasts works tirelessly to negotiate the best rates and curate unique experiences for
          our guests. Join thousands of happy travelers who trust GlobeStay for their accommodation needs.
        </p>
      </div>
    </section>
  </div>
);

export default About;
