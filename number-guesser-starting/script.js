let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
// Generate a random number between 0 and 9
const generateTarget = () => Math.floor(Math.random()*10);

// Estimate the absolute distance of 2 numbers
const getAbsoluteDistance = (num1, num2) => Math.abs(num2 - num1);


const compareGuesses = (humanGuess, computerGuess, target) => {
    // Compare the absolute distance towards the target
    let humanTargetDif = getAbsoluteDistance(humanGuess, target);
    let computerTargetDif = getAbsoluteDistance(computerGuess, target);
    // ternary operator
    return (humanTargetDif === computerTargetDif || humanTargetDif <= computerTargetDif) ? true : false;
}

const updateScore = winner => {
    if(winner === 'human') {
        humanScore +=1;
    } else {
        computerScore +=1;
    }
}

const advanceRound = () => currentRoundNumber +=1;



