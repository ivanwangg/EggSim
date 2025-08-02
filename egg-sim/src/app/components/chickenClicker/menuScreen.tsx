import { useState } from 'react';
import OptionsButton from './optionsButton';
import { useRouter } from 'next/navigation';

export default function MenuScreen() {
  const router = useRouter();

  const [openUpgradesScreen, setOpenUpgradesScreen] = useState(false);
  const [openSettingsScreen, setOpenSettingsScreen] = useState(false);

  return (
    <div className="w-full bg-blue-500">
      <div className="w-full h-[8rem] flex flex-row justify-center items-center bg-red-300">
        <OptionsButton
          onClick={() => router.push('/home')}
          description="Home"
        />
        <OptionsButton
          onClick={() => setOpenUpgradesScreen(true)}
          description="Upgrades"
        />
        <OptionsButton
          onClick={() => setOpenSettingsScreen(true)}
          description="Settings"
        />
      </div>
      {openUpgradesScreen && <div>hello</div>}
    </div>
  );
}
