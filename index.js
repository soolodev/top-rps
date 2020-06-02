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
// Returns a string to announce the start of the round // DEPRECATED
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
        resultText = resultText.concat("(", pOneSelection, " ties ", pTwoSelection, ")", " (YOU ",
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

    resultText = resultText.concat("(", roundCount, " rounds total) ",
        "(YOU ", youScore, " : COM ", comScore, ")");

    return resultText;
}

/*
    Tool tip
*/
// Swaps text and shows tip
const moveIn = (e) =>
{
    const hoverObject = playerPlay(e.target.id);

    const rockPos = e.target.getBoundingClientRect();
    const paperPos = e.target.getBoundingClientRect();
    const scissorsPos = e.target.getBoundingClientRect();

    const toolText = document.getElementById("tool-text");
    const toolContainer = document.getElementById("tool-container");
    const toolArrow = document.getElementById("tool-arrow");

    const arrowPos = toolArrow.getBoundingClientRect();

    toolContainer.classList.add("tt-enter");
    toolContainer.classList.add("tt-active");

    if (hoverObject == "Rock")
    {
        toolText.textContent = "Rock - Strong against scissors, but weak against paper.";
        toolArrow.style.setProperty("left", `${rockPos.left + (rockPos.width / 2) - (arrowPos.width / 2)}px`);
    }
    else if (hoverObject == "Paper")
    {
        toolText.textContent = "Paper - Strong against rock, but weak against scissors.";
        toolArrow.style.setProperty("left", `${paperPos.left + (paperPos.width / 2) - (arrowPos.width / 2)}px`);
    }
    else if (hoverObject == "Scissors")
    {
        toolText.textContent = "Scissors - Strong against paper, but weak against rock.";
        toolArrow.style.setProperty("left", `${scissorsPos.left + (scissorsPos.width / 2) - (arrowPos.width / 2)}px`);
    }

}

// remove tip
const moveOut = (e) =>
{
    const toolContainer = document.getElementById("tool-container");

    toolContainer.classList.remove("tt-enter", "tt-active");
}

/*
    Overall Game Function
*/
// Plays through a round
//     e is the click event that called this function
const playRound = (e) =>
{
    const pOneSelection = playerPlay(e.target.id);
    const pTwoSelection = computerPlay();
    const winner = findWinner(pOneSelection, pTwoSelection);

    const youRock = document.getElementById("you-rock");
    const youPaper = document.getElementById("you-paper");
    const youScissors = document.getElementById("you-scissors");

    const comRock = document.getElementById("com-rock");
    const comPaper = document.getElementById("com-paper");
    const comScissors = document.getElementById("com-scissors");

    const youScoreElement = document.getElementById("you-score");
    const comScoreElement = document.getElementById("com-score");
    const youWinsElement = document.getElementById("you-wins");
    const comWinsElement = document.getElementById("com-wins");
    const roundCountElement = document.getElementById("round-count");

    const announcementText = document.getElementById("announcement-text");
    const detailText = document.getElementById("announcement-detail");

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
//     e is the click event that called this function // DEPRECATED
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
