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

// Fisher-Yates shuffle for better randomization
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRandomWords = (count) => {
  // Filter words that fit in the grid
  const validWords = wordList.filter(word => word.length <= gridSize);
  const uniqueWords = [...new Set(validWords)];
  const shuffled = shuffleArray(uniqueWords);
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

    // Cell must be empty or contain the same letter (for crossing)
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
  const positions = [];

  for (let i = 0; i < word.length; i++) {
    grid[x][y] = word[i];
    positions.push({ x, y, letter: word[i] });
    x += direction.x;
    y += direction.y;
  }

  return positions;
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

const getOccupiedPositions = (grid) => {
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

const generateWordSearch = () => {
  const grid = createEmptyGrid();
  const selectedWords = getRandomWords(numWords);
  const placedWordsInfo = [];
  const failedWords = [];

  // Determine which words should be reversed
  const indicesToReverse = new Set();
  const targetReversedCount = Math.min(2, selectedWords.length);
  while (indicesToReverse.size < targetReversedCount) {
    indicesToReverse.add(Math.floor(Math.random() * selectedWords.length));
  }

  for (let i = 0; i < selectedWords.length; i++) {
    const word = selectedWords[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 1000;

    const isReversed = indicesToReverse.has(i);
    
    // Use base directions with step multiplier for reversals
    const stepMultiplier = isReversed ? -1 : 1;

    while (!placed && attempts < maxAttempts) {
      let startX, startY, direction;
      let tryingIntersection = false;

      const occupied = getOccupiedPositions(grid);

      // Try to intersect with existing words (only 20% of attempts and only for first 100 attempts)
      if (occupied.length > 0 && attempts < 100 && Math.random() < 0.2) {
        const randomOccupied = occupied[Math.floor(Math.random() * occupied.length)];
        const letterIndexInWord = word.indexOf(randomOccupied.letter);

        if (letterIndexInWord !== -1) {
          const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
          direction = {
            x: baseDirection.x * stepMultiplier,
            y: baseDirection.y * stepMultiplier,
            name: baseDirection.name
          };
          
          // Calculate start position to align the matching letter
          startX = randomOccupied.x - (direction.x * letterIndexInWord);
          startY = randomOccupied.y - (direction.y * letterIndexInWord);
          
          tryingIntersection = true;
        }
      }

      // Random placement if intersection didn't work or not attempted
      if (!tryingIntersection) {
        const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
        direction = {
          x: baseDirection.x * stepMultiplier,
          y: baseDirection.y * stepMultiplier,
          name: baseDirection.name
        };
        
        // Calculate valid start positions based on word length and direction
        // For positive direction: need room from start to fit word
        // For negative direction: need room from word length backwards
        let maxStartX, maxStartY;
        
        if (direction.x > 0) {
          maxStartX = gridSize - word.length;
        } else if (direction.x < 0) {
          maxStartX = word.length - 1;
        } else {
          maxStartX = gridSize - 1;
        }
        
        if (direction.y > 0) {
          maxStartY = gridSize - word.length;
        } else if (direction.y < 0) {
          maxStartY = word.length - 1;
        } else {
          maxStartY = gridSize - 1;
        }
        
        startX = Math.floor(Math.random() * (maxStartX + 1));
        startY = Math.floor(Math.random() * (maxStartY + 1));
      }

      // Check if word fits and place it
      if (checkPlacement(grid, word, startX, startY, direction)) {
        const positions = placeWord(grid, word, startX, startY, direction);
        
        // Calculate end position
        const endX = positions[positions.length - 1].x;
        const endY = positions[positions.length - 1].y;

        placedWordsInfo.push({
          word: word,
          direction: direction.name,
          initial_pos: [startX, startY],
          is_reversed: isReversed,
        });

        placed = true;
        console.log(`✓ Placed "${word}" ${direction.name} at [${startX},${startY}] to [${endX},${endY}]`);
      }
      attempts++;
    }

    if (!placed) {
      failedWords.push(word);
      console.warn(`✗ Failed to place "${word}" after ${maxAttempts} attempts`);
    }
  }

  fillEmptyCells(grid);

  return {
    rows: grid.map((row) => row.join("")),
    words: placedWordsInfo
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
