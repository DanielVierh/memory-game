let emojiArray = [];
let toggleAmount = 0;
let valuePairs = 8;
let totalDiscovered = 0;
let cards = [];
let card1 = "";
let card2 = "";
let emoji1 = "";
let emoji2 = "";
let points = 5;
let combo = 0;
let degreeOfDifficulty = "";
let emojiPack = "";
let emojiPack1 = ["🐠","🐠","🐙","🐙","🐢","🐢","🐳","🐳","🦈","🦈","🐬","🐬","🐚","🐚","🐡","🐡","🐊","🐊","🐋","🐋","🐟","🐟","🐸","🐸"];
let emojiPack2 = ["😃","😃","😅","😅","😍","😍","😴","😴","😷","😷","😎","😎","🤓","🤓","😱","😱","👿","👿","👻","👻","👽","👽","🤖","🤖"];
let emojiPack3 = ["🦀","🦀","🦂","🦂","☄️","☄️","🌋","🌋","🐢","🐢","🐊","🐊","🦎","🦎","🐍","🐍","🐲","🐲","🐉","🐉","🦕","🦕","🦖","🦖"];
let emojiPack4 = ["🍳","🍳","🍕","🍕","🍟","🍟","🍔","🍔","🍗","🍗","🥗","🥗","🥥","🥥","🍓","🍓","🍎","🍎","🥦","🥦","🍋","🍋","🍉","🍉"];
let emojiPack5 = ["🚗","🚗","🛵","🛵","🚆","🚆","⛵️","⛵️","🚢","🚢","🚁","🚁","🚜","🚜","🚓","🚓","🚛","🚛","🚒","🚒","🚑","🚑","🚕","🚕",]
let arrayLength = 0;
let countdown = 100;
let gameStarted = false;
let sieg = false;
let seconds = 0;
let averageTime = 100;
const outputBox = document.getElementById("output");
let showEmojis = true;

// #########################################################################
// Start
// #########################################################################
window.onload = init;


// #########################################################################
// Flip-Animation bei Klick auf die Karte
// #########################################################################
const flipCards = document.querySelectorAll('.buttonCard');
flipCards.forEach((flipCard) => {
    flipCard.addEventListener('click', () => {
        flipCard.classList.add('active');
    })
})

// löscht bei jeder Karte die Klasse active
function removeActiveClasses() {
    flipCards.forEach((flipCard) => {
        flipCard.classList.remove('active');
    })
}

// #########################################################################
// Gespeicherte Werte laden
// #########################################################################
function getData() {
    // Theme Package
    if(localStorage.getItem('storedEmojiPack') === null) {
        emojiPack = "pack1"
    }else {
        emojiPack = JSON.parse(localStorage.getItem("storedEmojiPack"));
    }

    //Mode
    if(localStorage.getItem('storedMode') === null) {
        degreeOfDifficulty = "medium"
    }else {
        degreeOfDifficulty = JSON.parse(localStorage.getItem("storedMode"));
    }

    // Show Emojis 
    if(localStorage.getItem('storedShowEmojiVal') === null) {
        showEmojis = true;
    }else {
        showEmojis = JSON.parse(localStorage.getItem("storedShowEmojiVal"));
    }
}




function assignPackage() {
    if(emojiPack == "pack1") {
        emojiArray = emojiPack1;
    }else if(emojiPack == "pack2") {
        emojiArray = emojiPack2;
    }else if(emojiPack == "pack3") {
        emojiArray = emojiPack3;
    }else if(emojiPack == "pack4") {
        emojiArray = emojiPack4;
    }else if(emojiPack == "pack5") {
        emojiArray = emojiPack5;
    }
    assignArrayLength();
    assignValues();
}

