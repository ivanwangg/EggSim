import ContactCard from "../components/contactCard";

export default function AboutPage() {

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FFFBF0] overflow-auto">
      <div className="w-[90%] h-[30rem] flex flex-row mt-10">
        <ContactCard img="hen_standing.svg" name="Evan Lin" title="Student at Middlebury College" email="evanl5733@gmail.com / elin@middlebury.edu" description="egg sim dev"></ContactCard>
        <ContactCard img="hen_standing.svg" name="Ivan Wang" title="Student at Georgia Institute of Technology" email="ivanwang1239@gmail.com" description="A very lovely Egg Sim Dev!"></ContactCard>
        <ContactCard img="hen_standing.svg" name="Jayden Chen" title="" email="" description=""></ContactCard>
      </div>
    </div>
  );
}