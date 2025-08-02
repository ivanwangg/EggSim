import { useEffect } from 'react';

export default function useResultTypewriter(
  showResult: boolean,
  cookTime: number,
  setTypedTitle: React.Dispatch<React.SetStateAction<string>>,
  setTypedDescription: React.Dispatch<React.SetStateAction<string>>
) {
  function getResultParts(cookTime: number): [string, string] {
    if (cookTime < 1) {
      return [
        ' Raw Trouble',
        '  The egg is mostly uncooked—clear whites, runny yolk. Not safe to eat!',
      ];
    } else if (cookTime <= 2) {
      return [
        ' Very Soft Boil',
        '  Whites are barely set, yolk is fully liquid. Good for dipping, but fragile.',
      ];
    } else if (cookTime <= 3) {
      return [
        ' Soft Boiled',
        '  Whites are mostly set, yolk is creamy and runny. Perfect for ramen or toast soldiers.',
      ];
    } else if (cookTime <= 4) {
      return [
        ' Medium-Soft Boil',
        '  Whites are fully set, yolk is jammy but not runny. Great balance of texture.',
      ];
    } else if (cookTime <= 6) {
      return [
        ' Medium Boiled',
        '  Whites are firm, yolk is partly set but still creamy in the center.',
      ];
    } else if (cookTime <= 10) {
      return [
        ' Hard Boiled',
        '  Whites are firm, yolk is fully set and pale yellow. Ideal for salads or deviled eggs.',
      ];
    } else {
      return [
        ' Overcooked',
        '  Chalky yolk and rubbery whites. Might have a green-gray ring—still edible, just dry.',
      ];
    }
  }

  useEffect(() => {
    // writes the title and description portion of the result page
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
        setTimeout(() => typeDescription(), 300);
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
