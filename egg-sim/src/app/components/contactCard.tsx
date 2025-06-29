
interface ContactCardProps {
  img: string
  name: string
  title: string
  email: string
  description: string
}

export default function ContactCard( {img, name, title, email, description}: ContactCardProps) {

  return (
    <div className="w-full h-full flex flex-col justify-start items-center mt-4">
      <img src={img} className="w-[17rem] h-[17rem] rounded-[5rem] object-cover"></img>
      <p className="font-extrabold text-2xl my-3 text-black">
        {name}
      </p>
      <p className="italic text-black">
        {title}
      </p>
      <p className="mb-3 text-black text-center">
        {email}
      </p>
      <p className="text-black text-center">
        {description}
      </p>
    </div>
  );
}