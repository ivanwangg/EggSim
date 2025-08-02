import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FFFBF0] overflow-auto">
      <div className="w-3/4 flex flex-row mt-20 mb-8 items-center">
        <div className="flex-1 flex flex-col items-center mr-20">
          <h2 className="font-bold text-[#FBBF24] text-4xl mb-6">
            Why this website?
          </h2>
          <p className="text-gray-900 leading-relaxed text-lg">
            EggSim is a personal project crafted with React, born from a passion
            for web development and the fascinating world of chickens. Our goal
            was to create something educational, fun, and interactive—going
            beyond static facts. With EggSim, users can explore chickens through
            hands-on simulations and engaging mini-games, simplifying complex
            concepts. It&apos;s a small project with a big purpose: to make
            learning about poultry both informative and entertaining.
          </p>
        </div>
        <Image
          src="/logo/logo_mascot.svg"
          width={350}
          height={350}
          alt="Logo Image"
          className="object-contain"
        />
      </div>
      <div className="w-3/4 flex flex-row mb-20 items-center">
        <Image
          src="/walking/hen_walking0.svg"
          width={400}
          height={400}
          alt="Hen Walking"
          className="object-contain"
        />
        <div className="flex-1 flex flex-col items-center ml-20">
          <h2 className="font-bold text-[#FBBF24] text-4xl mb-6">
            Our Motivations
          </h2>
          <p className="text-gray-900 leading-relaxed text-lg">
            EggSim began as a passion project—a fusion of our love for chickens
            and web development. Chickens are quirky, clever, and full of
            personality, and we wanted to celebrate them in a fun, accessible
            way. Using React and TypeScript, we aimed to build an experience
            that&apos;s not only educational but genuinely enjoyable. EggSim is
            our way of turning learning into play and making the world of
            chickens exciting for everyone who discovers it.
          </p>
        </div>
      </div>
    </div>
  );
}
