import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FloatingBookButton } from "@/components/floating-book-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingBookButton />
    </div>
  );
}
