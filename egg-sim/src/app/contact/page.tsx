import ContactCard from '../components/contactCard';

export default function AboutPage() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#FFFBF0] overflow-auto mt">
      <div className="w-[90%] h-[30rem] flex flex-row mt-10">
<<<<<<< HEAD
        <ContactCard img="hen_standing.svg" 
                     name="Evan Lin" 
                     title="Student at Middlebury College" 
                     email="evanl5733@gmail.com elin@middlebury.edu" 
                     description="Eggcelent Egg Sim Dev. Tries his eggly best to eggcel eggspectations. 
                     Eggspecially on egg sim."></ContactCard>
        <ContactCard img="hen_standing.svg" 
                     name="Ivan Wang" 
                     title="Student at Georgia Institute of Technology" 
                     email="ivanwang1239@gmail.com" 
                     description="A very lovely Egg Sim Dev!"></ContactCard>
        <ContactCard img="hen_standing.svg" 
                     name="Jayden Chen" 
                     title="" email="" 
                     description="Lead pixel artist"></ContactCard>
        <ContactCard img="hen_standing.svg" 
                     name="Raymond Zheng" 
                     title="Student at Clark University" 
                     email="rayzheng124@gmail.com" 
                     description="Cracking reality itself, one egg at a time!"></ContactCard>
=======
        <ContactCard
          img="hen_standing.svg"
          name="Evan Lin"
          title="Student at Middlebury College"
          email="evanl5733@gmail.com / elin@middlebury.edu"
          description="Eggcelent Egg Sim Dev. Tries his eggly best to eggcel eggspectations. Eggspecially on egg sim."
        ></ContactCard>
        <ContactCard
          img="hen_standing.svg"
          name="Ivan Wang"
          title="Student at Georgia Institute of Technology"
          email="ivanwang1239@gmail.com"
          description="A very lovely Egg Sim Dev!"
        ></ContactCard>
        <ContactCard
          img="hen_standing.svg"
          name="Jayden Chen"
          title=""
          email=""
          description="Lead pixel artist"
        ></ContactCard>
>>>>>>> 29e7492 (Set up Prettier and Linting)
      </div>
    </div>
  );
}
