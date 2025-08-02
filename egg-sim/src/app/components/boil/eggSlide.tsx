import Image from 'next/image';

export default function EggSlide() {
  return (
    <div className="absolute top-[45.8%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12">
      <div className="egg-slide">
        <Image
          src="/egg.svg"
          alt="Egg"
          width={40}
          height={40}
          className="w-10"
        />
      </div>
    </div>
  );
}
