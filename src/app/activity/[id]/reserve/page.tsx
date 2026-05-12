import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReserveStepDetail from "@/components/activity-booking/ReserveStepDetail";
import { activities } from "@/lib/mock-data";

export default async function ActivityReservePage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;
   const activity = activities.find((a) => a.id === id);
   if (!activity) notFound();

   return (
      <>
         <Navbar />
         <div className="min-h-screen bg-[#09061b] pt-16">
            <ReserveStepDetail activity={activity} />
         </div>
         <Footer />
      </>
   );
}
