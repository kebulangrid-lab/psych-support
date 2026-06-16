import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 bg-black/20 backdrop-blur-md border-t border-white/10 mt-auto">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-white/80 sm:px-8">

        <div className="flex flex-col items-start gap-6 w-full md:w-auto">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Image
              src="/logo2.jpg"
              alt="PsychSupport"
              width={70}
              height={70}
              className="rounded-xl opacity-90 object-contain mix-blend-screen"
            />
            <div className="text-[#51329a] font-bold text-lg md:text-xl leading-tight">
              PsychSupport<br />
              and Educational Services
            </div>
          </div>

          {/* Address */}
          <div className="text-[10px] md:text-sm space-y-1 text-left font-light">
            <p>PsychSupport and Educational Services Ltd. Reg No. 8600521</p>
            <p>c/o #29 First Avenue, Gwarimpa, FCT, Abuja</p>
          </div>

          {/* Contact and WhatsApp */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-24 pt-2">
            <div className="text-[10px] md:text-sm space-y-1 font-light">
              <p>+234705 760 4930.</p>
              <p>Email: profjoe@psychsupportedu.com</p>
            </div>

            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500 text-2xl md:text-3xl" />
              <span className="text-[10px] md:text-sm font-light">+234 705 760 4930</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[8px] md:text-xs md:text-right space-y-1 opacity-70 flex-shrink-0 mt-4 md:mt-0 pb-1">
          <p>© 2026. All rights reserved.</p>
          <p>Research, Design & Development by Kebulan Grid™</p>
        </div>
      </div>
    </footer>
  );
}
