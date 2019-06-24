 ///////////////////////////////////////////////////////////////////////////
 // global variables
 ///////////////////////////////////////////////////////////////////////////
 var displayedWord   = document.getElementById("displayed_word"); 
 var guessedLetters  = document.getElementById("guessedLetters"); 
 var guessesRemaining = document.getElementById("guesses_remaining");  
 var pageInstructions = document.getElementById("page_instructions");
 var gamesPlayed    = 0;  // How many games have been played
 var wins           = 0;  // How many wins
 var losses         = 0;  // How many losses
 
 
 var themes = [
  
    theme1 = {
      themeName    : 'Eighties Music',
      imageFileName: "80smusic.jpg",  
      themeWords   : [ 'Journey', 'Ramones' , 'PinkFloyd', 'Duran-Duran', 'Maddona', 'Van Halen', 'Michael Jackson', 'Yes', 'Ozzy Osbourne', 'Metallica']
    },

    theme2 = {
      themeName    : 'American Cities',
      imagefileName: 'americancities.jpg',
      themeWords   : ['New York', 'Los Angeles' , 'San Francisco', 'Houston', 'Miami', 'Orlando', 'Seattle', 'Detroit', 'Fargo', 'Chicago']
    }
]

var currentTheme = themes[0]; 
var currentGame = null;

///////////////////////////////////////////////////////////////////////////
// Constructor for Game object
///////////////////////////////////////////////////////////////////////////
function Game(theme)  {

      this.currentTheme = theme;
      // Get a word from current theme's array, randomly. 
      this.secretWord = theme.themeWords[Math.floor(Math.random() * theme.themeWords.length)];
      //Stores each of the letters guessed correctly.
      this.hits   = [];
      //Stores the letters input by the user (either hit or miss
      this.attemptedLetters = [];
      //Counts the number of failed guesses
      this.misses =  0;
      //counts the remaining guess attempts. Initializes to the word's length.
      this.remainingAttempts = this.secretWord.length; 
      // Store the first position of the matched character
      this.hitPosition = 0;
      this.outputCharacters = new Array (this.secretWord.length); 
      this.gameOver = false; //true : game is complete

      ///////////////////////////////////////////////////
      // Determines if the entered key is a hit or miss.
      ///////////////////////////////////////////////////
      this.evaluateGuess = function(aCharacter) {
          
          //Determines if the entered key has already been guessed.
          //We do this by checking that the entered
          //key is not already a member of this.attemptedLetters[] array.
          //If the entered key is already there, do nothing. 
          
          if (!this.gameOver) {
            if(!this.attemptedLetters.includes(aCharacter)) {
              this.attemptedLetters.push(aCharacter); 
              hitPosition =  this.secretWord.toLowerCase().search(aCharacter);
              if (hitPosition != -1 ) {
                // New Hit! Save it to the hits[] array
                this.hits.push(aCharacter);
                // Update the output character array.
                this.buildSecretWordOutput();
                //Check if all letters have been guessed.
                if (this.checkComplete()) {
                  //User Won!
                  this.endTheGame();
                }
              }
              else {
                //A miss. Increment the number of missed attempts and 
                // decrease the number of attempts remaining.
                this.remainingAttempts--;
                if(this.remainingAttempts === 0) {
                    //User lost!
                    this.endTheGame(); 
                } else {
                  //Play buzzer?
                  this.misses++;
                  this.buildSecretWordOutput();
                }
            }
          } //End check for hits[] membership
        } //End check for game over
      } // End evaluateGuess() method
        ///////////////////////////////////////////////////////////////////////
        this.checkComplete = function () {
            //Check if Game Over. Do a char by char check of both arrays
            // (secretWord and outputCharacters)

            for (var i = 0; i < this.secretWord.length; i++) {
              if (this.secretWord[i] != this.outputCharacters[i]) {
                return false;
              }
            }
            //If we got here, then all characters match.
            return true;
          }
      ///////////////////////////////////////////////////
      this.buildSecretWordOutput = function() {
    
        for (var i = 0; i < this.secretWord.length; i++) {

          //If a character is not alphanumeric, show it in the outputWord.
          //else, if the character is alphanumeric, show it if it is in hits[] array.
          if (! this.alphanumeric(this.secretWord[i])) {
            this.outputCharacters[i] =  this.secretWord[i];
          } else {

          for (var j = 0 ; j < this.hits.length; j++) { 
          if ( this.secretWord[i].toLowerCase() === this.hits[j].toLowerCase()) {
              this.outputCharacters[i] =  this.secretWord[i];
          }
        }
      }
      }
      console.log (this.outputCharacters);   
    }
    /////////////////////////////////////////////////////////////////////////
  // Checks if passed argument is alphanumeric, using a regular expression
  /////////////////////////////////////////////////////////////////////////
  this.alphanumeric = function(inputtxt)  {
      var letterNumber = /^[0-9a-zA-Z]$/;
      if(inputtxt.match(letterNumber)) { 
        return true;
        }
      else  {  
        return false; 
        }
    }
    //////////////////////////////////////////////////////////////////////
    // endTheGame 
    // Ends the game, updates this.outputCharacters with secretWord
    /////////////////////////////////////////////////////////////////////
    this.endTheGame = function() {
      this.gameOver = true;
        for (var i = 0; i < this.secretWord.length; i++) {
          this.outputCharacters[i] = this.secretWord[i];
        }
    }
  } // End of Game constructor

//////////////////////////////////////////////////////////////////////
function playGame (event) {
  //Game is after after any key is pressed. 
  //Only evaluate alphanumeric keys
  if (currentGame.alphanumeric(event.key)) {
    currentGame.evaluateGuess(event.key);
    updatePageElements();  
  }
} // End of playGame() function
/////////////////////////////////////////////////////////////////////////////////////////////
function startGame(){
  document.addEventListener("keyup", playGame);
}
////////////////////////////////////////////////////////////////////////////////////////////
function updatePageElements() {       
  
  if (currentGame.gameOver) { 
    pageInstructions.textContent = (currentGame.remainingAttempts === 0) ? "You Lost!" : "You Won!"; 
  } else {
    pageInstructions.textContent = "Game Started."; 
  } 

  //Update the contents of the <p> tag showing the current word.
  displayedWord.innerHTML = "";
  for (var i = 0; i < currentGame.outputCharacters.length; i++) {
    displayedWord.innerHTML += '<span class="border-bottom text-center mx-2">' +
    (((typeof currentGame.outputCharacters[i]) === "undefined") ? "&nbsp;&nbsp" : currentGame.outputCharacters[i]) +
    '</span>';
  }

 //Update the letters already guessed.
  guessedLetters.textContent   = currentGame.attemptedLetters;
  guessesRemaining.textContent = currentGame.remainingAttempts;
}
/////////////////////////////////////////////////////////////////////////////////////////////
////When page is loaded, create and play the game.

if (!currentGame) {
  currentGame  = new Game(currentTheme) ; 
} 
//Register the handler to start playing the game at the first key-press received:
document.addEventListener("keyup",startGame);