function assignArrayLength() {
    if(degreeOfDifficulty == "veryEasy") {
        arrayLength = 8;
        averageTime = 20;
    }else if(degreeOfDifficulty == "easy") {
        arrayLength = 12;
        averageTime = 35;
    }else if(degreeOfDifficulty == "medium") {
        arrayLength = 16;
        averageTime = 60;
    }else if(degreeOfDifficulty == "hard") {
        arrayLength = 24;
        averageTime = 100;
    }else if(degreeOfDifficulty == "veryHard") {
        arrayLength = 24;
        averageTime = 100;
        points = 20;
        document.getElementById("countdown").innerHTML = countdown + " Sekunden";
    }
    valuePairs = arrayLength / 2;
}

class Card{
    constructor(cardID, emoji) {
        this.cardID = cardID;
        this.emoji = emoji;
    }
}

// #########################################################################
// Init Function <<Programmstart>>
// #########################################################################
function init () {
    getData();
    assignPackage();
    }

// #########################################################################
// Den Karten einen Wert zuweisen
// #########################################################################
function assignValues() {
    shuffle(emojiArray);
    for (let i = 0; i < arrayLength; i++) {
        let crdID = "card" + i;
        let emj = emojiArray[i];
        cards.push(new Card(crdID,emj));
    }
    showAllCards();
}

// #########################################################################
//Shuffle Cards
// #########################################################################
function shuffle(arr) {
    for (let i = arrayLength - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// #########################################################################
// Karten am Anfang kurz zeigen
// #########################################################################
function showAllCards() {
    if(showEmojis === true){
        disableButtons();
        for(let i = 0; i< arrayLength; i++){
            document.getElementById(`card${i}`).innerText = cards[i].emoji;
        }
        setTimeout(() => {
            for(let i = 0; i< arrayLength; i++){
                document.getElementById(`card${i}`).innerText = "♠️";
            }
            enableButtons();
        }, 5000);
    }
}



// #########################################################################
// Aufdecken
// #########################################################################
function toggleCard(id) {
    setTimeout(() => {
        // ? Countdown starten & Spiel starten bei Hard-Mode
        if (gameStarted == false && degreeOfDifficulty == "veryHard") {
            runCountdown();
            countTime();
            gameStarted = true;
            // ? Countdown starten bei allen anderen Schwierigkeitsstufen
        }else if(gameStarted == false) {
            countTime();
            gameStarted = true;
        }
        // ? Aufgedeckte Karten werden gezählt.
        toggleAmount ++;
        if(toggleAmount < 2) {
            card1 = id;
            // ? Hole Wert aus Array Cards
            let currentEmoji = searchCard(id);
            emoji1 = currentEmoji;
            document.getElementById(id).innerText = currentEmoji;
        }else if(toggleAmount < 3) {
            if(card1 != id) {
                card2 = id;
                // Hole Wert aus Array Cards
                let currentEmoji = searchCard(id);
                document.getElementById(id).innerText = currentEmoji;
                emoji2 = currentEmoji;
                checkMatch();
            }else{
                toggleAmount --;
            }
        }else{
            // Cover Cards
            //coverCards();
        }
    }, 200);
}

// #########################################################################
// Sucht Emoji und weist diese zu
// #########################################################################
function searchCard(cardID) {
    for(let i = 0; i < cards.length; i++) {
        if (cards[i].cardID == cardID) {
            return cards[i].emoji;
        }
    }
}

// #########################################################################
// Match checken
// #########################################################################
function checkMatch() {
    let newPoints = 0;
    // Wenn beide Karten identisch sind
    if (emoji1 === emoji2) {
        points += 5;
        newPoints += 5;
        combo ++;
        outputBox.innerHTML = points + " Punkte (+5 Punkte)";
        // Combo
        if(combo == 2) {
            points += 2;
            newPoints += 2;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br>  +2 Zweifach Combo)";
        }else if(combo == 3) {
            points += 4;
            newPoints += 4;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +3 Dreifach Combo)";
        }else if (combo > 3) {
            points += 6;
            newPoints += 6;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +5 Super Combo)";
        }
        animateRightCard(newPoints);
        // Disabled etc
        document.getElementById(card1).disabled = true;
        document.getElementById(card2).disabled = true;
        totalDiscovered ++
        toggleAmount = 0;
        card1 = "";
        card2 = "";
        emoji1 = "";
        emoji2 = "";
        if(totalDiscovered == valuePairs) {
            // Spiel gewonnen
            sieg = true;
            const additionalPoints = averageTime - seconds;
            points += additionalPoints;
            outputBox.innerHTML = `Gewonnen 🥳🥳🥳 \n Du hast ${points} Punkte erhalten.`
            createNotification('Gewonnen 😀😀😀 ' ,'success')
        }
    }else {
        points -= 2;
        if(points < 0) {
            points = 0;
            countdown = 0;
        }
        outputBox.innerHTML = points + " Punkte (-2 Punkte)";
        combo = 0;
        timeframe();
    }
}

