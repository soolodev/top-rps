const ROUND_MAX = 5;

/*
    Helper Functions
*/
// Formats given input properly (capitalized)
function formatInput(word)
{
    let upperWord = "";
    let newWord = "";
    let lowerWord = "";

    upperWord = word.toUpperCase(); // to capitalize

    // If single letter input given, convert to full string version (as a lowercase string)
    if (word.length == 1)
    {
        if (word == "r")
        {
            lowerWord = "rock";
        }
        else if (word == "p")
        {
            lowerWord = "paper";
        }
        else if (word == "s")
        {
            lowerWord = "scissors";
        }
    }
    else
    {
        lowerWord = word.toLowerCase(); // if not single letter, ensure it is lowercase string
    }

    // Join capital and lowercase string
    newWord = upperWord.slice(0, 1);
    newWord = newWord.concat(lowerWord.slice(1));

    return newWord;
}

// Validates input to make sure it is a proper move
//     Returns 0 if valid
//     Returns 1 if invalid
function validateInput(word)
{
    let valid = "";

    valid = word.toLowerCase(); // for case-insensitive

    if (valid == "rock" || valid == "paper" || valid == "scissors" ||
        valid == "r" || valid == "p" || valid == "s")
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

/*
    Play Functions
*/
// Player turn to give input
function playerPlay()
{
    let choice = "";

    // Keep grabbing input until it is valid
    while (validateInput(choice) == 1)
    {
        let promptText = "What do you choose? [Rock(r), Paper(p), Scissors(s)]"

        choice = prompt(promptText);
        choice = formatInput(choice);
    }

    return choice;
}

// Computer turn to give input (random from 1-3)
function computerPlay()
{
    let choice = "";
    let randomNum = 0;

    randomNum = Math.floor((Math.random() * 3) + 1);

    switch (randomNum)
    {
        case 1:
            choice = "Rock";
            break;
        case 2:
            choice = "Paper";
            break;
        case 3:
            choice = "Scissors";
            break;
        default:
            choice = "Rock";
            break;
    }

    return choice;
}

/*
    Game Logic Functions
*/
// Examines both player one's choice and player two's choice
//     Returns 0 if a tie
//     Returns 1 if player one won
//     Returns 2 if player two won
//     If any input was not valid, returns a tie (0)
function findWinner(pOneSelection, pTwoSelection)
{
    let winner = 0;

    if (pOneSelection == "Rock")
    {
        if (pTwoSelection == "Rock")
        {
            winner = 0;
        }
        else if (pTwoSelection == "Paper")
        {
            winner = 2;
        }
        else if (pTwoSelection == "Scissors")
        {
            winner = 1;
        }
        else
        {
            winner = 0;
        }
    }
    else if (pOneSelection == "Paper")
    {
        if (pTwoSelection == "Rock")
        {
            winner = 1;
        }
        else if (pTwoSelection == "Paper")
        {
            winner = 0;
        }
        else if (pTwoSelection == "Scissors")
        {
            winner = 2;
        }
        else
        {
            winner = 0;
        }
    }
    else if (pOneSelection == "Scissors")
    {
        if (pTwoSelection == "Rock")
        {
            winner = 2;
        }
        else if (pTwoSelection == "Paper")
        {
            winner = 1;
        }
        else if (pTwoSelection == "Scissors")
        {
            winner = 0;
        }
        else
        {
            winner = 0;
        }
    }
    else
    {
        winner = 0;
    }

    return winner;
}

/*
    Text Functions
*/
// Returns a string to announce the start of the round
function roundStart(roundCount, pOneScore, pTwoScore)
{
    let startText = "";

    startText = startText.concat("Round ", roundCount, " start! (Score ",
        pOneScore, ":", pTwoScore, ")");

    return startText;
}

// Returns a string to announce the result of the current round
function getRoundResult(pOneSelection, pTwoSelection, winner)
{
    let resultText = "";

    if (winner == 1)
    {
        resultText = resultText.concat("Player One Wins! (", pOneSelection,
            " beats ", pTwoSelection, ")");
    }
    else if (winner == 2)
    {
        resultText = resultText.concat("Player Two Wins! (", pTwoSelection,
            " beats ", pOneSelection, ")");
    }
    else
    {
        resultText = resultText.concat("A Tie! (", pOneSelection,
            " ties against ", pTwoSelection, ")")
    }

    return resultText;
}

// Returns a string to announce the result of the overall match
function getFinalResult(pOneScore, pTwoScore)
{
    let resultText = "";

    resultText = resultText.concat("Final results!",
        "\nPlayer One has a score of ", pOneScore, ".",
        "\nPlayer Two has a score of ", pTwoScore, ".");

    if (pOneScore > pTwoScore)
    {
        resultText = resultText.concat("\nPlayer One is the winner!");
    }
    else if (pOneScore < pTwoScore)
    {
        resultText = resultText.concat("\nPlayer Two is the winner!");
    }
    else
    {
        resultText = resultText.concat("\nIt is a tie!");
    }

    return resultText;
}

/*
    Overall Game Function
*/
// Plays through a round
//     e is the click event that called this function
// const playRound = (e) =>
// {
//     let pOneSelection = "";
//     let pTwoSelection = "";

//     pOneSelection =
// }

// Operates the game
//     e is the click event that called this function
function game(e)
{
    let roundCount = 0;
    let winner = 0;

    let pOneScore = 0;
    let pTwoScore = 0;

    let pOneSelection = "";
    let pTwoSelection = "";

    while (roundCount < ROUND_MAX)
    {
        console.log(roundStart(roundCount + 1, pOneScore, pTwoScore));

        pOneSelection = playerPlay();
        pTwoSelection = computerPlay();

        winner = findWinner(pOneSelection, pTwoSelection);
        console.log(getRoundResult(pOneSelection, pTwoSelection, winner));

        if (winner == 1)
        {
            pOneScore++;
        }
        else if (winner == 2)
        {
            pTwoScore++;
        }

        roundCount++;
    }

    console.log(getFinalResult(pOneScore, pTwoScore));
}
