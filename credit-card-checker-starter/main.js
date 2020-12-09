// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

<<<<<<< HEAD







=======
// FIRST ATTEMPT: WORKS
// const doubleNumbers = (arr, evenFlag) => {
//     if(evenFlag){
//         return arr.map((element, index) => {
//             return (index % 2 === 0 ? element *= 2 : element) > 9 ? element -= 9 : element; // check if index is even, double it, then check if the double is greater than 9
//         })
//     } else {
//         return arr.map((element, index) => {
//             return (index % 2 === 1 ? element *= 2 : element) > 9 ? element -= 9 : element;
//         })
//     }
// }

// const validateCred = arr => {
//     let arrChecker
//     if(arr.length % 2 === 0){ // check if the array is even or odd. For even arrays check even indexes, for odd arrays check odd indexes so the check digit is not doubled
//         arrChecker = doubleNumbers(arr, true); 
//     } else {
//         arrChecker = doubleNumbers(arr, false);
//     }
//     return (arrChecker.reduce((acc, value) => acc + value) % 10) === 0;
// }

// IMPROVED VERSION USING -1 AS AN OFFSET, THE INDEX VALUE AND THE ARRAY LENGTH TO WORK WITH EVEN NUMBERS ON EVEN ARRAY AND ODD NUMBER ON ODD ARRAY
const validateCred = arr => {
    return (arr.map((element, index, arr) => {
        return ((arr.length - 1 - index) % 2 === 1 ? element *= 2 : element) > 9 ? element -= 9 : element; // (arr.length - 1 - index) % 2 does the same as the even or odd flag check
    }).reduce((acc, value) => acc + value)) % 10 === 0;
}


const findInvalidCards = listOfCreditCards => {
    return listOfCreditCards.filter(card => !validateCred(card)) // ! to inverse the return value of validateCard() to only get invalid cards instead of valid cards
}

const idInvalidCardCompanies = listOfInvalidCreditCards => {
    return [...new Set(listOfInvalidCreditCards.map(invalidCard => { // spread operator
        const initialValue = invalidCard[0];
        switch (initialValue) {
            case 3:
                return 'Amex (American Express)';
            case 4:
                return 'Visa';
            case 5:
                return 'Mastercard';
            case 6:
                return 'Discover';
            default:
                return 'Company not found';
        }
        }))]
}

const stringToCard = string => {
    return Array.from(string.split(''), Number);
}

const convertToValid = invalidCard => {
    let validCard = invalidCard.slice(0, invalidCard.length - 1);
    const finalValue = (invalidCard.map((element, index, arr) => {
        return ((arr.length - 1 - index) % 2 === 1 ? element *= 2 : element) > 9 ? element -= 9 : element; 
    }).reduce((acc, value) => acc + value)) % 10;
    // Check if the subtraction gives a negative final number then just add a 0 before the last number without changing it, else just subtract it from the last position.
    invalidCard[invalidCard.length-1] - finalValue < 0 ? validCard.push(0, invalidCard[invalidCard.length -1]) : validCard.push(invalidCard[invalidCard.length-1] - finalValue);
    return validCard;
}


// Test function
console.log(validateCred(valid1)); // Should print true
console.log(validateCred(invalid1)); // Should print false


console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
console.log(findInvalidCards(batch)); // Test what the mystery numbers are


console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards

console.log(stringToCard('8756452142'));

console.log(validateCred(convertToValid(invalid1))); // Should print true
console.log(validateCred(convertToValid(invalid3))); // Should print true
>>>>>>> 7d4d7b79677e39aea54264a366d2327aaa0251e7