// Markiert das gefundene Pärchen grün und entfernt die Active Klasse
// Löst die Pinktestand Animation aus
function animateRightCard(newPoints) {
    document.getElementById(card1).classList.add("right");
    document.getElementById(card1).classList.remove('active');
    document.getElementById(card2).classList.add("right");
    document.getElementById(card2).classList.remove('active');
    const animatedPointLabel = document.getElementById("frontLabel");
    animatedPointLabel.innerHTML = `+${newPoints} Punkte`;
    animatedPointLabel.classList.add("active");
    setTimeout(() => {
        animatedPointLabel.classList.remove("active");
    }, 2300);
}


function timeframe() {
    setTimeout(() => {
        coverCards();
    }, 2000);
}

// Verdecke Karten
function coverCards() {
    removeActiveClasses();
    document.getElementById(card1).innerText = "♠️";
    document.getElementById(card2).innerText = "♠️";
    card1 = "";
    card2 = "";
    emoji1 = "";
    emoji2 = "";
    toggleAmount = 0;
}

// #########################################################################
// Neustart
// #########################################################################
function restart() {
    location.reload();
}

// #########################################################################
// Zurück zum Menü
// #########################################################################
function backToManue() {
    window.location = "index.html"
}

// #########################################################################
// Bei Sehr schwer Countdown
// #########################################################################
function runCountdown() {

        setInterval(() => {
            if (countdown > 0){
                if(sieg === false){
                    countdown --;
                    document.getElementById("countdown").innerHTML = countdown + " Sekunden";
                }else{
                    let timeDuration = 100 - countdown;
                    document.getElementById("countdown").innerHTML = countdown + " Sekunden (" + timeDuration + " Sek. benötigt)";
                }

            }else {
                createNotification('Game Over 😔','alert')
                disableButtons();
            }
        }, 1000);
}

// #########################################################################
// Wenn Spiel beendet, Button sperren
// #########################################################################
function disableButtons() {
    for (let i = 0; i < arrayLength; i++) {
        document.getElementById("card" + i).disabled = true;
    }
}

function enableButtons() {
    for (let i = 0; i < arrayLength; i++) {
        document.getElementById("card" + i).disabled = false;
    }
}

function countTime() {
    setInterval(() => {
        if(sieg === false){
            seconds++;
        }
    }, 1000);
}

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const fullDate = `${addZero(day)}.${addZero(month)}.${addZero(year)}`;
    return fullDate;
}

function addZero(val) {
    if(val < 10) {
        val = `0${val}`;
    }
    return val;
}

//#########################################################################
// Toast Notification
//#########################################################################
const toasts = document.getElementById('toasts');
// Toast Notification
function createNotification(message, messageType) {
    // Erstelle Div
    const notifi = document.createElement('div');
    // Füge Klasse hinzu
    notifi.classList.add('toast'); // Messagebox
    notifi.classList.add(messageType); // Messagetypes: alert, info, modal, success
    // Textmessage hinzufügen
    notifi.innerText = message;
    // Dem Toastcontainer das erstelle Toast hinzufügen
    toasts.appendChild(notifi);

    // Nachricht nach festgelegter Zeit wieder entfernen
    setTimeout(() => {
        notifi.remove();
    }, 10000);
}

createNotification('Hallo! \n Los gehts 😀', 'info');
