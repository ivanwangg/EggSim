'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How long do you want to boil an egg?',
      answer: [
        '5 minutes: set white and runny yolk – just right for dipping into.',
        '6 minutes: liquid yolk – a little less oozy.',
        '7 minutes: almost set – deliciously sticky.',
        '8 minutes: softly set – this is what you want to make Scotch eggs.',
        '10 minutes: the classic hard-boiled egg – mashable but not dry and chalky.',
      ],
    },
    {
      question: 'What is every way to fry an egg?',
      answer: [
        'The most common methods are: sunny side up, over easy, over medium, and over well.',
      ],
    },
    {
      question: 'Are eggs good for you?',
      answer: [
        "Yes. Eggs are a good source of protein, healthy fats, and vitamins such as B12, D, and A. The only way it would be bad for you is if you cooked it wrong and that's on you, not the egg.",
      ],
    },
    {
      question: 'How many eggs are eaten per year?',
      answer: [
        'Over 1 trillion eggs are consumed globally each year. The average American eats about 280 eggs annually.',
      ],
    },
  ];

  const [openStates, setOpenStates] = useState<boolean[]>(
    faqs.map(() => false)
  );
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === 0 ? 1 : 0));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const toggle = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className="bg-[#FFFBF0] min-h-screen py-12">
      <main className="max-w-4xl mx-auto px-6">
        {/* Title with animated hen */}
        <div className="flex items-center justify-center gap-6 mb-16 pt-20">
          <h1 className="text-[#FBBF24] text-6xl md:text-7xl font-extrabold leading-tight select-none drop-shadow-lg">
            Facts about Eggs
          </h1>
          <div className="relative w-32 h-32 select-none drop-shadow-lg">
            {activeImage === 0 ? (
              <Image
                src="/hen_standing.svg"
                alt="Hen standing"
                className="absolute inset-0 object-contain transition-opacity duration-100 opacity-100"
                width={128}
                height={128}
              />
            ) : (
              <Image
                src="/hen_standing_up.svg"
                alt="Hen standing up"
                className="absolute inset-0 object-contain transition-opacity duration-100 opacity-100"
                width={128}
                height={128}
              />
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#FBBF24] hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={openStates[index]}
                className={`w-full flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#D97706] rounded px-3 py-2
                  ${openStates[index] ? 'text-[#D97706]' : 'text-[#8B5E3C]'}
                  hover:bg-[#FFF7E6]
                `}
              >
                <span className="text-2xl font-semibold leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`transition-transform duration-300 ease-in-out transform ${
                    openStates[index] ? 'rotate-90 scale-125' : 'scale-100'
                  }`}
                >
                  <ChevronRight size={32} />
                </span>
              </button>

              <ul
                className={`list-disc list-inside mt-4 text-[#333333] italic leading-relaxed max-h-0 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  openStates[index] ? 'max-h-96' : ''
                }`}
              >
                {faq.answer.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
