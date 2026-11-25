export default function Tile({ letter, status }) {
  const tileClass = [
    "tile",
    letter ? "filled" : "",
    status || ""
  ].filter(Boolean).join(" ");

  return (
    <div className={tileClass} role="gridcell">
      {letter}
    </div>
  );
}