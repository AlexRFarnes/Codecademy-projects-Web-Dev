const _ = {
    /* ---------NUMBERS METHODS--------- */

    // My initial idea for clamp method
    // clamp(num, lowerBound, upperBound) {
    //     if (num < lowerBound) {
    //         return lowerBound;
    //     } else if (num > upperBound) {
    //         return upperBound;
    //     } else {
    //         return num;
    //     }
    // },
    // Codecademy suggested implementation for clamp method
    clamp(num, lowerBound, upperBound) {
        const lowerClampedNumber = Math.max(num, lowerBound);
        const clampedNumber = Math.min(lowerClampedNumber, upperBound);
        return clampedNumber;
    },
    inRange(num, start, end) {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        if (start > end) {
            [start, end] = [end, start];
        }
        if (num >= start && num < end) {
            return true;
        }
        return false;
    },

    /* ---------STRING METHODS--------- */
    words(string){
        let words = string.split(' ');
        return words;

    },
    pad(string, length){
        if(string.length > length) return string;

        let totalPadding = length - string.length;
        let beginPadding = Math.floor(totalPadding/2);
        let endPadding = totalPadding - beginPadding;
        return ' '.repeat(beginPadding) + string + ' '. repeat(endPadding);
    },

    /* ---------OBJECT METHODS--------- */
    has(object, key){
        //Check if the object's key is exists or not
        return object[key] !== undefined
    },
    invert(object){
        const invertedObject = {};
        for(let key in object){
            invertedObject[object[key]] = key;
        }
        return invertedObject;
    },
    findKey(object, predicate){
        for(let key in object){
            let value = object[key];
            let predicateReturnValue = predicate(value);
            if(predicateReturnValue === true) {
                return key;
            }
        }
        return undefined;
    },
    /* ---------ARRAY METHODS--------- */
    
};




// Do not write or modify code below this line.
module.exports = _;