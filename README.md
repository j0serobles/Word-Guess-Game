# Word-Guess-Game

### Overview

Word-Guess-Game is a simple, "Hangman"-styled game where the user tries to guess a word based on a theme of general subjects.
This version of Word-Guess-Game uses a single theme: 80's Pop Music Artists. The game runs in the browser, and features dynamically updated HTML and CSS powered by Javascript code. 

### File directory structure:

```
├── assets
|  ├── css
|  |  └── style.css (Contains CSS styling)
|  ├── images
|  └── javascript
|  |  └── game.js   (Contains the game logic in Javascript)
|  └── media        (Contains sound files used in the game)
└── index.html      (Contains the HTML used in the page)
```

### Access
The [game](https://j0serobles.github.io/Word-Guess-Game/) can be accessed at https://j0serobles.github.io/Word-Guess-Game/
The github [repo](https://github.com/j0serobles/Bootstrap-Portfolio) is at https://github.com/j0serobles/Bootstrap-Portfolio

### Design
The Javascript program is divided in three sections:
1.GLOBALS: Contains the global variables used.
2.OBJECTS: Contains the source code for two object constructors:
 * UI (User Interface)
 * Game (The actual game)
3.CALLS: Contains the call to add an event listener in the document object that will execute the Game.playGame() method - Where everything starts. 

The game goes through the following steps when played:
1. Render the initial HTML page (load)
2. Accept an input key from the user to start a game and chooses a secret word from the theme.
3. Accept a new input key (alphanumeric) and matches it against a character in the secret word.  If a match is found, the number of 'hits' is incremented and the key is stored in an array.  If the character is not matched to a letter in the secret word, the number of misses is incremented and the number of allowed tries to guess the secret word is decremented. 
All characters ever attempted (either hit or miss) are stored into another array.
4. The UI (user Interface) object is called to update the elements of the HTML page (DOM) with the current secret word (showing those characters that have been guessed), the number attempts remaining, the list of typed characters, the number of games won and the number of games lost. 
5. Steps 3 and 4 are repeated until :
	* The number of attempts remaining goes to zero : The game is lost.
	* All the letters are guessed before the number of attempts goes to zero: The game is won.
6. When the game completes, the User Interface object is called to update the HTML page once again and wait for the next key to be typed in, which restarts the game at step two.
