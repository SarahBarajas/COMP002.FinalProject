document.addEventListener('DOMContentLoaded', function() { // Wait for the HTML to fully load before running the script
    let board = ['', '', '', '', '', '', '', '', '']; // Initialize the game board as an array of empty strings
    let currentPlayer = 'X'; // Set the starting player to 'X'
    let isGameActive = true; // Flag to check if the game is currently active

    document.getElementById('turn').textContent = currentPlayer; // Display the current player's turn

    // Add event listeners to each game square
    document.querySelectorAll('.game-square').forEach(square => {
        square.addEventListener('click', function() { // When a square is clicked
            if (isGameActive && square.textContent === '') { // Check if the game is active and the square is empty
                square.textContent = currentPlayer; // Mark the square with the current player's symbol
                updateBoard(square); // Update the game board array with the current player's symbol
                if (checkWinner()) { // Check if the current player has won
                    displayWinner(currentPlayer); // Display the winner
                    isGameActive = false; // Set the game to inactive
                } else if (!board.includes('')) { // Check if the board is full and it's a tie
                    displayTie(); // Display a tie message
                    isGameActive = false; // Set the game to inactive
                } else { // Switch turns if no winner and no tie
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between 'X' and 'O'
                    document.getElementById('turn').textContent = currentPlayer; // Update the displayed turn
                }
            }
        });
    });

    function updateBoard(square) { // Function to update the board array
        const index = Array.from(square.parentNode.children).indexOf(square); // Get the index of the clicked square
        board[index] = currentPlayer; // Update the board array with the current player's symbol
    }

    const winningCombinations = [ // Array of possible winning combinations
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal combinations
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical combinations
        [0, 4, 8], [2, 4, 6] // Diagonal combinations
    ];

    function checkWinner() { // Function to check if there's a winner
        return winningCombinations.some(combination => { // Check each winning combination
            const [a, b, c] = combination; // Destructure the combination array
            return board[a] && board[a] === board[b] && board[a] === board[c]; // Check if all three positions are the same and not empty
        });
    }

    function displayWinner(winner) { // Function to display the winner
        alert(`${winner} wins!`); // Show an alert with the winner
        updateScoreboard(winner); // Update the scoreboard with the winner's score
    }

    function displayTie() { // Function to display a tie
        alert("It's a tie!"); // Show an alert for a tie
    }

    // Add event listener to the play-again button
    document.getElementById('button-play-again').addEventListener('click', function() {
        board = ['', '', '', '', '', '', '', '', '']; // Reset the game board
        isGameActive = true; // Set the game to active
        currentPlayer = 'X'; // Set the starting player to 'X'
        document.getElementById('turn').textContent = currentPlayer; // Update the displayed turn
        document.querySelectorAll('.game-square').forEach(square => {
            square.textContent = ''; // Clear all the game squares
        });
    });

    function updateScoreboard(winner) { // Function to update the scoreboard
        let score = localStorage.getItem(winner) || 0; // Get the current score from localStorage or set to 0
        localStorage.setItem(winner, ++score); // Increment and store the new score
        document.getElementById(`scoreboard-${winner.toLowerCase()}`).textContent = score; // Update the displayed score
    }

    // Initialize the scoreboard with stored scores or set to 0
    document.getElementById('scoreboard-x').textContent = localStorage.getItem('X') || 0;
    document.getElementById('scoreboard-o').textContent = localStorage.getItem('O') || 0;
});
