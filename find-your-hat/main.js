const prompt = require('prompt-sync')({sigint: true});

// const name = prompt('What is your name? ').toUpperCase();
// console.log(name);

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._x = 0;
        this._y = 0;
        this._fieldWidth = this._field[0].length;
        this._fieldHeight = this._field.length;
        this._endGame = false;
    }

    static generateField(height, width, percentage) {
        if(percentage > 35) {
            percentage = 35 / 100
            console.log('The percentage of holes is too high');
        }
        percentage /= 100;
        const field = [];
        let Y_hat, X_hat;
        [Y_hat, X_hat] =  this.generateHatPosition(height, width);
        // Check spaces to fill with holes
        let numOfHoles = height * width * percentage;
        // Check spaces to fill with fieldCharacter
        let spacesLeft = height * width - 1 - 1 - numOfHoles;
        for(let h = 0; h < height; h++){
            field.push([]);
            for(let w = 0; w < width; w ++){
                field[h].push(' ');
                if(h === 0 && w === 0) {
                    field[h][w] = pathCharacter;
                }
                else if(h === Y_hat && w === X_hat) {
                    field[h][w] = hat;
                } else {
                    if(this.checkHolesLeft(numOfHoles) && this.spacesToFill(spacesLeft)) {
                        let valueToFill = Math.floor(Math.random() * 2) === 0 ? fieldCharacter : hole;
                        valueToFill === hole ? numOfHoles -= 1 : spacesLeft -= 1;
                        field[h][w] = valueToFill;
                    } else if(this.checkHolesLeft(numOfHoles) && !this.spacesToFill(spacesLeft)) {
                        field[h][w] = hole;
                        numOfHoles -= 1;
                    } else if(!this.checkHolesLeft(numOfHoles) && this.spacesToFill(spacesLeft)) {
                        field[h][w] = fieldCharacter;
                        spacesLeft -= 1;
                    }
                }
            }
        }
        return field;
    }

    static checkHolesLeft(numOfHoles){
        return numOfHoles > 0 ? true : false;
    }

    static spacesToFill(spacesLeft) {
        return spacesLeft > 0 ? true : false;
    }
    
    static generateHatPosition(height, width) {
        return [ Math.ceil(Math.random() * (height - 1)) , Math.ceil(Math.random() * (width - 1)) ]
    }

    print(){
        for(let row in this._field) {
            console.log(this._field[row].join(' '));
        }
    }

    play() {
         while(!this._endGame) {
            //  Main game loop
            this.checkUserPosition();
            // Ask for user input
            let userInput = this.askInput();
            //Verify the user input and keep asking if it is not valid
            while(!this.verifyInput(userInput)){
                userInput = this.askInput();
            }
            this.updateUserPosition(userInput);
            this.checkUserPosition();
        }
    }

    checkUserPosition() {
        if(this._x < 0 || this._y < 0 || this._x >= this._fieldWidth || this._y >= this._fieldHeight){
            console.log('Sorry, you went out of bounds!');
            this._endGame = !this._endGame;
        }else if (this._field[this._y][this._x] === hole){
            console.log('Sorry, better luck for the next!');
            this._field[this._y][this._x] = ':(';
            myField.print();
            this._endGame = !this._endGame;
        } else if (this._field[this._y][this._x] === hat) {
            console.log('You WON! Congrats!');
            this._field[this._y][this._x] = ':)';
            myField.print();
            this._endGame = !this._endGame;
        } else {
            this._field[this._y][this._x] = pathCharacter;
            myField.print();
        }
    }

    askInput() {
        const direction = prompt('Please enter your next move (U, R, D, L): ').toUpperCase();   
        return direction;
    }

    verifyInput(userInput){
        const allowedMoves = ["U", "R", "D", "L"];
        return allowedMoves.includes(userInput)
        }

    updateUserPosition(userInput) {
        switch(userInput){
            case "R":
                this._x +=1;
                break;
            case "L":
                this._x -= 1;
                break;
            case "U":
                this._y -=1;
                break;
            case "D":
                this._y += 1;
                break;
        }
    }


}

// const myField = new Field([
//     ['*', '░', 'O'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],
//   ]);

const myField = new Field(Field.generateField(5, 5, 35));


myField.play();

// console.log(Field.generateField(4,4,25));