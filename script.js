document.addEventListener('DOMContentLoaded', function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    document.getElementById('turn').textContent = currentPlayer;

    // Adding event listeners to game squares
    document.querySelectorAll('.game-square').forEach(square => {
        square.addEventListener('click', function() {
            if (isGameActive && square.textContent === '') {
                square.textContent = currentPlayer;
                updateBoard(square);
                if (checkWinner()) {
                    displayWinner(currentPlayer);
                    isGameActive = false;
                } else if (!board.includes('')) {
                    displayTie();
                    isGameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    document.getElementById('turn').textContent = currentPlayer;
                }
            }
        });
    });

    function updateBoard(square) {
        const index = Array.from(square.parentNode.children).indexOf(square);
        board[index] = currentPlayer;
    }

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function displayWinner(winner) {
        alert(`${winner} wins!`);
        updateScoreboard(winner);
    }

    function displayTie() {
        alert("It's a tie!");
    }

    // Adding event listener to play-again button
    document.getElementById('button-play-again').addEventListener('click', function() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        document.getElementById('turn').textContent = currentPlayer;
        document.querySelectorAll('.game-square').forEach(square => {
            square.textContent = '';
        });
    });

    function updateScoreboard(winner) {
        let score = localStorage.getItem(winner) || 0;
        localStorage.setItem(winner, ++score);
        document.getElementById(`scoreboard-${winner.toLowerCase()}`).textContent = score;
    }

    // Initialize the scoreboard
    document.getElementById('scoreboard-x').textContent = localStorage.getItem('X') || 0;
    document.getElementById('scoreboard-o').textContent = localStorage.getItem('O') || 0;
});

