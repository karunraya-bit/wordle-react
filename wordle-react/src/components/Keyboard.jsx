const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [
    "Enter",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Backspace"
  ]
];

export default function Keyboard({
  keyboardStatuses,
  onKeyPress
}) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, rowIndex) => (
        <div className="keyboard-row" key={rowIndex}>
          {row.map((key) => {
            const status = keyboardStatuses[key] || "";

            const isWide =
              key === "Enter" || key === "Backspace";

            const label =
              key === "Backspace" ? "⌫" : key;

            const keyClass = [
              "key",
              isWide ? "wide" : "",
              status
            ].filter(Boolean).join(" ");

            return (
              <button
                type="button"
                key={key}
                className={keyClass}
                aria-label={key}
                onClick={() => onKeyPress(key)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}