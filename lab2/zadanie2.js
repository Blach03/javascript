function sum(x,y) {
    return x+y;
}


function sum_strings(a) {
    let sum = 0;
    for (let str of a) {
        const num = parseFloat(str);
        if (!isNaN(num)) {
            sum += num;
        }
    }
    return sum;
}


function digits(s) {
    let oddSum = 0;
    let evenSum = 0;

    for (const char of s) {
        const digit = parseInt(char);
        if (!isNaN(digit)) {
            if (digit % 2 === 0) {
                evenSum += digit;
            } else {
                oddSum += digit;
            }
        }
    }

    return [oddSum, evenSum];
}

function letters(s) {
    let lowercaseCount = 0;
    let uppercaseCount = 0;

    for (const char of s) {
        if (char >= 'a' && char <= 'z') {
            lowercaseCount++;
        } else if (char >= 'A' && char <= 'Z') {
            uppercaseCount++;
        }
    }

    return [lowercaseCount, uppercaseCount];
}