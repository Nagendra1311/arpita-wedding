import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FFF9FB] text-center">
      <h2 className="font-serif text-3xl font-bold text-[#4A0E2E] mb-2">Page Not Found</h2>
      <p className="font-cormorant italic text-stone-600 mb-6">The auspicious page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#4A0E2E] text-[#FDE68A] font-serif text-xs uppercase tracking-wider font-bold shadow-md hover:brightness-110 transition-all"
      >
        Return to Wedding Card
      </Link>
    </div>
  );
}

