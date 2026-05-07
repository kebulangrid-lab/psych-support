import Image from "next/image";
import { FaRegUser } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden text-white">
      <div className="fixed inset-0 -z-10">
        <Image
          src="/landing.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center text-center gap-10">
        
        <div className="w-full max-w-lg rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-4 px-20 shadow-2xl mt-4">    
          <div className="flex justify-center mb-2">
            <Image
              src="/logo.jpg"
              alt="PsychSupport"
              width={200}
              height={200}
              className="rounded-2xl"
            />
          </div>

          <h1 className="text-sm md:text-md leading-tight">
            Building psychological capacity for effective adjustment and performance.
          </h1>

          <div className="flex flex-col items-center gap-1 mt-4">
            <FaRegUser />
            <p className="text-white/80 text-sm">
              Continue As
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            
            <button className="px-20 py-2 rounded-xl border border-white/50 bg-[#45265B]/50 text-sm font-medium hover:bg-[#45265B]/60 hover:border-white/60 transition-all duration-300 cursor-pointer">
              Admin
            </button>
            <button className="px-20 py-2 rounded-xl border border-white/50 bg-[#45265B]/50 text-sm font-medium hover:bg-[#45265B]/60 hover:border-white/60 transition-all duration-300 cursor-pointer">
              Client
            </button>
          </div>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl mt-10">
          <h2 className="text-3xl font-bold mb-6">
            ABOUT US
          </h2>
          <p className="text-md text-white/85">
            We at PES offer psychological support services and educational interventions
            and consultancy. Continuous improvement on support for sustainable mental
            health, adjustment and well-being, workplace productivity, and the effectiveness
            of organisations is our core focus.
            <br></br>
            <br></br>
            We support people to learn and develop the skills through structured coaching
            and facilitation, counselling, and evidence-based intervention aimed at
            improving psychological adjustment and well-being, behavioural functioning,
            educational development, and organisational development.
            <br></br>
            <br></br>
            The skills are key in preventing and controlling the triggers for psychological
            disorders, maladaptive behaviour, substance abuse, habits that are toxic and
            have direct and indirect negative impacts, and violence. Each service or
            programme is designed to meet specific needs of individuals, groups, and
            organisations.
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">
            METHODOLOGY
          </h2>
          <p className="text-md text-white/85">      
            Services at PES Ltd are available virtually and in person (online and onsite
            delivery) to anyone who understands basic English. Our practice is based on
            psychological principles, theories, methods to meet people's emerging need 
            <br></br>
            for
            <br></br>
            improvement and adjustment, improve education and human development, 
            <br></br>and
            <br></br>
            human factor issues in organisations. The services are provided by a team of
            highly skilled Psychologists with international experience in human
            development.
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-left">
            OUR SERVICES
          </h2>
          <ul className="list-disc pl-6 text-md text-white/85 text-left">
            <li>Basic psychological skills for people analytics.</li>
            <li>Learning new perspectives for improvement and adjustment.</li>
            <li>Skills for self-management of problems of the mind, emotions, and behaviour (including substance abuse and workplace violence).</li>
            <li>Intervention services for sustainable mental health.</li>
            <li>Train-the-trainers on skills for human development interventions.</li>
            <li>Curriculum development for workforce improvement.</li>
            <li>Attitudinal change skills.</li>
            <li>Employee surveys, organisational analysis, and development.</li>
            <li>Educational development and curriculum reviews.</li>
          </ul>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">OUR MISSION</h2>
          <p className="text-md text-white/85">
            To be a psychological support and educational development provider of
            psychological skills with integrity that expands capacity for adjustment and
            continuous improvement..
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">OUR VISION</h2>
          <p className="text-md text-white/85">
            To empower people and organisations with knowledge and skills to function
            effectively.
          </p>
        </div>

        <div className="w-full max-w-5xl rounded-[20px] border border-white/40 bg-white/5 backdrop-blur-md p-6 px-16 shadow-2xl mb-20">
          <h2 className="text-3xl font-bold mb-6">OBJECTIVES</h2>
          <p className="text-md text-white/85">
            We design specific intervention programmes that help people to recognise,
            analyse, and control the issues that have negative psychosocial impact on
            personal and career life, groups, and organisations.
          </p>
        </div>
        
        <div>
          <p className="text-white/80 text-3xl">Continue As</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-24 py-2 rounded-xl border border-white/50 bg-[#45265B]/50 text-xl font-medium hover:bg-[#45265B]/60 hover:border-white/60 transition-all duration-300 cursor-pointer">
              Admin
            </button>
            <button className="px-24 py-2 rounded-xl border border-white/50 bg-[#45265B]/50 text-xl font-medium hover:bg-[#45265B]/60 hover:border-white/60 transition-all duration-300 cursor-pointer">
              Client
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 bg-white/10 backdrop-blur-md border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-white/80">
          <div className="flex flex-col items-center md:items-start gap-4">
              <Image
                src="/logo.jpg"
                alt="PsychSupport"
                width={120}
                height={120}
                className="rounded-xl opacity-90"
              />
            <div className="text-sm space-y-1 text-center md:text-left font-light">
              <p>PsychSupport and Educational Services Ltd. Reg No. 8600521</p>
              <p>c/o #29 First Avenue, Gwarimpa, FCT, Abuja</p>
              <p>Tel: +234705 760 4930.</p>
            </div>
          </div>
          
          <div className="text-xs text-center md:text-right space-y-1 opacity-70">
            <p>© 2026. All rights reserved.</p>
            <p>Research, Design & Development by Kebulan Grid™</p>
          </div>
        </div>
      </footer>
    </main>
  );
}