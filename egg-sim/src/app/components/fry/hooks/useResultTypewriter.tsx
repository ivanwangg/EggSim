import { useEffect } from 'react';

function getResultParts(cookTime: number): [string, string] {
  if (cookTime < 1) {
    return [
      ' Straight Yolk',
      '  Basically raw. A slippery situation. Not recommended!',
    ];
  } else if (cookTime <= 2) {
    return [
      ' Glossy Goo',
      "  Sizzling but still slimy. It's more art than breakfast.",
    ];
  } else if (cookTime <= 3) {
    return [
      ' Barely Sunny',
      '  Soft whites, runny yolk. A bit under, but getting there.',
    ];
  } else if (cookTime <= 4) {
    return [
      ' Sunny Side Up',
      '  Classic diner style. Bright yolk, delicate whites.',
    ];
  } else if (cookTime <= 5) {
    return [
      ' Half-Set Hero',
      '  The yolk jiggles, the whites stand firm. A balance of chaos and control.',
    ];
  } else if (cookTime <= 6) {
    return [
      ' Over Easy',
      '  Flipped and still gooey in the center. For the adventurous bruncher.',
    ];
  } else if (cookTime <= 7) {
    return [
      ' Over Medium',
      '  Perfectly balanced – not too soft, not too firm.',
    ];
  } else if (cookTime < 9) {
    return [
      ' Over Hard',
      '  Solid yolk, crisp edges. A dependable breakfast companion.',
    ];
  } else if (cookTime <= 10) {
    return [' Pan Toasted', '  Well-done and proud. A bite with backbone.'];
  } else {
    return [
      ' Crispy Special',
      '  Crackly edges, tough core. A bite forged in hellfire.',
    ];
  }
}

export default function useResultTyping({
  showResult,
  cookTime,
  setTypedTitle,
  setTypedDescription,
}: {
  showResult: boolean;
  cookTime: number;
  setTypedTitle: React.Dispatch<React.SetStateAction<string>>;
  setTypedDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  useEffect(() => {
    if (!showResult) return;

    const [title, description] = getResultParts(cookTime);

    setTypedTitle('');
    setTypedDescription('');
    let titleIndex = 0;
    let descIndex = 0;

    const typeTitle = () => {
      if (titleIndex < title.length - 1) {
        titleIndex++;
        setTypedTitle((prev) => prev + title[titleIndex]);
        setTimeout(typeTitle, 50);
      } else {
        setTimeout(typeDescription, 300);
      }
    };

    const typeDescription = () => {
      if (descIndex < description.length - 1) {
        descIndex++;
        setTypedDescription((prev) => prev + description[descIndex]);
        setTimeout(typeDescription, 50);
      }
    };

    typeTitle();
  }, [showResult, cookTime]);
}
