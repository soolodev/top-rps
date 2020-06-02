const ROUND_MAX = 5;

// style.textContext = ...

/*
    Play Functions
*/
// Player turn to give input
function playerPlay(choice)
{
    if (choice == "you-rock")
    {
        return "Rock";
    }
    else if (choice == "you-paper")
    {
        return "Paper";
    }
    else if (choice == "you-scissors")
    {
        return "Scissors";
    }
    else
    {
        return "Rock";
    }
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
        resultText = resultText.concat("You Win!");
    }
    else if (winner == 2)
    {
        resultText = resultText.concat("COM Wins!");
    }
    else
    {
        resultText = resultText.concat("A Tie!")
    }

    return resultText;
}

// Returns a string to announce the detail of the current round
function getRoundDetail(pOneSelection, pTwoSelection, winner, youScore, comScore)
{
    let resultText = "";

    if (winner == 1)
    {
        resultText = resultText.concat("(", pOneSelection, " beats ", pTwoSelection, ")", " (YOU ",
        youScore, " : COM ", comScore, ")");
    }
    else if (winner == 2)
    {
        resultText = resultText.concat("(", pTwoSelection, " beats ", pOneSelection, ")", " (YOU ",
        youScore, " : COM ", comScore, ")");
    }
    else
    {
        resultText = resultText.concat("(", pOneSelection, " ties against ", pTwoSelection, ")", " (YOU ",
        youScore, " : COM ", comScore, ")")
    }

    return resultText;
}

// Returns a string to announce the result of the overall match
function getFinalResult(pOneScore, pTwoScore)
{
    let resultText = "";

    resultText = resultText.concat("Final results.. ");

    if (pOneScore > pTwoScore)
    {
        resultText = resultText.concat("You are the winner!");
    }
    else if (pOneScore < pTwoScore)
    {
        resultText = resultText.concat("COM is the winner!");
    }
    else
    {
        resultText = resultText.concat("It is a tie!");
    }

    return resultText;
}

// Returns a string to announce the detail of the overall match
function getFinalDetail(youScore, comScore, roundCount)
{
    let resultText = "";

    resultText = resultText.concat("(", roundCount, " rounds total) ", "(YOU ", youScore, " : COM ", comScore, ")");

    return resultText;
}

/*
    Overall Game Function
*/
// Plays through a round
//     e is the click event that called this function
const playRound = (e) =>
{
    let pOneSelection = playerPlay(e.target.id);
    let pTwoSelection = computerPlay();
    let winner = findWinner(pOneSelection, pTwoSelection);

    let youRock = document.getElementById("you-rock");
    let youPaper = document.getElementById("you-paper");
    let youScissors = document.getElementById("you-scissors");

    let comRock = document.getElementById("com-rock");
    let comPaper = document.getElementById("com-paper");
    let comScissors = document.getElementById("com-scissors");

    let youScoreElement = document.getElementById("you-score");
    let comScoreElement = document.getElementById("com-score");
    let youWinsElement = document.getElementById("you-wins");
    let comWinsElement = document.getElementById("com-wins");
    let roundCountElement = document.getElementById("round-count");

    let announcementText = document.getElementById("announcement-text");
    let detailText = document.getElementById("announcement-detail");
    let toolText = document.getElementById("tool-text");

    let youScore = youScoreElement.textContent;
    let comScore = comScoreElement.textContent;
    let youWins = youWinsElement.textContent;
    let comWins = comWinsElement.textContent;
    let roundCount = roundCountElement.textContent;

    // Update com choice
    if (pOneSelection == "Rock")
    {
        youRock.classList.remove("card");
        youRock.classList.add("card-active");
        youPaper.classList.remove("card-active");
        youPaper.classList.add("card");
        youScissors.classList.remove("card-active");
        youScissors.classList.add("card");
    }
    else if (pOneSelection == "Paper")
    {
        youRock.classList.remove("card-active");
        youRock.classList.add("card");
        youPaper.classList.remove("card");
        youPaper.classList.add("card-active");
        youScissors.classList.remove("card-active");
        youScissors.classList.add("card");
    }
    else if (pOneSelection == "Scissors")
    {
        youRock.classList.remove("card-active");
        youRock.classList.add("card");
        youPaper.classList.remove("card-active");
        youPaper.classList.add("card");
        youScissors.classList.remove("card");
        youScissors.classList.add("card-active");
    }

    if (pTwoSelection == "Rock")
    {
        comRock.classList.remove("card");
        comRock.classList.add("card-active");
        comPaper.classList.remove("card-active");
        comPaper.classList.add("card");
        comScissors.classList.remove("card-active");
        comScissors.classList.add("card");
    }
    else if (pTwoSelection == "Paper")
    {
        comRock.classList.remove("card-active");
        comRock.classList.add("card");
        comPaper.classList.remove("card");
        comPaper.classList.add("card-active");
        comScissors.classList.remove("card-active");
        comScissors.classList.add("card");
    }
    else if (pTwoSelection == "Scissors")
    {
        comRock.classList.remove("card-active");
        comRock.classList.add("card");
        comPaper.classList.remove("card-active");
        comPaper.classList.add("card");
        comScissors.classList.remove("card");
        comScissors.classList.add("card-active");
    }

    // Update score based on winner
    // Update total based on winner
    if (winner == 1)
    {
        youScore++;
    }
    else if (winner == 2)
    {
        comScore++;
    }

    roundCount++;

    // Check if at 5
        // if at 5, reset score
        // announce winner of match
        // else, announce winner of round
    if (youScore == 5 || comScore == 5)
    {
        announcementText.textContent = getFinalResult(youScore, comScore);
        detailText.textContent = getFinalDetail(youScore, comScore, roundCount);

        if (youScore == 5)
        {
            youWins++;
        }
        else
        {
            comWins++;
        }

        youScore = 0;
        comScore = 0;
        roundCount = 0;
    }
    else
    {
        announcementText.textContent = getRoundResult(pOneSelection, pTwoSelection, winner);
        detailText.textContent = getRoundDetail(pOneSelection, pTwoSelection, winner, youScore, comScore);
    }

    // Update score text
    // Update total text
    // Update round text

    youScoreElement.textContent = youScore;
    comScoreElement.textContent = comScore;
    youWinsElement.textContent = youWins;
    comWinsElement.textContent = comWins;
    roundCountElement.textContent = roundCount;
}

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
