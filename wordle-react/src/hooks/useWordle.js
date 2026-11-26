import { useCallback, useState } from "react";
import { getRandomWord } from "../data/words";
import { checkGuess } from "../utils/checkGuess";

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const STATUS_PRIORITY = {
  absent: 1,
  present: 2,
  correct: 3
};

export default function useWordle() {

  // Required states.
  const [solutionWord, setSolutionWord] = useState("ZEBRA");

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState(
    "IN_PROGRESS"
  );

  // Additional states.
  const [keyboardStatuses, setKeyboardStatuses] = useState({});
  const [message, setMessage] = useState("");

  // Add a letter.
  const addLetter = useCallback((letter) => {
    if (gameStatus !== "IN_PROGRESS") return;

    const normalizedLetter = letter.toUpperCase();

    if (!/^[A-Z]$/.test(normalizedLetter)) return;

    setCurrentGuess((previousGuess) => {
      if (previousGuess.length >= WORD_LENGTH) {
        return previousGuess;
      }

      return previousGuess + normalizedLetter;
    });

    setMessage("");
  }, [gameStatus]);

  // Delete the final letter.
  const deleteLetter = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS") return;

    setCurrentGuess((previousGuess) =>
      previousGuess.slice(0, -1)
    );

    setMessage("");
  }, [gameStatus]);

  // Submit a completed guess.
  const submitGuess = useCallback(() => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (currentGuess.length !== WORD_LENGTH) {
      setMessage("Please enter a five-letter word.");
      return;
    }

    const evaluation = checkGuess(
      currentGuess,
      solutionWord
    );

    const updatedGuesses = [
      ...pastGuesses,
      currentGuess
    ];

    setPastGuesses(updatedGuesses);

    // Update keyboard colours without lowering priority.
    setKeyboardStatuses((previousStatuses) => {
      const updatedStatuses = {
        ...previousStatuses
      };

      currentGuess.split("").forEach((letter, index) => {
        const newStatus = evaluation[index];
        const oldStatus = updatedStatuses[letter];

        if (
          !oldStatus ||
          STATUS_PRIORITY[newStatus] >
            STATUS_PRIORITY[oldStatus]
        ) {
          updatedStatuses[letter] = newStatus;
        }
      });

      return updatedStatuses;
    });

    setCurrentGuess("");
    setMessage("");

    // Check win before loss.
    if (currentGuess === solutionWord) {
      setGameStatus("WON");
      return;
    }

    if (updatedGuesses.length >= MAX_GUESSES) {
      setGameStatus("LOST");
    }

  }, [
    currentGuess,
    solutionWord,
    pastGuesses,
    gameStatus
  ]);

  // Process all keyboard input.
  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "Enter") {
      submitGuess();
      return;
    }

    if (key === "Backspace") {
      deleteLetter();
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      addLetter(key);
    }

  }, [
    gameStatus,
    submitGuess,
    deleteLetter,
    addLetter
  ]);

  // Restart the game.
  const resetGame = useCallback(() => {
    setSolutionWord(getRandomWord(solutionWord));
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setKeyboardStatuses({});
    setMessage("");
  }, [solutionWord]);

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    keyboardStatuses,
    message,
    handleKeyPress,
    resetGame
  };
}