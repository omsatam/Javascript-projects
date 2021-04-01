// First Challenge : Getting age in days
getAge = document.getElementById("findAge");
resetAge = document.getElementById("resetAge");
resultAge = document.getElementById("resultAge");
resultContainer = document.getElementById("resultContainer");
// Getting age in days on clicking Enter age button
getAge.addEventListener('click', () =>  {
    resultAge.textContent = ""
    let birthYear = prompt("Please Enter your birth year");
    let currentYear = new Date();
    if (birthYear != 0) {
    ageInDays = (currentYear.getFullYear() - birthYear) * 365 ;
    let message = document.createTextNode("You are "+ ageInDays + " days old")
    var h1 = document.createElement('h1');
    h1.setAttribute('id','userAgeInDays')
    h1.appendChild(message);
    resultAge.appendChild(h1);
}
});
// Resetting age on clicking Reset button
resetAge.addEventListener('click', () =>  {
    resultAge.textContent = ""
});





// Second Challenge : puppies Image Generator
let puppiesDiv = document.getElementById("resultpuppiesGenerator")
function generatepuppies (){
    let imagepuppies = document.createElement('img');
    imagepuppies.src = "https://source.unsplash.com/1000x1000/?puppy"
    
    // imagepuppies.style 
    puppiesDiv.appendChild(imagepuppies)
}
function clearpuppies(){
    while (puppiesDiv.firstChild) {
        puppiesDiv.removeChild(puppiesDiv.firstChild);
      }
}





// Third challenge : Changing color of buttons
let allButtons = document.getElementsByTagName('button');
let copyAllButtons = []
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1])
}
function buttonColorChange(buttonClicked){
    if (buttonClicked.value === 'Red'){
        buttonsRed();
    }
    else if(buttonClicked.value === 'Green'){
        buttonsGreen();
    }
    else if(buttonClicked.value === 'Blue'){
        buttonsBlue();
    }
    else if(buttonClicked.value === 'Yellow'){
        buttonsYellow();
    }
    else if(buttonClicked.value === 'Random'){
        buttonsRandom();
    }
    else if(buttonClicked.value === 'Reset'){
        buttonsReset();
    }
}

function buttonsRed(){
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add('btn-danger')
       
    }
}
function buttonsGreen(){
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add('btn-success')
       
    }
}
function buttonsYellow(){
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add('btn-warning')
       
    }
}
function buttonsBlue(){
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add('btn-primary')
       
    }
}
function buttonsReset(){
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add(copyAllButtons[i])
       
    }
}
function buttonsRandom(){
    let colors = ['btn-primary','btn-secondary','btn-success','btn-danger','btn-warning'];
    for (let i = 0; i< allButtons.length; i++) {
      let randomNumber = Math.floor(Math.random()*5);
      allButtons[i].classList.remove(allButtons[i].classList[1])
      allButtons[i].classList.add(colors[randomNumber])
       
    }
}





// challenge 4: Let's play Rock, Paper, Scissor

rockImg = document.getElementById("rock")
paperImg = document.getElementById("paper")
scissorImg = document.getElementById("scissor")
rpsChallengeContainer = document.querySelector(".rpsChallengeContainer")
function playRPS(imageClicked){
    let humanChoice = imageClicked.id
    let computerChoice = randomChoose(randomNumberTill2());
    let score = decideScore(humanChoice,computerChoice)
    let message = decideWinner(score)
    displayWinner(humanChoice,computerChoice,message)
}
function randomNumberTill2(){
    return Math.floor(Math.random()*3);
}
function randomChoose(choice){
    let choices = ['rock','paper','scissor'];
    return choices[choice];
}
function decideScore(humanChoice,computerChoice){
    rpsData = {
        'rock' : {'scissor':0, 'rock': 0.5, 'paper': 1},
        'paper' : {'scissor':0, 'paper': 0.5, 'rock': 1, },
        'scissor' : {'rock': 0, 'scissor': 0.5, 'paper': 1}
    }
    return rpsData[humanChoice][computerChoice];
}
function decideWinner(scoreHuman){
    let message;
    if(scoreHuman === 0){
        message = {
            'value' : "You Lost",
            'color' : "red"
        }
    }
    if(scoreHuman === 0.5){
        message = {
            'value' : "You Drew",
            'color' : "yellow"
        }
    }
    if(scoreHuman === 1){
        message = {
            'value' : "You Won",
            'color': "green"
        }
    }
    return message;
}
function displayWinner(humanChoice,computerChoice,message){
    while (rpsChallengeContainer.firstChild) {
        rpsChallengeContainer.removeChild(rpsChallengeContainer.firstChild);
      }

    humanChoiceImg = document.createElement("img");
    humanChoiceImg.src = "static/" + humanChoice + ".png" ;
    computerChoiceImg = document.createElement("img");
    computerChoiceImg.src = "static/" + computerChoice + ".png" 
    messageDiv = document.createElement("h1")
    let messageHeading = message.value;
    messageDiv.append(messageHeading)
    messageDiv.style.color = message.color

    rpsChallengeContainer.appendChild(humanChoiceImg)
    rpsChallengeContainer.appendChild(messageDiv)
    rpsChallengeContainer.appendChild(computerChoiceImg)
}
function resetDefault(){
   document.location.reload()
}