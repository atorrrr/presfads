import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const BOOKING_URL = "https://book.squareup.com/appointments/mhhy3h6z761e4o/location/LKWJHT5S9KSN3/services";

export function FloatingBookButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40" data-testid="floating-book-button-container">
      <Button
        asChild
        size="lg"
        className="h-14 px-6 font-bold text-base shadow-2xl shadow-primary/40 hover:shadow-3xl hover:shadow-primary/60 transition-all duration-300 gap-2 animate-pulse hover:animate-none"
        data-testid="button-floating-book"
      >
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Calendar className="h-5 w-5" />
          BOOK NOW
        </a>
      </Button>
    </div>
  );
}
