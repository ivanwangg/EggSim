'use client'

import { useState } from "react";
import Inventory from "./components/inventory";
import { useInventory } from "./context/InventoryContext";

export default function Home() {

  const [openInventory, setOpenInventory] = useState(false);
  const { addItem } = useInventory();

  const handleAddChicken = () => {
    addItem({
      id: Date.now(),
      name: "Chicken",
      icon: "hen_standing_up.svg"
    })
  }

  /*
  return (
    <div className="w-full h-full flex flex-col bg-amber-200">
      hello
      <button className="w-[5rem] h-[5rem] bg-red-300" onClick={() => setOpenInventory(true)}>
        Inventory
      </button>

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
  */
}
