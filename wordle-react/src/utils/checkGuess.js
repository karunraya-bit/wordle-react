export function checkGuess(guess, solutionWord) {
  const normalizedGuess = guess.toUpperCase();
  const normalizedSolution = solutionWord.toUpperCase();

  if (
    normalizedGuess.length !== 5 ||
    normalizedSolution.length !== 5
  ) {
    throw new Error("Both words must contain five letters.");
  }

  const result = Array(5).fill("absent");
  const letterCounts = {};

  // Count the solution letters.
  for (const letter of normalizedSolution) {
    letterCounts[letter] =
      (letterCounts[letter] || 0) + 1;
  }

  // First pass: correct positions.
  for (let i = 0; i < 5; i++) {
    if (normalizedGuess[i] === normalizedSolution[i]) {
      result[i] = "correct";
      letterCounts[normalizedGuess[i]]--;
    }
  }

  // Second pass: present letters.
  for (let i = 0; i < 5; i++) {
    const letter = normalizedGuess[i];

    if (
      result[i] !== "correct" &&
      letterCounts[letter] > 0
    ) {
      result[i] = "present";
      letterCounts[letter]--;
    }
  }

  return result;
}