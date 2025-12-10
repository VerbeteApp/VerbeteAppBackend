const fs = require("fs");
const path = require("path");
const unidecode = require("unidecode");

let cachedWords = null;

const loadWords = () => {
  if (!cachedWords) {
    const filePath = path.join(__dirname, "palavras-pt-br.txt");
    const words = fs
      .readFileSync(filePath, "utf-8")
      .split("\n")
      .slice(1)
      .filter((word) => word.trim().length > 0)
      .map((word) => unidecode(word.toUpperCase().trim()));
    
    // Remove duplicates using Set
    cachedWords = [...new Set(words)];
  }
  return cachedWords;
};

const getWords = (minChars, maxChars) => {
  const allWords = loadWords();
  return allWords.filter((word) => word.length >= minChars && word.length <= maxChars);
};

module.exports = getWords;
