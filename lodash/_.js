const _ = {
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
    inRange() {

    },
};




// Do not write or modify code below this line.
module.exports = _;