 // GLOBALS:global variables

//Force the current theme
//TODO: Implement user-selectable themes.

var currentTheme = themes[0];

///////////////////////////////////////////////////////////////////////////
// Constructor for UI object
// The UI object has all the attributes and methods
// for handling the HTML page. 
// It is used by the Game() object whenever the HTML elements
// need to be updated. 
///////////////////////////////////////////////////////////////////////////
function UI() { 

  ////////////////////////////////
  // Attributes:
  ////////////////////////////////
  this.displayedWord       = document.getElementById("displayed_word"); 
  this.guessedLetters      = document.getElementById("guessedLetters"); 
  this.guessesRemaining    = document.getElementById("guesses_remaining");  
  this.pageInstructions    = document.getElementById("page_instructions");
  this.currentThemeElement = document.getElementById("current_theme_name");
  this.winCount            = document.getElementById("win_count");
  this.lostCount           = document.getElementById("lost_count");

  this.wrongGuess            = document.getElementById("wrong"); 
  this.correctGuess          = document.getElementById("ding"); 
  this.tada                  = document.getElementById("tada"); 
  this.lost                  = document.getElementById("lost"); 

  ////////////////////////////////
  // Methods
  ////////////////////////////////
 
  this.updatePageElements = function() {
  
    document.getElementById("secretImage").setAttribute("src", "assets/images/80s.jpg");
    document.getElementById("secretImage").setAttribute("alt", "currentGame.currentTheme.themeName");
    document.getElementById("entry_text").innerHTML = "The 1980s saw the emergence of dance music and new wave. As disco fell out of fashion in the decade's early years, genres such as post-disco, Italo disco, Euro disco and dance-pop became more popular. Rock music continued to enjoy a wide audience.     Soft rock, glam metal, thrash metal, shred guitar characterized by heavy distortion, pinch harmonics and whammy bar abuse became very popular.  Adult contemporary, quiet storm, and smooth jazz gained popularity.     In the late 1980s, glam metal became the largest, most commercially successful brand of music in the United States and worldwide.";

    if (currentGame.gameOver) { 
      this.pageInstructions.textContent = (currentGame.remainingAttempts === 0) ? "You Lost!" : "You Won!"; 
      document.getElementById("secretImage").setAttribute("src", currentGame.secretImage);
      document.getElementById("secretImage").setAttribute("alt", currentGame.secretWord);
      document.getElementById("entry_text").innerHTML = currentGame.secretText;
    } else {
      this.pageInstructions.textContent = "Game Started."; 
    }

    this.currentThemeElement.textContent = "Current Theme: " +  currentGame.currentTheme.themeName; 

    //Update the contents of the <p> tag showing the current secret word.
    //Put each character in currentGame.outputCharacters[] in a span tag with appropriate styling.  
    this.displayedWord.innerHTML = "";
    for (var i = 0; i < currentGame.outputCharacters.length; i++) {
      this.displayedWord.innerHTML += '<span class="border-bottom text-center mx-2">' +
      (((typeof currentGame.outputCharacters[i]) === "undefined") ? "&nbsp;&nbsp" : currentGame.outputCharacters[i]) +
      '</span>';
    }

    //Update the letters already guessed.
    this.guessedLetters.textContent   = currentGame.attemptedLetters;
    this.guessesRemaining.textContent = currentGame.remainingAttempts;

    //Update the stats
    this.winCount.textContent  = currentGame.wins
    this.lostCount.textContent = currentGame.losses;
  }
}

