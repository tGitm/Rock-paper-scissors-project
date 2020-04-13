 //rock, paper, scissors

 function rpsGame(yourChoice) {
    //console.log(yourChoice);
    
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numToChoice(randomToRpsInt());
    console.log('Computer choice:', botChoice);

    results = decideWinner(humanChoice, botChoice); // [1, 0] -> 1 zmaga, 0 poraz, 0.5 izenačeno
    console.log(results);

    message = finalMessage(results); // {'message': 'You Won!', 'color': green}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
 }

 function randomToRpsInt() {
     return Math.floor(Math.random() * 3);
 }

 function numToChoice(number) {
     return ['rock', 'paper', 'scissors'][number]
 }

function decideWinner(yourChoice, computerChoice) {
    let rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0}, //če vzamem kamen, premagam škarje
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    }

    let youScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [youScore, computerScore];
}

function finalMessage([youScore, computerScore]) {
    if (youScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    }
    else if (youScore === 0.5) {
        return {'message': 'Tied!', 'color': 'yellow'};
    }
    else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function reset() {
    location.reload();
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    let imageDatabase = {
        'rock': document.getElementById('rock').src, //dobim source elementa
        'scissors': document.getElementById('scissors').src,
        'paper': document.getElementById('paper').src
    }
    //odstranim vse slike 
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let resetButton = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    document.getElementById('flex-box-rps-div').append(humanDiv);

    messageDiv.innerHTML = "<h3 style='color: " + finalMessage['color'] + "; font-size: 30px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    document.getElementById('flex-box-rps-div').append(messageDiv);

    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
    document.getElementById('flex-box-rps-div').append(botDiv);

    resetButton.innerHTML = "<button class='btn btn-primary' onclick='reset()'>Try again</button>";
    document.getElementById('reset-game').append(resetButton);
}
