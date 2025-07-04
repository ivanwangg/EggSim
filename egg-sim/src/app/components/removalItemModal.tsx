import { Item } from '../types/Item';

interface RemovalItemModalProps {
  itemToRemove: Item | undefined;
  removeItem: () => void;
  setConfirmItemId: () => void;
}

export default function RemovalItemModal({
  itemToRemove,
  removeItem,
  setConfirmItemId,
}: RemovalItemModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-[25rem]">
        <p className="text-center text-lg font-semibold mb-4">
          Are you sure you want to remove
          <br />
          <span className="text-red-500">{itemToRemove?.name} Chicken</span>
          <br />
          from your collection?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              removeItem();
              setConfirmItemId();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmItemId()}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
