 ///////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////
// Constructor for Game object
///////////////////////////////////////////////////////////////////////////
function Game(theme)  {

      this.currentTheme = theme;
      // Get a word from current theme's array, randomly. 
      this.secretWord = theme.themeWords[Math.floor(Math.random() * theme.themeWords.length)];
      //Stores each of the letters guessed correctly.
      this.hits   = [];
      //Counts the number of failed guesses
      this.misses =  0;
      //counts the remaining guess attempts. Initializes to the word's length.
      this.remainingAttempts = this.secretWord.length; 
      // Store the first position of the matched character
      this.hitPosition = 0;
      this.outputCharacters = new Array (this.secretWord.length); 
      
      ///////////////////////////////////////////////////
      // Determines if the entered key is a hit or miss.
      ///////////////////////////////////////////////////
      this.evaluateGuess = function(aCharacter) {
          
          //Determines if the entered key has already been guessed.
          //We do this by checking that the entered
          //key is not already a member of the hits[] array.
          //If the entered key is already there, do nothing. 
          
          if (!this.hits.includes(aCharacter)) {
            hitPosition = 0; // reset
            hitPosition =  this.secretWord.toLowerCase().search(aCharacter);
            if (hitPosition != -1 ) {
              // New Hit! Save it to the hits[] array
              this.hits.push(aCharacter);
              //Play bell sound?
            }             
            else {
              //A miss. Increment the number of missed guesses and 
              // decrease the number of attempts remaining.
              this.remainingAttempts--;
              if(this.remainingAttempts === 0) {
                  //You lost!
              } else {
                //Play buzzer?
                this.misses++;
              }
          }
        }
      }
      ///////////////////////////////////////////////////
      this.buildSecretWordOutput = function() {
    
        for (var i = 0; i < this.secretWord.length; i++) {
          if (this.secretWord[i] === "-") {
            this.outputCharacters[i] =  "-"; 
          }

          for (var j = 0 ; j < this.hits.length; j++) { 
          if ( this.secretWord[i].toLowerCase() === this.hits[j].toLowerCase()) {
              this.outputCharacters[i] =  this.secretWord[i];
          }
        }
      }

      console.log (this.outputCharacters);   
    }

      this.endGame = function() {
          //Cleanup and last operations
      }
  }
 
  /////////////////////////////////////////////////////////////////////////
  var gamesPlayed = 0;
  var wins        = 0;
  var losses      = 0; 
  var exitGame    = false;

  //After user enters any key to start: 
  //TODO: Get the game theme selected by the user
  var currentTheme = themes[0]; 
  var currentGame  = new Game(currentTheme) ; 
  

   //Listen for key-press event.
  document.onkeyup = function(event) {

    if (currentGame.remainingAttempts === 0 ) {
        //Process game loss
        alert("Looser!");
    } else  {
        //Update page with game state
        console.log("gamesPlayed: " + gamesPlayed); 
        console.log(" wins: " + wins); 
        console.log(" losses: " + losses);
        console.log(" remaining attempts: " + currentGame.remainingAttempts);
        currentGame.evaluateGuess(event.key);  
        currentGame.buildSecretWordOutput() ; 
    }
  }