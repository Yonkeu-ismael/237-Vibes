import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReserveConfirmation from "@/components/activity-booking/ReserveConfirmation";
import type { PaymentMethodId } from "@/components/activity-booking/types";
import { activities } from "@/lib/mock-data";

function parseMethod(raw: string | undefined): PaymentMethodId {
   if (raw === "orange" || raw === "wave") return raw;
   return "mtn";
}

export default async function ActivityReserveConfirmationPage({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams: Promise<{ seats?: string; method?: string }>;
}) {
   const { id } = await params;
   const { seats: seatsRaw, method: methodRaw } = await searchParams;
   const activity = activities.find((a) => a.id === id);
   if (!activity) notFound();

   const parsed = Number.parseInt(seatsRaw ?? "1", 10);
   const seats = Number.isFinite(parsed) ? parsed : 1;
   const clamped = Math.min(Math.max(1, seats), Math.max(1, activity.spotsLeft));
   const method = parseMethod(methodRaw);

   const ticketId = `#TKT-237-2026-${activity.id.replace("evt-", "").padStart(2, "0")}${String(clamped).padStart(2, "0")}`;

   return (
      <>
         <Navbar />
         <div className="min-h-screen bg-[#09061b] pt-16">
            <ReserveConfirmation activity={activity} seats={clamped} method={method} ticketId={ticketId} />
         </div>
         <Footer />
      </>
   );
}
