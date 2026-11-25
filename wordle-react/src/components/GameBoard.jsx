import Row from "./Row";
import { checkGuess } from "../utils/checkGuess";

const MAX_GUESSES = 6;

export default function GameBoard({
  solutionWord,
  currentGuess,
  pastGuesses
}) {
  const rows = Array.from(
    { length: MAX_GUESSES },
    (_, index) => {
      const completedGuess = pastGuesses[index];

      const isCurrentRow =
        index === pastGuesses.length;

      const letters = completedGuess ??
        (isCurrentRow ? currentGuess : "");

      const statuses = completedGuess
        ? checkGuess(completedGuess, solutionWord)
        : [];

      return { letters, statuses };
    }
  );

  return (
    <section
      className="game-board"
      role="grid"
      aria-label="Wordle game board"
    >
      {rows.map((row, index) => (
        <Row
          key={index}
          letters={row.letters}
          statuses={row.statuses}
        />
      ))}
    </section>
  );
}