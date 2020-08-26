describe('Testing the correct summation of even numbers', function(){
    it('only even numbers passed in should be added', function(){
        expect(sumEvenArguments(1,2,3,4)).toEqual(6);
        expect(sumEvenArguments(1,2,6)).toEqual(8);
        expect(sumEvenArguments(1,2)).toEqual(2);
    });
});

describe('The function to convert an argument into an array', function(){
    it('convert arguments into array', function(){
        expect(arrayFrom(2, 3, 7, 98)).toEqual([2, 3, 7, 98]);
    });
});

describe('The invokeMax function should work only in a specified amount of time', function(){
    it('it should return the correct summation', function(){
        function add(a,b){
            return a+b
        }

        var addOnlyThreeTimes = invokeMax(add, 3);

        expect(addOnlyThreeTimes(1, 2)).toEqual(3);
        expect(addOnlyThreeTimes(2, 2)).toEqual(4);
        expect(addOnlyThreeTimes(1, 2)).toEqual(3);
        expect(addOnlyThreeTimes(1, 2)).toMatch('Maxed Out!');
    });
});

describe('The guessing game is being tested', function(){
    it('should cancel the game after the amount passed id reached', function(){
        var myGuess = guessingGame(3);

        myGuess(1);
        myGuess(3);
        myGuess(9);
        expect(myGuess(2)).toMatch('You are out of guesses!');
    });
});