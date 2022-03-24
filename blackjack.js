import ConfettiGenerator from "./confetti.js";

const symbol = ["♠","♥","♦","♣"]
const value = [2, 3, 4, 5, 6, 7, 8, 9, 10,"A","J","Q","K"]
const color = ["red", "black"]

let cardSymbolOne = document.querySelectorAll(".card-symbol1")
let cardSymbolTwo = document.querySelectorAll(".card-symbol2")

let placeNumberOne = document.querySelectorAll(".card-number1")
let placeNumberTwo = document.querySelectorAll(".card-number2")

let cardOne = document.getElementById("card1")
let cardTwo = document.getElementById("card2")

let cardBox = document.getElementById("card-box")
let cardBack = document.querySelectorAll(".card")

let btn = document.getElementById("btn")
let btnNewCard = document.getElementById("btn-new")
let btnNewGame = document.getElementById("btn-game")

let sum = 0

let inGame = false
let gotBJ = false

function getRandomValue(arr) {
    return Math.floor(Math.random() * arr.length)
}

const cardObject = [
    {
        value: value[getRandomValue(value)],
        symbol: symbol[getRandomValue(symbol)],
        color: color[getRandomValue(color)]
    },
    {
        value: value[getRandomValue(value)],
        symbol: symbol[getRandomValue(symbol)],
        color: color[getRandomValue(color)]
    }
]

btn.addEventListener(("click"), () => {

    if (inGame === false && sum === 0) {
        cardBack.forEach(element => element.style.background = "#fff")
        placeNumberOne.forEach(element => element.textContent = cardObject[0].value)
        placeNumberTwo.forEach(element => element.textContent = cardObject[1].value)

        cardSymbolOne.forEach(element => element.textContent = cardObject[0].symbol)
        cardSymbolTwo.forEach(element => element.textContent = cardObject[1].symbol)

        if (cardObject[0].symbol === "♥" || cardObject[0].symbol === "♦" ) {
            cardOne.style.color = "red"
        }else {
            cardOne.style.color = "black"
        }

        if (cardObject[1].symbol === "♠" || cardObject[1].symbol === "♣" ) {
            cardTwo.style.color = "black"
        }else {
            cardTwo.style.color = "red"
        }
        

        if (cardObject[0].value === "K" || cardObject[0].value === "Q" || cardObject[0].value === "J"){
            cardObject[0].value = 10
        }else if (cardObject[0].value === "A"){
            cardObject[0].value = 11
        }else {
            cardObject[0].value
        }

        if (cardObject[1].value === "K" || cardObject[1].value === "Q" || cardObject[1].value === "J"){
            cardObject[1].value = 10
        }else if (cardObject[1].value === "A"){
            cardObject[1].value = 11
        }else {
            cardObject[1].value
        }

        inGame = true

        sum = cardObject[0].value + cardObject[1].value
        document.getElementById("total-score").textContent = "Total Score: " + sum + "pts"
        summary()
    }
})

function summary() {
    if (sum === 21){
        document.getElementById("summary").textContent = "You Won!"
        let confettiSettings = { target: 'my-canvas' };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        gotBJ = true
        inGame = false
    }else if(sum > 21){
        document.getElementById("summary").textContent = "You Lost!"
        document.getElementById("summary").style.color = "red"
        gotBJ = false
        inGame = false
    }

}

btnNewCard.addEventListener(("click"), () => {

    if (inGame === true && gotBJ === false){
        let newCard = { 
            value: value[getRandomValue(value)],
            symbol: symbol[getRandomValue(symbol)],
            color: color[getRandomValue(color)]
        }

        if (newCard.symbol === "♥" || newCard.symbol === "♦" ) {
            newCard.color = "red"
        }else {
            newCard.color = "black"
        }

        if (newCard.value === "K" || newCard.value === "Q" || newCard.value === "J"){
            newCard.value = 10
        }else if (newCard.value === "A"){
            newCard.value = 11
        }else {
            newCard.value
        }
        cardObject.push(newCard)   
        cardBox.innerHTML += `
            <div id="card2" class="card" style="background: #fff; color:${newCard.color} ;">
                <div class="card-value">
                    <h3 class="card-number2">${newCard.value}</h3>
                    <p class="card-symbol2">${newCard.symbol}</p>
                </div>
                <div class="card-value card-symbol2">${newCard.symbol}</div>
                <div class="card-value">
                    <h3 class="card-number2">${newCard.value}</h3>
                    <p class="card-symbol2">${newCard.symbol}</p>
                </div>
            </div>
        `
    
        sum = sum + newCard.value
        document.getElementById("total-score").textContent = "Total Score: " + sum + "pts"
        summary()
    }
})


btnNewGame.addEventListener(("click"), () => {
    location.reload(); 
})

