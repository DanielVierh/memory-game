var emojiArray = [];
var toggleAmount = 0;
var valuePairs = 8;
var totalDiscovered = 0;
var cards = [];
var card1 = "";
var card2 = "";
var emoji1 = "";
var emoji2 = "";
var points = 5;
var combo = 0;
var degreeOfDifficulty = "";
var emojiPack = "";
let emojiPack1 = ["🐠","🐠","🐙","🐙","🐢","🐢","🐳","🐳","🦈","🦈","🐬","🐬","🐚","🐚","🐡","🐡","🐊","🐊","🐋","🐋","🐟","🐟","🐸","🐸"];
let emojiPack2 = ["😃","😃","😅","😅","😍","😍","😴","😴","😷","😷","😎","😎","🤓","🤓","😱","😱","👿","👿","👻","👻","👽","👽","🤖","🤖"];
let emojiPack3 = ["🦀","🦀","🦂","🦂","☄️","☄️","🌋","🌋","🐢","🐢","🐊","🐊","🦎","🦎","🐍","🐍","🐲","🐲","🐉","🐉","🦕","🦕","🦖","🦖"];
let emojiPack4 = ["🍳","🍳","🍕","🍕","🍟","🍟","🍔","🍔","🍗","🍗","🥗","🥗","🥥","🥥","🍓","🍓","🍎","🍎","🥦","🥦","🍋","🍋","🍉","🍉"];
let emojiPack5 = ["🚗","🚗","🛵","🛵","🚆","🚆","⛵️","⛵️","🚢","🚢","🚁","🚁","🚜","🚜","🚓","🚓","🚛","🚛","🚒","🚒","🚑","🚑","🚕","🚕",]
var arrayLength = 0;
var countdown = 100;
var gameStarted = false;
var sieg = false;


// Gespeicherte Werte laden
function getData() {
    // Theme Package
    if(localStorage.getItem('storedEmojiPack') === null) {
        console.log("Kein  Emojipack");
        emojiPack = "pack1"
    }else {
        
        emojiPack = JSON.parse(localStorage.getItem("storedEmojiPack"));
        console.log("Pack wird geladen", emojiPack);
    }

    //Mode
    if(localStorage.getItem('storedMode') === null) {
        console.log("Kein  Mode");
        degreeOfDifficulty = "medium"
    }else {
        
        degreeOfDifficulty = JSON.parse(localStorage.getItem("storedMode"));
        console.log("Mode wird geladen", degreeOfDifficulty);
    }
    // Highscore
}



getData();

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
    }else if(degreeOfDifficulty == "easy") {
        arrayLength = 12;
    }else if(degreeOfDifficulty == "medium") {
        arrayLength = 16;
    }else if(degreeOfDifficulty == "hard") {
        arrayLength = 24;
    }else if(degreeOfDifficulty == "veryHard") {
        arrayLength = 24;
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

assignPackage();

// Den Karten einen Wert zuweisen
function assignValues() {
    shuffle(emojiArray);
    for (var i = 0; i < arrayLength; i++) {
        let crdID = "card" + i;
        let emj = emojiArray[i];
        cards.push(new Card(crdID,emj));
        console.log("Karte: ", crdID + " Emoji:", emj);
    }
}


//Shuffle
function shuffle(a) {
    for (let i = arrayLength - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// Aufdecken
function toggleCard(id) {
    if (gameStarted == false && degreeOfDifficulty == "veryHard") {
        runCountdown();
        gameStarted = true;
    }
    toggleAmount ++;
    if(toggleAmount < 2) {
        card1 = id;
        // Hole Wert aus Array Cards
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
}

// Sucht Emoji und weist diese zu
function searchCard(cardID) {
    for(var i = 0; i < cards.length; i++) {
        if (cards[i].cardID == cardID) {
            return cards[i].emoji;
        }
    }
}


// Match checken
function checkMatch() {
    if (emoji1 == emoji2) {
        points += 5;
        combo ++;
        document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte)";
        // Combo
        if(combo == 2) {
            points += 2;
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 +2 Zweifach Combo)";
        }else if(combo == 3) {
            points += 4;
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 +3 Dreifach Combo)";
        }else if (combo > 3) {
            points += 6;
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 +5 Super Combo)";
        }
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
            sieg = true;
            document.getElementById("output").innerHTML = "Gewonnen 🥳🥳🥳 mit " + points + " Punkten";
        }
    }else {
        points -= 2;
        if(points < 0) {
            points = 0;
            if(degreeOfDifficulty == "veryHard") {
                countdown = 0;
            }
        }
        document.getElementById("output").innerHTML = points + " Punkte (-2 Punkte)";
        combo = 0;
        timeframe();
    }
}

function timeframe() {
    setTimeout(() => {
        coverCards();
    }, 2000);
}

// Verdecke Karten
function coverCards() {
    document.getElementById(card1).innerText = "♠️";
    document.getElementById(card2).innerText = "♠️";
    card1 = "";
    card2 = "";
    emoji1 = "";
    emoji2 = "";
    toggleAmount = 0;
}


// Neustart
function restart() {
    location.reload();
}

// Zurück zum Menü
function backToManue() {
    window.location = "index.html"
}


// Bei Sehr schwer Countdown
function runCountdown() {
    
        setInterval(() => {
            if (countdown > 0){
                if(sieg == false){
                    countdown --;
                    document.getElementById("countdown").innerHTML = countdown + " Sekunden";
                }else{
                    let timeDuration = 100 - countdown;
                    document.getElementById("countdown").innerHTML = countdown + " Sekunden (" + timeDuration + " Sek. benötigt)";
                }

            }else {
                document.getElementById("countdown").innerHTML = "Game Over";
                buttonSperren();
            }
        }, 1000); 
}


function buttonSperren() {
    for (var i = 0; i < arrayLength; i++) {
        document.getElementById("card" + i).disabled = true;
    }
}