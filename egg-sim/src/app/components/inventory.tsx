import {useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";

interface InventoryProps {
  onClose: () => void;
};

export default function Inventory({ onClose }: InventoryProps) {

  const [isVisible, setVisible] = useState(false);
  const { items, removeItem } = useInventory();
  
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
        <div className="w-full h-full flex flex-wrap justify-center items-center border-3 rounded-lg pt-7 content-start overflow-auto bg-green-300">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative w-[7rem] h-[7rem] border-2 rounded-lg border-red-400 m-2 flex justify-center items-center bg-white"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs hover:bg-red-800"
                title="Remove item"
              >
                X
              </button>
              <img
                src={item.icon}
                alt={item.name}
                title={item.name}
                className="w-[80%] h-[80%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}