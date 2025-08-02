import React from 'react';

const backgrounds = [
  { stage: 0, src: '/kitchen_background.svg' },
  { stage: 1, src: '/boil/sink_close_up.svg' },
  { stage: 2, src: '/boil/sink_close_up_water_open.svg' },
  { stage: 3, src: '/boil/stovetop_close_up.svg' },
];

export default function BackgroundLayers({
  backgroundStage,
}: {
  backgroundStage: number;
}) {
  return (
    <>
      {backgrounds.map(({ stage, src }) => (
        <div
          key={stage}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: backgroundStage === stage ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}
    </>
  );
}
