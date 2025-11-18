document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const ticTacToeBtn = document.getElementById('ticTacToeBtn');
    const rpsBtn = document.getElementById('rpsBtn');

    // --- Game Logic Functions ---

    // 1. Tic-Tac-Toe Logic
    let board;
    let currentPlayer;
    let gameActive;

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const handleCellClick = (clickedCell, clickedCellIndex) => {
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add('occupied');

        const statusDisplay = document.querySelector('.tictactoe-status');

        if (checkWin()) {
            statusDisplay.innerHTML = `Player ${currentPlayer} Wins! 🎉`;
            statusDisplay.classList.add('win');
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusDisplay.innerHTML = 'It\'s a Draw! 🤝';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerHTML = `It's Player ${currentPlayer}'s turn`;
    };

    const handleRestartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        const statusDisplay = document.querySelector('.tictactoe-status');
        statusDisplay.innerHTML = `It's Player ${currentPlayer}'s turn`;
        statusDisplay.classList.remove('win');
        
        document.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('occupied');
        });
    };

    // 2. Rock Paper Scissors Logic
    const rpsChoices = ['ROCK', 'PAPER', 'SCISSORS'];
    const rpsSymbols = {
        'ROCK': '🪨',
        'PAPER': '📃',
        'SCISSORS': '✂️'
    };

    const determineWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return 'Draw';
        }
        if (
            (playerChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
            (playerChoice === 'PAPER' && computerChoice === 'ROCK') ||
            (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')
        ) {
            return 'Win';
        }
        return 'Lose';
    };

    const playRPS = (playerChoice) => {
        const computerChoice = rpsChoices[Math.floor(Math.random() * rpsChoices.length)];
        const result = determineWinner(playerChoice, computerChoice);
        const resultDisplay = document.getElementById('rpsResult');
        const playerScoreDisplay = document.getElementById('rpsPlayerScore');
        const computerScoreDisplay = document.getElementById('rpsComputerScore');
        const resultTextDisplay = document.getElementById('rpsResultText');

        resultDisplay.innerHTML = `You chose ${rpsSymbols[playerChoice]} **${playerChoice}** vs. Computer chose ${rpsSymbols[computerChoice]} **${computerChoice}**`;
        
        resultTextDisplay.classList.remove('win', 'lose', 'draw');

        if (result === 'Win') {
            resultTextDisplay.innerHTML = 'You Win! 🎉';
            resultTextDisplay.classList.add('win');
            playerScoreDisplay.textContent = parseInt(playerScoreDisplay.textContent) + 1;
        } else if (result === 'Lose') {
            resultTextDisplay.innerHTML = 'You Lose. 😔';
            resultTextDisplay.classList.add('lose');
            computerScoreDisplay.textContent = parseInt(computerScoreDisplay.textContent) + 1;
        } else {
            resultTextDisplay.innerHTML = 'It\'s a Draw! 🤝';
            resultTextDisplay.classList.add('draw');
        }
    };


    // --- Game Renderer Functions ---

    const renderTicTacToe = () => {
        // Initialize game state
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        gameContainer.innerHTML = `
            <h2>Tic-Tac-Toe</h2>
            <div class="tictactoe-status">It's Player ${currentPlayer}'s turn</div>
            <div class="tictactoe-board">
                ${board.map((_, index) => `<div class="tictactoe-cell" data-index="${index}"></div>`).join('')}
            </div>
            <button class="tictactoe-restart">Restart Game</button>
        `;

        document.querySelectorAll('.tictactoe-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const clickedCellIndex = parseInt(e.target.getAttribute('data-index'));
                handleCellClick(e.target, clickedCellIndex);
            });
        });

        document.querySelector('.tictactoe-restart').addEventListener('click', handleRestartGame);
    };

    const renderRPS = () => {
        gameContainer.innerHTML = `
            <h2>Rock Paper Scissors</h2>
            <div class="rps-options">
                <button id="rpsRock">🪨</button>
                <button id="rpsPaper">📃</button>
                <button id="rpsScissors">✂️</button>
            </div>
            
            <div class="rps-results">
                <p>Player Score: <span id="rpsPlayerScore">0</span></p>
                <p>Computer Score: <span id="rpsComputerScore">0</span></p>
                <hr>
                <p id="rpsResult">Make a move to start!</p>
                <p class="rps-result-text" id="rpsResultText"></p>
            </div>
            
            <button id="rpsResetScore">Reset Score</button>
        `;

        document.getElementById('rpsRock').addEventListener('click', () => playRPS('ROCK'));
        document.getElementById('rpsPaper').addEventListener('click', () => playRPS('PAPER'));
        document.getElementById('rpsScissors').addEventListener('click', () => playRPS('SCISSORS'));
        
        document.getElementById('rpsResetScore').addEventListener('click', () => {
            document.getElementById('rpsPlayerScore').textContent = '0';
            document.getElementById('rpsComputerScore').textContent = '0';
            document.getElementById('rpsResult').innerHTML = 'Score reset. Make a move to start!';
            document.getElementById('rpsResultText').innerHTML = '';
            document.getElementById('rpsResultText').classList.remove('win', 'lose', 'draw');
        });
    };


    // --- Event Listeners for the Main Hub ---

    ticTacToeBtn.addEventListener('click', renderTicTacToe);
    rpsBtn.addEventListener('click', renderRPS);
});