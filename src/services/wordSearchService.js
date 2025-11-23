const wordList = require("../data/wordSearchList");

const gridSize = 12;
const numWords = 8;

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
    // 1. Verifica Limites (continua igual)
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
      return false;
    }

    // 2. Verifica Colisão (NOVA REGRA: A célula DEVE estar vazia)
    if (grid[x][y] !== "") {
      return false; // Se tiver qualquer coisa, rejeita
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

// --- FUNÇÃO PRINCIPAL ---
const generateWordSearch = () => {
    const grid = createEmptyGrid();
    const selectedWords = getRandomWords(numWords);
    const placedWordsInfo = [];

    // 1. Sorteia EXATAMENTE 2 índices únicos para serem invertidos
    const indicesToReverse = new Set();
    
    // Proteção simples caso numWords seja alterado para menos de 2 no futuro
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

        // 2. A palavra só é invertida se o índice dela foi sorteado.
        // REMOVEMOS o "|| Math.random() < 0.3" para garantir o limite de 2.
        const isReversed = indicesToReverse.has(i);

        while (!placed && attempts < maxAttempts) {
            const startX = Math.floor(Math.random() * gridSize);
            const startY = Math.floor(Math.random() * gridSize);
            const baseDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

            // Se isReversed for true, multiplica por -1 (inverte). Se for false, mantém 1.
            const stepMultiplier = isReversed ? -1 : 1;
            
            const direction = {
                x: baseDirection.x * stepMultiplier,
                y: baseDirection.y * stepMultiplier
            };

            if (checkPlacement(grid, word, startX, startY, direction)) {
                placeWord(grid, word, startX, startY, direction);
                
                placedWordsInfo.push({
                    word: word,
                    direction: baseDirection.name,
                    initial_pos: [startX, startY],
                    is_reversed: isReversed
                });
                
                placed = true;
            }
            attempts++;
        }
    }

    fillEmptyCells(grid);

    const formattedRows = grid.map(row => row.join(''));

    return {
        rows: formattedRows,
        words: placedWordsInfo
    };
};

module.exports = { generateWordSearch };
