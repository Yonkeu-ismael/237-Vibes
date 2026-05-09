import Image from "next/image";

const logos = [
   {
      id: "mtn",
      label: "MTN MoMo",
      src: "https://www.mtn.com/wp-content/themes/mtn-refresh/public/img/mtn-logo.svg",
      bgClass: "bg-[#FFCB05]",
   },
   {
      id: "orange",
      label: "Orange Money",
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg",
      bgClass: "bg-[#FF7900]",
   },
   {
      id: "wave",
      label: "Wave",
      src: "https://wave.com/img/nav-logo.png",
      bgClass: "bg-[#1AABEE]",
   },
];

export default function PaymentLogos({ compact = false }: { compact?: boolean }) {
   const badgeClass = compact ? "h-8 min-w-[68px] rounded-lg px-2.5" : "h-12 min-w-[92px] rounded-xl px-3";
   const logoSize = compact ? 44 : 60;

   return (
      <div className="flex gap-2.5">
         {logos.map((logo) => (
            <div
               key={logo.id}
               className={`relative flex items-center justify-center ${badgeClass} ${logo.bgClass} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]`}
               title={logo.label}
            >
               <Image
                  src={logo.src}
                  alt={logo.label}
                  width={logoSize}
                  height={logoSize}
                  className="h-auto w-auto max-h-[70%] max-w-[78%] object-contain"
                  unoptimized
               />
            </div>
         ))}
         <div className={`${badgeClass} flex items-center justify-center border border-white/15 bg-white/5`}>
            <span className={`${compact ? "text-xs" : "text-sm"} text-violet-200/80`}>💳 Carte</span>
         </div>
      </div>
   );
}
