import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WeddingInvitationContainer } from "@/components/WeddingInvitationContainer";

export default function VideoInvitationPage() {
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black">
      {/* Floating Back to Card button */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-[999] flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/60 text-[#FDE68A] text-xs font-serif uppercase tracking-widest hover:border-white transition-all shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>View Wedding Card</span>
      </Link>

      <WeddingInvitationContainer />
    </div>
  );
}
