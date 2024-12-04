
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

} const winningCombinations = [ // Array of possible winning combinations 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal combinations 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical combinations 
    [0, 4, 8], [2, 4, 6] // Diagonal combinations
];
