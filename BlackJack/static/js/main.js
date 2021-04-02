// BlackJack Game


let blackJackGame = {
    'you' : {'scoreSpan': '#yourblackJackScore', 'div': '.yourBlackJackCardsArea','score': 0},
    'computer' : {'scoreSpan': '#computerblackJackScore', 'div': '.computerBlackJackCardsArea','score': 0},
    'cards' : ['1','2','3','4','5','6','7','8','9','10','J','Q','K'],
    'cardsValue' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10},
    'blackJackWins' : 0,
    'blackJackLosses' : 0,
    'blackJackDraws' : 0,
    'turnsOver' : false,
    'isStand' : false,
    'scoreDisplayed' : false,
}

const YOU = blackJackGame['you'];
const COMPUTER = blackJackGame['computer']

document.getElementById('hitBlackJack').addEventListener('click',blackJackHit)
document.getElementById('dealBlackJack').addEventListener('click',blackJackDeal)
document.getElementById('standBlackJack').addEventListener('click',blackJackStand)

const hitSound = new Audio("static/sounds/hit.m4a")
const winSound = new Audio("static/sounds/win.mp3")
const lostSound = new Audio("static/sounds/lost.mp3")

function blackJackHit(){
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU)
    }
}

function randomCard(){
    let randomCardIndex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomCardIndex];
}
function showCard(card,activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `../static/images/cards/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play()
    }
}
function updateScore(card,activePlayer){
    if (card === '1'){
        // if by adding 11 the score is below 21 then add 11 otherwise add 1
        if (activePlayer['score'] + 11 <= 21){
            activePlayer['score'] += 11
        }
        else{
            activePlayer['score'] += 1
        }

    }
    else{
        activePlayer['score'] += blackJackGame['cardsValue'][card]
    }

}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!!"
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}

function blackJackDeal(){
    blackJackGame['scoreDisplayed'] = false
    if (blackJackGame['turnsOver'] === true){
        blackJackGame['isStand'] = false
        let yourCards = document.querySelector(YOU['div']).querySelectorAll('img')
        let computerCards = document.querySelector(COMPUTER['div']).querySelectorAll('img')

        for (let i = 0; i < yourCards.length; i++) {
            yourCards[i].remove();    
        }
        for (let i = 0; i < computerCards.length; i++) {
            computerCards[i].remove();    
        }
        YOU['score'] = 0;
        COMPUTER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0
        document.querySelector(COMPUTER['scoreSpan']).textContent = 0

        document.querySelector(YOU['scoreSpan']).style.color = 'black'
        document.querySelector(COMPUTER['scoreSpan']).style.color = 'black'

        document.querySelector('.blackJackResultHeading').textContent = "Let's Play"
        document.querySelector('.blackJackResultHeading').style.color = "black"
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}
async function blackJackStand(){
    blackJackGame['isStand'] = true;


    while(COMPUTER['score'] < 18 && blackJackGame['isStand'] === true){
            let card = randomCard()
            showCard(card,COMPUTER)
            updateScore(card,COMPUTER)
            showScore(COMPUTER)
            await sleep(1000)
        }
    blackJackGame['turnsOver'] = true
    let winner = computeWinner()
    showWinner(winner)
}

function computeWinner(){
    let winner;
    if(blackJackGame['isStand'] === true && blackJackGame['turnsOver'] === true && blackJackGame['scoreDisplayed']===false){
        if (YOU['score'] <=21 ){
            if (YOU['score'] > COMPUTER['score'] || COMPUTER['score'] > 21){
                winner = YOU
                blackJackGame['blackJackWins']++
            }
            else if (YOU['score'] < COMPUTER['score']){
                winner = COMPUTER
                blackJackGame['blackJackLosses']++
            }
            else if (YOU['score'] === COMPUTER['score']){
                winner = null
                blackJackGame['blackJackDraws']++
            }
        }
        else if(YOU['score'] > 21 && COMPUTER['score'] <= 21){
            blackJackGame['blackJackLosses']++
            winner = COMPUTER
        }
        else if(YOU['score'] > 21 && COMPUTER['score'] > 21){
            blackJackGame['blackJackDraws']++
            winner = null
        }
    }
    return winner;
}

function showWinner(winner){
    let message, messageColor;
    if (blackJackGame['turnsOver'] && blackJackGame['scoreDisplayed']===false ){

        if (winner === YOU){
            message = 'You Won!!!!'
            messageColor = 'green'
            winSound.play()
        }
        else if(winner === COMPUTER){
            message = 'You Lost!!'
            messageColor = 'red'
            lostSound.play()
        }
        else{
            message = 'you drew!'
            messageColor = 'yellow'
            lostSound.play()
        }


        document.querySelector('.blackJackResultHeading').textContent = message
        document.querySelector('.blackJackResultHeading').style.color = messageColor

        document.querySelector('.blackJackWins').textContent = blackJackGame['blackJackWins']
        document.querySelector('.blackJackLosses').textContent = blackJackGame['blackJackLosses']
        document.querySelector('.blackJackDraws').textContent = blackJackGame['blackJackDraws']

        blackJackGame['scoreDisplayed']= true
    }
}
