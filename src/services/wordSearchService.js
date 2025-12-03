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
      console.log(`⚡ Cruzamento validado na letra '${letterToPlace}' em [${x},${y}] para a palavra "${word}"`);
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
    indicesToReverse.add(Math.floor(Math.random() * selectedWords.length));
  }

  const getOccupiedPositions = () => {
    const positions = [];
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (grid[x][y] !== "") {
          positions.push({ x, y, letter: grid[x][y] });
        }
      }
    }
    return positions;
  };

  for (let i = 0; i < selectedWords.length; i++) {
    const word = selectedWords[i];
    let placed = false;
    let attempts = 0;
    
    const maxAttempts = 100; 

    const isReversed = indicesToReverse.has(i);
    const stepMultiplier = isReversed ? -1 : 1;

    const occupied = getOccupiedPositions();

    while (!placed && attempts < maxAttempts) {
      let startX, startY, direction;
      let tryingIntersection = false;

      if (occupied.length > 0 && attempts < 50) {
        const randomOccupied = occupied[Math.floor(Math.random() * occupied.length)];
 
        const letterIndexInWord = word.indexOf(randomOccupied.letter);

        if (letterIndexInWord !== -1) {
          const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
          direction = {
            x: baseDirection.x * stepMultiplier,
            y: baseDirection.y * stepMultiplier,
          };

          startX = randomOccupied.x - (direction.x * letterIndexInWord);
          startY = randomOccupied.y - (direction.y * letterIndexInWord);
          
          tryingIntersection = true;
          
          direction.name = baseDirection.name; 
        }
      }

      if (!tryingIntersection) {
        startX = Math.floor(Math.random() * gridSize);
        startY = Math.floor(Math.random() * gridSize);
        const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        direction = {
          x: baseDirection.x * stepMultiplier,
          y: baseDirection.y * stepMultiplier,
          name: baseDirection.name 
        };
      }

      if (checkPlacement(grid, word, startX, startY, direction)) {
        placeWord(grid, word, startX, startY, direction);

        placedWordsInfo.push({
          word: word,
          direction: direction.name, 
          initial_pos: [startX, startY],
          is_reversed: isReversed,
        });

        placed = true;
      }
      attempts++;
    }
  }

  fillEmptyCells(grid);

  return {
    rows: grid.map((row) => row.join("")),
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
