// PART 1
// 1. What is the value of the keyword this in the following example:
var data = this;
console.log(data);

// Ans: window

// 2. What does this function output? Why?
function logThis(){
    return this;
}

logThis(); // Ans: Window. There are no variable declarations in the block scope, so implicit binding can't kick in, so it refers to the global

// 3. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    sayHi: function(){
        console.log("Hello! " + this.firstName);
    }
}

instructor.sayHi() // Ans: Hello Tim. Implicit binding connects this to the block scoped variable declaration.

// 4. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true
    },
    displayInfo: function(){
        console.log("Cat owner? " + this.catOwner);
    }
}

instructor.displayInfo() // Ans: Cat owner? undefined. The this.catOwner isn't pointing to the right place. Should be this.info.catOwner.


// 5. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true,
        displayLocation: function(){
            return this.data.location;
        },
        data: {
            location: "Oakland"
        }
    },
}

instructor.info.displayLocation() // Ans: Oakland. Implicit binding in place. It's in same block as data, so it gives no issues unlike code above.


// 6. What does this function output? Why?
var instructor = {
    firstName: 'Tim',
    info: {
        catOwner: true,
        boatOwner: true,
        displayLocation: function(){
            console.log(this.location);
        },
        data: {
            location: "Oakland",
            logLocation: this.displayLocation
        }
    },
}

// instructor.info.data.logLocation() // Ans: Error. You called logLocation which is not a function.


// PART 2

// 1. Fix the following code:
var obj = {
    fullName: "Harry Potter",
    person: {
        sayHi: function(){
            return "This person's name is " + this.fullName
        }
    }
}

obj.person.sayHi.call(obj, obj.fullName);


// 2. List two examples of "array-like-objects" that we have seen.

// Ans: Arguments, DOM NodeList


// 3. Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.
function sumEvenArguments(...args){
    var evenArgs = args.filter(function(val){
        return val % 2 === 0
    }).reduce(function(acc, next){
        return acc + next
    }, 0);

    return evenArgs;
}

var num1 = sumEvenArguments(1,2,3,4) // 6
var num2 = sumEvenArguments(1,2,6) // 8
var num3 = sumEvenArguments(1,2) // 2
 console.log(num1, num2, num3);


 // 4. Write a function called arrayFrom which converts an array-like-object into an array.
 function arrayFrom(...args){
    let newArray = [];
    args.forEach((val) => {
        newArray.push(val);
    })
    return newArray;
 };

 function sample(){
    var arr = arrayFrom(...arguments)
    console.log(arr);
    if(!arr.reduce) throw "This is not an array!"
    return arr.reduce(function(acc,next){
        return acc+next;
    },0)
}

sample(1,3,4,1);


// 5. Write a function called invokeMax which accepts a function and a maximum amount. invokeMax 
// should return a function that when called increments a counter. If the counter is greater than the 
// maximum amount, the inner function should return "Maxed Out!"
function invokeMax(fn, max){
    let counter = 0;
    return function checker(a, b){
        counter++;
        if(counter > max){
            return "Maxed Out!";
        } else {
            return fn(a, b);
        }
    }
}

function add(a,b){
    return a+b
}

var addOnlyThreeTimes = invokeMax(add,3);

console.log(addOnlyThreeTimes(1,2)) // 3
console.log(addOnlyThreeTimes(2,2)) // 4
console.log(addOnlyThreeTimes(1,2)) // 3
console.log(addOnlyThreeTimes(1,2)) // "Maxed Out!"


// 6. Write a function called guessingGame which takes in one parameter amount. The function should return another function that 
// takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a 
// random number between 0 and 10 as well as a variable called guesses which should be set to 0.
// In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should 
// return the string "You got it!". If the guess is too high return "You're too high!" and if it is too low, return "You're too low!". 
// You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the 
// outer function.
//You will have to make use of closure to solve this problem.

function guessingGame(amount){
    let randNumber = Math.floor(Math.random() * 11);
    let guesses = 0;
    let answer;
    return function inner(guess){
        guesses++;
        if(guesses <= amount){
            if(randNumber === guess){
                answer = `You got it, the guessed number is ${randNumber}, and you input ${guess}`;
                return answer;
            } else if(randNumber > guess) {
                return "You're too low"
            } else {
                return "You're too high"
            }
        } else {
            return "You are out of guesses!";
        }
    }
}

var myGuess = guessingGame(3);
console.log(myGuess(1));
console.log(myGuess(8));
console.log(myGuess(9));
console.log(myGuess(10));