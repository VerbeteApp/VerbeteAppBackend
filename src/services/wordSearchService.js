const wordList = require("../data/wordSearchList");
const Edition = require("../models/Edition");

const gridSize = 8;
const numWords = 6;

const createEmptyGrid = () => {
  return Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
};

const DIRECTIONS = [
  { name: "HORIZONTAL", x: 0, y: 1 },
  { name: "VERTICAL", x: 1, y: 0 },
];

const getRandomWords = (count) => {
  const uniqueWords = [...new Set(wordList)];

  const shuffled = uniqueWords.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const checkPlacement = (grid, word, startX, startY, direction) => {
  let x = startX;
  let y = startY;

  for (let i = 0; i < word.length; i++) {
    const letterToPlace = word[i];

    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
      return false;
    }

    const cellContent = grid[x][y];

    if (cellContent !== "" && cellContent !== letterToPlace) {
      return false;
    }

    x += direction.x;
    y += direction.y;
  }

  return true;
};

const placeWord = (grid, word, startX, startY, direction) => {
  let x = startX;
  let y = startY;

  for (let i = 0; i < word.length; i++) {
    grid[x][y] = word[i]; // Escreve a letra na célula
    x += direction.x; // Move para a próxima posição
    y += direction.y;
  }
};

const fillEmptyCells = (grid) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === "") {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        grid[i][j] = alphabet[randomIndex];
      }
    }
  }
};

const generateWordSearch = () => {
  const grid = createEmptyGrid();
  const selectedWords = getRandomWords(numWords);
  const placedWordsInfo = [];

  const indicesToReverse = new Set();

  const targetReversedCount = Math.min(2, selectedWords.length);

  while (indicesToReverse.size < targetReversedCount) {
    const randomIndex = Math.floor(Math.random() * selectedWords.length);
    indicesToReverse.add(randomIndex);
  }

  for (let i = 0; i < selectedWords.length; i++) {
    const word = selectedWords[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

   
    const isReversed = indicesToReverse.has(i);

    while (!placed && attempts < maxAttempts) {
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);
      const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const stepMultiplier = isReversed ? -1 : 1;

      const direction = {
        x: baseDirection.x * stepMultiplier,
        y: baseDirection.y * stepMultiplier,
      };

      if (checkPlacement(grid, word, startX, startY, direction)) {
        placeWord(grid, word, startX, startY, direction);

        placedWordsInfo.push({
          word: word,
          direction: baseDirection.name,
          initial_pos: [startX, startY],
          is_reversed: isReversed,
        });

        placed = true;
      }
      attempts++;
    }
  }

  fillEmptyCells(grid);

  const formattedRows = grid.map((row) => row.join(""));

  return {
    rows: formattedRows,
    words: placedWordsInfo,
  };
};

const getWordSearchByEditionNumber = async (editionNumber) => {
  console.log(
    "Searching for data in Word Search Game in Edition #",
    editionNumber
  );

  try {
    const edition = await Edition.findOne({ edition_number: editionNumber })
      .select("word_search_game")
      .exec();

    if (!edition) {
      return null;
    }

    return edition.word_search_game;
  } catch (error) {
    console.error("Error finding word search by edition:", error);
    throw error;
  }
};

module.exports = { generateWordSearch, getWordSearchByEditionNumber };
