'use client'

import { useState } from "react";
import Inventory from "./components/inventory";

export default function Home() {

  const [openInventory, setOpenInventory] = useState(false);

  /*
  return (
    <div className="w-full h-full flex flex-col bg-amber-200">
      hello
      <button className="w-[5rem] h-[5rem] bg-red-300" onClick={() => setOpenInventory(true)}>
        Inventory
      </button>
      {openInventory && (
        <Inventory onClose={() => setOpenInventory(false)}></Inventory>
      )}
    </div>
  );
  */
}
