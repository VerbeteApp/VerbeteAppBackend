const fs = require("fs");
const path = require("path");

let cachedWords = null;

const loadWords = () => {
  if (!cachedWords) {
    const filePath = path.join(__dirname, "palavras-pt-br.txt");
    cachedWords = fs
      .readFileSync(filePath, "utf-8")
      .split("\n")
      .slice(1)
      .filter((word) => word.trim().length > 0)
      .map((word) => word.toUpperCase().trim());
  }
  return cachedWords;
};

const getWords = (minChars, maxChars) => {
  const allWords = loadWords();
  return allWords.filter((word) => word.length >= minChars && word.length <= maxChars);
};

module.exports = getWords;
