import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon 📬");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-globe-coral to-globe-sun px-4 py-20 text-center">
        <h1 className="font-fredoka text-5xl font-bold text-primary-foreground">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
          Have a question or need help? We'd love to hear from you.
        </p>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-fredoka text-2xl font-bold text-foreground">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">hello@globestay.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-globe-sky/10">
                  <Phone className="h-5 w-5 text-globe-sky" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-globe-mint/10">
                  <MapPin className="h-5 w-5 text-globe-mint" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">123 Travel Street, Adventure City</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="font-fredoka">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required maxLength={255} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help?" rows={4} required maxLength={1000} />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-globe-coral font-semibold"
                >
                  {sending ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
