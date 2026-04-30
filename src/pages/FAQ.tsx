import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I book a hotel?",
    a: "Simply browse our hotels, select your check-in and check-out dates, and click 'Book Now'. You'll need to sign in and complete the payment to confirm your reservation.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes! Go to 'My Bookings' from the navigation menu and click the cancel button next to your reservation. Cancellations are processed immediately.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. We use industry-standard encryption to protect your payment details. Your card information is never stored on our servers.",
  },
  {
    q: "How do I create an account?",
    a: "Click 'Sign In' in the top right corner, then switch to the 'Sign Up' tab. Enter your email and password to create your free account.",
  },
  {
    q: "Can I save hotels to a wishlist?",
    a: "Yes! Click the heart icon on any hotel card to add it to your favorites. View all your saved hotels from the 'Favorites' page.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards including Visa, Mastercard, and American Express.",
  },
  {
    q: "How do I contact customer support?",
    a: "Visit our Contact page to send us a message, or email us directly at hello@globestay.com. We typically respond within 24 hours.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No! The price you see is the price you pay. We believe in transparent pricing with no surprise charges.",
  },
];

const FAQ = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-to-br from-globe-mint to-secondary px-4 py-20 text-center">
      <h1 className="font-fredoka text-5xl font-bold text-primary-foreground">FAQ</h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
        Got questions? We've got answers.
      </p>
    </section>

    <section className="container mx-auto max-w-2xl px-4 py-16">
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border-none bg-card px-6 shadow-md">
            <AccordionTrigger className="font-fredoka text-left font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  </div>
);

export default FAQ;
