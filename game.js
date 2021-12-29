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
let highscore = [];
let seconds = 0;
let averageTime = 100;


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
    if(localStorage.getItem('storedHighscore') != null) {
        highscore = JSON.parse(localStorage.getItem("storedHighscore"));
    }else{
        console.log("Noch kein Highscore Array");
        const veryEasyScore = new Highscore('-','veryEasy', 0);
        const easyScore = new Highscore('-','easy', 0);
        const mediumScore = new Highscore('-','medium', 0);
        const hardScore = new Highscore('-','hard', 0);
        const veryHardScore = new Highscore('-','veryHard', 0);
        highscore.push(veryEasyScore);
        highscore.push(easyScore);
        highscore.push(mediumScore);
        highscore.push(hardScore);
        highscore.push(veryHardScore);
        localStorage.setItem("storedHighscore", JSON.stringify(highscore));
        // console.log(highscore);
    }
}

class Highscore {
    constructor(name, level, points) {
        this.name = name;
        this.level = level;
        this.points = points;
    }
}

function checkScore() {
    let foundScore = false;

    for(let i = 0; i < highscore.length; i++) {
        if(highscore[i].points < points && highscore[i].level === degreeOfDifficulty) {
            foundScore = true;
            document.getElementById("output").innerHTML = `Gewonnen und den Highscore geknackt 🥇🎈 Du hast: ${seconds} Sekunden benötigt und ${points} Punkte erhalten`;
            const newHighscoreName = window.prompt(`Du hast den Highscore "${highscore[i].name}: ${highscore[i].points}" geknackt. Trage Deinen Namen ein:`);
            highscore[i].name = `${getDate()}- ${newHighscoreName}`;
            highscore[i].level = degreeOfDifficulty;
            highscore[i].points = points;
            localStorage.setItem("storedHighscore", JSON.stringify(highscore));
            return
        }
    }
    if(foundScore === false) {
        document.getElementById("output").innerHTML = `Gewonnen 🎈 Du hast: ${seconds} Sekunden benötigt. Du hast ${points} Punkte erhalten`;
    }
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

assignPackage();

// Den Karten einen Wert zuweisen
function assignValues() {
    shuffle(emojiArray);
    for (let i = 0; i < arrayLength; i++) {
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
    setTimeout(() => {
        if (gameStarted == false && degreeOfDifficulty == "veryHard") {
            runCountdown();
            countTime();
            gameStarted = true;
        }else if(gameStarted == false) {
            countTime();
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
    }, 400);
}

// Sucht Emoji und weist diese zu
function searchCard(cardID) {
    for(let i = 0; i < cards.length; i++) {
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
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 <br>  +2 Zweifach Combo)";
        }else if(combo == 3) {
            points += 4;
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +3 Dreifach Combo)";
        }else if (combo > 3) {
            points += 6;
            document.getElementById("output").innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +5 Super Combo)";
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
            const additionalPoints = averageTime - seconds;
            points += additionalPoints;
            checkScore();
        }
    }else {
        points -= 2;
        if(points < 0) {
            points = 0;
            //if(degreeOfDifficulty == "veryHard") {
                countdown = 0;
            // }
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
    removeActiveClasses();
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
    for (let i = 0; i < arrayLength; i++) {
        document.getElementById("card" + i).disabled = true;
    }
}

function countTime() {
    setInterval(() => {
        if(sieg == false){
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
