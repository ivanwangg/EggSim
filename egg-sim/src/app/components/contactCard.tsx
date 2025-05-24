
interface ContactCardProps {
  img: string
  name: string
  title: string
  email: string
  description: string
}

export default function ContactCard( {img, name, title, email, description}: ContactCardProps) {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src={img} className="w-[17rem] h-[17rem] rounded-[5rem] object-cover"></img>
      <p className="font-extrabold text-2xl my-3">
        {name}
      </p>
      <p className="italic">
        {title}
      </p>
      <p className="mb-3">
        {email}
      </p>
      <p>
        {description}
      </p>
    </div>
  );
}