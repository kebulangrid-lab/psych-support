import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import Footer from "@/components/Footer";
import UpcomingPrograms from "@/components/UpcomingPrograms";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden text-white">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/landing2.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/20" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center text-center gap-10">
        <div className="w-full max-w-4xl rounded-[20px] border border-white/40 bg-[#c6e4ff]/80 backdrop-blur-md p-8 shadow-2xl mt-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-4 md:mb-8">
            <Image
              src="/logo2.jpg"
              alt="PsychSupport"
              width={160}
              height={160}
              className="object-contain w-[100px] md:w-[160px] h-[100px] md:h-[160px]"
            />
            <div className="flex flex-col justify-center text-center md:text-left drop-shadow-md">
              <h1 className="text-2xl md:text-4xl font-bold text-[#45366b]">
                PsychSupport
              </h1>
              <h2 className="text-xl md:text-3xl font-bold text-[#45366b]">
                and Educational Services
              </h2>
            </div>
          </div>

          <p className="text-sm md:text-lg font-bold text-[#19193d] text-center w-full mt-6 md:mt-10">
            Building psychological capacity for effective adjustment and performance
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-[#19193d]">
                ABOUT US
              </h2>
              <p className="text-[13px] md:text-base text-[#19193d] font-medium leading-relaxed">
                PES offers variety of psychological support services and educational interventions.
                Our core focus is continuous improvement on sustainable mental health, psychological
                adjustment and well-being, human performance, career and organizational development.
                We support people to learn personal skills through structured coaching and facilitation,
                training, counseling, and evidence-based interventions for improving mental and
                behavioral functioning, personal growth, institutional and organizational development.
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <Image
                src="/landingsec1.jpg"
                alt="About Us"
                width={400}
                height={400}
                className="rounded-[20px] object-cover w-full h-[200px] md:h-[300px] shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-[#19193d] uppercase">
                METHODOLOGY
              </h2>
              <p className="text-[13px] md:text-base text-[#19193d] font-medium leading-relaxed">
                Services at PES are available virtually and in person (online and onsite delivery).<br />
                Our practice is based on psychological principles, theories, and techniques to meet people's emerging need for improvement on well-being, human performance, intervention, and education.<br />
                Faculty: The services are provided by a team of highly skilled Psychologists with international experience in human development.
              </p>
            </div>
            <div className="w-full md:w-2/5">
              <Image
                src="/landingsec2.jpg"
                alt="Methodology"
                width={400}
                height={400}
                className="rounded-[20px] object-cover w-full h-[200px] md:h-[300px] shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
          <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-[#19193d] text-left uppercase">
            OUR SERVICES
          </h2>
          <ul className="text-[13px] md:text-base text-[#19193d] font-medium leading-relaxed text-left space-y-1">
            <li>- Basic psychological skills for people analytics.</li>
            <li>- Learning new perspectives for improvement and adjustment.</li>
            <li>- Skills for self-management of problems of the mind, emotions, and behaviour (including substance abuse and workplace violence).</li>
            <li>- Intervention services for sustainable mental health.</li>
            <li>- Train-the-trainers on skills for human development interventions.</li>
            <li>- Curriculum development for workforce improvement.</li>
            <li>- Attitudinal change skills.</li>
            <li>- Employees survey and organisational analysis and development.</li>
            <li>- Educational development and curriculum reviews.</li>
          </ul>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
          <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-[#19193d] uppercase text-center">OUR VISION</h2>
          <p className="text-[13px] md:text-base text-[#19193d] font-medium leading-relaxed text-center">
            To be the psychological support and educational services provider with integrity that expands<br />
            human development for continuous improvement.
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-[#d8e8fa]/60 backdrop-blur-md p-6 md:p-10 shadow-2xl mt-10">
          <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-[#19193d] uppercase text-center">OUR MISSION</h2>
          <p className="text-[13px] md:text-base text-[#19193d] font-medium leading-relaxed text-center">
            To empower people and organizations with knowledge and skills for adjustment and continuous improvement.
          </p>
        </div>

        <UpcomingPrograms />


        <div className="mt-20">
          <p className="text-white/80 text-xl md:text-3xl">Continue As</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/sign-in" className="px-24 md:px-24 py-2 rounded-xl border border-white/50 bg-[#45265B]/80 text-lg md:text-xl font-medium hover:bg-[#45265B]/90 hover:border-white/60 transition-all duration-300 cursor-pointer text-center">
              Admin
            </Link>
            <Link href="/client/sign-in" className="px-24 md:px-24 py-2 rounded-xl border border-white/50 bg-[#45265B]/80 text-lg md:text-xl font-medium hover:bg-[#45265B]/90 hover:border-white/60 transition-all duration-300 cursor-pointer text-center">
              Client
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
