import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservePayment from "@/components/activity-booking/ReservePayment";
import { activities } from "@/lib/mock-data";

export default async function ActivityReservePaymentPage({
   params,
   searchParams,
}: {
   params: Promise<{ id: string }>;
   searchParams: Promise<{ seats?: string }>;
}) {
   const { id } = await params;
   const { seats: seatsRaw } = await searchParams;
   const activity = activities.find((a) => a.id === id);
   if (!activity) notFound();

   const parsed = Number.parseInt(seatsRaw ?? "1", 10);
   const seats = Number.isFinite(parsed) ? parsed : 1;
   const clamped = Math.min(Math.max(1, seats), Math.max(1, activity.spotsLeft));

   return (
      <>
         <Navbar />
         <div className="min-h-screen bg-[#09061b] pt-16">
            <ReservePayment activity={activity} seats={clamped} />
         </div>
         <Footer />
      </>
   );
}
