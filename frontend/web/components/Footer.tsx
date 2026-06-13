import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-black/20 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="px-8 mx-auto flex justify-between items-end gap-8 text-white/80">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/logo.jpg"
            alt="PsychSupport"
            width={120}
            height={120}
            className="rounded-xl opacity-90"
          />
          <div className="text-[8px] md:text-sm space-y-1 text-left font-light">
            <p>PsychSupport and Educational Services Ltd. Reg No. 8600521</p>
            <p>c/o #29 First Avenue, Gwarimpa, FCT, Abuja</p>
            <p>Tel: +234705 760 4930.</p>
          </div>
        </div>

        <div className="text-[7px] md:text-xs text-right space-y-1 opacity-70">
          <p>© 2026. All rights reserved.</p>
          <p>Research, Design & Development by Kebulan Grid™</p>
        </div>
      </div>
    </footer>
  );
}
