import Image from 'next/image';

export default function SeasoningShake({
  showSaltShaker,
  showPepperShaker,
}: {
  showSaltShaker: boolean;
  showPepperShaker: boolean;
}) {
  return (
    <>
      {showSaltShaker && (
        <div
          className="absolute top-[50%] left-[75.5%] z-10 rotate-shake poof-in"
          style={{
            transformOrigin: 'center top',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Image
            src="/fry/salt_shaker.svg"
            alt="Salt Shaker"
            width={30}
            height={30}
          />
        </div>
      )}

      {showPepperShaker && (
        <div
          className="absolute top-[50%] left-[75.5%] z-10 rotate-shake poof-in"
          style={{
            transformOrigin: 'center top',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <Image
            src="/fry/pepper_shaker.svg"
            alt="Pepper Shaker"
            width={30}
            height={30}
          />
        </div>
      )}
    </>
  );
}
