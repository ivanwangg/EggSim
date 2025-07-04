import Image from 'next/image';
import { Item } from '../types/Item';

interface InfoItemModal {
  setOpenInfo: () => void;
  item: Item;
}

export default function InfoItemModal({ setOpenInfo, item }: InfoItemModal) {
  return (
    <div className="w-full h-full fixed inset-0 z-50 flex justify-center items-center">
      <div className="w-full h-full flex flex-col rounded-2xl bg-amber-100">
        <div className="w-full h-[5rem]">
          <button
            className="w-[6rem] rounded-2xl m-6 p-1 text-white bg-amber-700"
            onClick={setOpenInfo}
          >
            Close
          </button>
        </div>
        <div className="w-full h-[30rem] flex flex-col justify-center items-center">
          <Image
            src={item?.realImage || '/not-found-page/rooster_crying00.svg'}
            alt={item?.name}
            className="object-contain"
            width={400}
            height={400}
          />
          <p className="text-black mt-5">
            {item.description != null
              ? item.description
              : 'There is no real chicken like this, at least we think...'}
          </p>
        </div>
      </div>
    </div>
  );
}
