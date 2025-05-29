import {useState, useEffect } from "react";

interface InventoryProps {
  onClose: () => void;
};

export default function Inventory({ onClose }: InventoryProps) {

  const [isVisible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, [])

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-row justify-center items-center">
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ${
          isVisible ? "opacity-70" : "opacity-0"
        }`}
      />
      {/* modal */}
      <div className={`relative w-[90%] h-[90%] z-10 flex flex-col transform transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}>
        <div className="w-full h-[5rem] flex flex-row justify-center items-center border-x-3 border-t-3 rounded-lg border-black bg-blue-400">
          <div className="w-[20rem] h-full flex flex-row justify-center items-center">
            <button className="w-[7rem] font-bold" onClick={handleClose}>
              Return
            </button>
          </div>
          <p className="w-full h-full flex flex-row font-bold text-2xl justify-center items-center border-x-3 rounded-lg border-black bg-amber-300">
            My Collection
          </p>
          <div className="w-[20rem] h-full">

          </div>
        </div>
        <div className="w-full h-full flex flex-wrap justify-start items-start border-3 rounded-lg pl-[3rem] pt-[3rem] bg-green-300">
          <div className="w-[7rem] h-[7rem] border-2 rounded-lg border-red-400 m-2">

          </div>
        </div>
      </div>
    </div>
  )
}