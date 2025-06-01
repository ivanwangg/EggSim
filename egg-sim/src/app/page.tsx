'use client'

import { useState } from "react";
import Inventory from "./components/inventory";
import { useInventory } from "./context/InventoryContext";

export default function Home() {

  const [openInventory, setOpenInventory] = useState(false);
  const { addItem } = useInventory();

  const handleAddChicken = () => {
    addItem({
      id: "chick-blue",
    })
  }

  return (
    <div className="w-full h-full flex flex-col bg-amber-200">
      hello
      
      <div className="relative inline-block w-[5rem] h-[5rem] m-2">
        <img src="inventory/backpack.svg" className="w-full h-full"/>
        <button
          className="absolute inset-0 w-full h-full"
          onClick={() => setOpenInventory(true)}
        >
        </button>
      </div>

      <button
        onClick={handleAddChicken}
        className="w-[5rem] h-[5rem] bg-green-500 text-white rounded"
      >
        Add chicken to inventory
      </button>

      {openInventory && (
        <Inventory onClose={() => setOpenInventory(false)}></Inventory>
      )}
    </div>
  );
}
