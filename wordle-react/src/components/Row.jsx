import Tile from "./Tile";

export default function Row({ letters, statuses }) {
  const tiles = Array.from(
    { length: 5 },
    (_, index) => ({
      letter: letters[index] || "",
      status: statuses[index] || ""
    })
  );

  return (
    <div className="board-row" role="row">
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          letter={tile.letter}
          status={tile.status}
        />
      ))}
    </div>
  );
}