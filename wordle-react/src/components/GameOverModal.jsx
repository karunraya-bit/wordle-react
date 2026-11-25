export default function GameOverModal({
  gameStatus,
  solutionWord,
  onRestart
}) {
  if (gameStatus === "IN_PROGRESS") {
    return null;
  }

  const isWinner = gameStatus === "WON";

  return (
    <div className="modal-overlay">
      <section
        className="game-over-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">
          {isWinner ? "Congratulations!" : "Game Over!"}
        </h2>

        <p>
          {isWinner
            ? "You correctly guessed the word."
            : "You have used all six attempts. The correct word was:"}
        </p>

        <p className="result-word">{solutionWord}</p>

        <button
          type="button"
          className="restart-button"
          onClick={onRestart}
        >
          Play Again
        </button>
      </section>
    </div>
  );
}