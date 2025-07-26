'use client';
import ClickingScreen from '../components/chickenClicker/clickingScreen';
import MenuScreen from '../components/chickenClicker/menuScreen';

export default function ChickenClicker() {
  return (
    <div className="w-full h-full flex flex-row bg-red-400">
      <MenuScreen />
      <ClickingScreen />
    </div>
  );
}
