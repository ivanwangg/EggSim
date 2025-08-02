import Image from 'next/image';

export default function EggDropSplash({
  showEggDrop,
  showSplash,
}: {
  showEggDrop: boolean;
  showSplash: boolean;
}) {
  return (
    <>
      {showEggDrop && (
        <div className="absolute top-[53%] left-[75%] z-100 egg-drop">
          <Image
            src="/egg.svg"
            alt="Egg Dropping"
            width={40}
            height={40}
            className="w-10"
          />
        </div>
      )}
      {showSplash && (
        <div className="absolute top-[57%] left-[75%] z-100 splash-animate">
          <Image
            src="/boil/splash.svg"
            alt="Splash Effect"
            width={48}
            height={48}
            className="w-12"
          />
        </div>
      )}
    </>
  );
}
