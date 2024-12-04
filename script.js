
let board = ['', '', '', '', '', '', '', '', '']; // Initialize the game board as an array of empty strings
let currentPlayer = 'X'; // Set the starting player to 'X'
let isGameActive = true; // Flag to check if the game is currently active

document.getElementById('turn').textContent = currentPlayer; // Display the current player's turn

// Add event listeners to each game square
document.querySelectorAll('.game-square').forEach(square => {
    square.addEventListener('click', function() { // When a square is clicked 
        if (isGameActive && square.textContent === '') { // Check if the game is active and the square is empty
            square.textContent = currentPlayer; // Mark the square with the current player's symbol   