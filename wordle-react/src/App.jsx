import { useEffect } from "react";

import useWordle from "./hooks/useWordle";

import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameOverModal from "./components/GameOverModal";

export default function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    keyboardStatuses,
    message,
    handleKeyPress,
    resetGame
  } = useWordle();

  // Physical keyboard handling.
  useEffect(() => {
    function handlePhysicalKeyDown(event) {
      const isLetter = /^[a-zA-Z]$/.test(event.key);

      const isControlKey =
        event.key === "Enter" ||
        event.key === "Backspace";

      if (!isLetter && !isControlKey) {
        return;
      }

      event.preventDefault();
      handleKeyPress(event.key);
    }

    window.addEventListener(
      "keydown",
      handlePhysicalKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handlePhysicalKeyDown
      );
    };
  }, [handleKeyPress]);

  return (
    <main className="app-container">

      <header className="game-header">
        <h1>WORDLE</h1>
        <p>
          Find the hidden five-letter word in six attempts.
        </p>
      </header>

      <GameBoard
        solutionWord={solutionWord}
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
      />

      <p
        className="game-message"
        role="status"
        aria-live="polite"
      >
        {message || " "}
      </p>

      <Keyboard
        keyboardStatuses={keyboardStatuses}
        onKeyPress={handleKeyPress}
      />

      <GameOverModal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        onRestart={resetGame}
      />

    </main>
  );
}