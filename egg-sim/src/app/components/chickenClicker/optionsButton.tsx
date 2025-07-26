interface OptionsButtonProps {
  description: string;
  onClick: () => void;
}

export default function OptionsButton({
  description,
  onClick,
}: OptionsButtonProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="w-[5rem] h-[5rem] mx-3 mt-3 bg-green-500"
        onClick={onClick}
      ></button>
      <p className="text-white font-bold">{description}</p>
    </div>
  );
}
