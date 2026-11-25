export const WORDS = [
  "CRANE",
  "APPLE",
  "PLANT",
  "WATER",
  "BRAVE",
  "STONE",
  "GRAPE",
  "MOUSE",
  "LIGHT",
  "DREAM",
  "HOUSE",
  "BREAD",
  "CLOUD",
  "SMILE",
  "TRAIN",
  "SHARE",
  "HEART",
  "WORLD",
  "TABLE",
  "MUSIC",
  "ZEBRA",
  "PUPPY",
  "TIGER",
  "GREEN",
  "SPACE",
  "FLAME",
  "NIGHT",
  "PEARL",
  "ROBOT",
  "MAGIC"
];

export function getRandomWord(previousWord = "") {
  const availableWords = WORDS.filter(
    (word) => word !== previousWord
  );

  const wordList =
    availableWords.length > 0 ? availableWords : WORDS;

  const randomIndex = Math.floor(
    Math.random() * wordList.length
  );

  return wordList[randomIndex];
}