///////////////////////////////////////////////////////////////////////////
// Constructor for Game object.
// The Game() object has the attributes and methods needed
// for playing the Word-Guess game.  Its constructor gets passed a 
// theme[] global array.
// (This version only uses one theme)
// Pressing any key starts the game and subsequent key presses call the
// playGame() function to match the entered key to a letter in the secret
// word selected by the computer randomly. 
///////////////////////////////////////////////////////////////////////////
function Game(theme) {

  /////////////////////////
  // Attributes:
  /////////////////////////

  this.currentTheme = theme;
  // Get a themeWords object from current theme's array of objects
  // First, compute the index randomly (must be > 0 since the first element is 
  // for the default page shown before the game starts)
  this.themeWordIndex = 0;
  do {
     this.themeWordIndex = Math.floor(Math.random() * theme.themeWords.length);
  } 
  while (this.themeWordIndex === 0);

  //The "name" attribute in the themeWords object is the secret word.
  this.secretWord = theme.themeWords[this.themeWordIndex].name;
  //The image to display at the end of the game
  this.secretImage = theme.themeWords[this.themeWordIndex].imageFile;
  //The text to display besides the secretImage
  this.secretText = theme.themeWords[this.themeWordIndex].textInfo;
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
  this.gameOver = false; //true if game is complete.

  this.gamesPlayed    = 0;  // How many games have been played
  this.wins           = 0;  // How many wins
  this.losses         = 0;  // How many losses

  /////////////////////////
  // Methods:
  /////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  // playGame gets called every time a key is typed.
  // It will reset the game if it has finished, or will accept the 
  // next input if the game is still active
  /////////////////////////////////////////////////////////////////////////////
  this.playGame = function(key) {
 
    if (this.gameOver) {
      //The game has ended, reset it and start a new one
      this.resetGame();
    }
    else {
      //Game is started after any key is pressed. 
      //Only accept alphanumeric keys
        if (this.alphanumeric(key)) {
          this.evaluateGuess(key);
        }
    }
    userInterface.updatePageElements(); 
  } 
  //////////////////////////////////////////////////////
  // evaluateGuess: This is the most important method.
  // It gets called whenever a key is typed.
  // It determines if the entered key is a hit or miss,
  // And updates the game state accordingly. 
  //////////////////////////////////////////////////////
  this.evaluateGuess = function(aCharacter) {
      
    //Determines if the entered key has already been guessed.
    //We do this by checking that the entered
    //key is not already a member of this.attemptedLetters[] array.
    //If the entered key is already there, do nothing. 
    
    if(!this.attemptedLetters.includes(aCharacter)) {
      this.attemptedLetters.push(aCharacter); 
      hitPosition =  this.secretWord.toLowerCase().search(aCharacter);
      if (hitPosition != -1 ) {
        // Play sound
        userInterface.correctGuess.play();
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
          userInterface.wrongGuess.play(); 
          this.misses++;
          this.buildSecretWordOutput();
        }
      }
    } 
  } // End evaluateGuess() method
  
  ///////////////////////////////////////////////////////////////////////
  
  //Check if Game Over. Do a char by char check of both arrays
  // (secretWord string and outputCharacters[])

  this.checkComplete = function () {
    for (var i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i] != this.outputCharacters[i]) {
        return false;
      }
    }
    //If we got here, then all characters match.
    return true;
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // buildSecretWordOutput()  updates the character array to be shown in the
  // page with the progress of the user's guesses (outputCharacters[]).
  // For every character in the actual secret word, place it in outputCharacters[]
  // if it has been guessed correctly (it exists in the hits[] array).
  // If it is boilerplate text ("-", " ", "/", etc.), write it directly.
  ///////////////////////////////////////////////////////////////////////////////////
  this.buildSecretWordOutput = function() {
    for (var i = 0; i < this.secretWord.length; i++) {
      
      if (!this.alphanumeric(this.secretWord[i])) {
        this.outputCharacters[i] =  this.secretWord[i];
      } 
      else {
        for  (var j = 0 ; j < this.hits.length; j++) { 
          if ( this.secretWord[i].toLowerCase() === this.hits[j].toLowerCase()) {
            this.outputCharacters[i] =  this.secretWord[i];
          }
        }
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  // Utility function to check if passed argument is alphanumeric, using a regular expression
  ////////////////////////////////////////////////////////////////////////////////////////////
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
  // Ends the game, set state variable to later reveal secret word.
  /////////////////////////////////////////////////////////////////////
  this.endTheGame = function() {
    this.gameOver = true;
      for (var i = 0; i < this.secretWord.length; i++) {
        this.outputCharacters[i] = this.secretWord[i];
      }
      if (this.remainingAttempts === 0 ) {
        this.losses++;
        userInterface.lost.play();
      }
      else {
        this.wins++;
        userInterface.tada.play();
      }

      this.gamesPlayed++;
  }

  /////////////////////////////////////////////////////////////////////
  //Set page elements and Game() object attributes to a default state.
  ////////////////////////////////////////////////////////////////////
  this.resetGame = function() { 

    // When game is reset, the page shows elements
    // from the default object (theme.themeWords[0])
    this.themeWordIndex = 0; // Element [0] in the array is the 'default' object 
    this.secretWord = theme.themeWords[this.themeWordIndex].name;
    this.secretImage = theme.themeWords[this.themeWordIndex].imageFile;
    this.secretText = theme.themeWords[this.themeWordIndex].textInfo;
    userInterface.updatePageElements();
    
    // Now get a non-default theme.themeWords[] object from current theme.
    // First, compute the index randomly (must be > 0 since the first element is 
    // for the default page shown when the game has started).
    this.themeWordIndex = 0;
    do {
      this.themeWordIndex = Math.floor(Math.random() * theme.themeWords.length);
    } 
    while (this.themeWordIndex === 0);

    this.secretWord = theme.themeWords[this.themeWordIndex].name;
    this.secretImage = theme.themeWords[this.themeWordIndex].imageFile;
    this.secretText = theme.themeWords[this.themeWordIndex].textInfo;

    this.hits.length = 0; 
    this.attemptedLetters.length = 0;
    this.misses =  0;
    this.remainingAttempts = this.secretWord.length; 
    this.hitPosition = 0;
    this.outputCharacters = new Array (this.secretWord.length); 
    this.gameOver = false;
    
  }

} // End of Game constructor


//CALLS:
/////////////////////////////////////////////////////////////////////////////////////////////
// When page is loaded, create the game and wait for a key input.

 var currentGame   = new Game(currentTheme); 
 var userInterface = new UI(); 

 document.addEventListener ("keyup", event => { 
   currentGame.playGame(event.key);
   }); 


