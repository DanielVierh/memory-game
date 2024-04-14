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
let life = 5;

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
    const seconds_show_length = 30;
    let counter = seconds_show_length;
    if(showEmojis === true){
        disableButtons();
        for(let i = 0; i< arrayLength; i++){
            document.getElementById(`card${i}`).innerText = cards[i].emoji;
        }

        setInterval(() => {
            if(counter >0) {
                counter--;
                createNotification(`Noch ${counter} Sekunden`, 'info', 1000);
            }
        }, 1000);

        setTimeout(() => {
            for(let i = 0; i< arrayLength; i++){
                document.getElementById(`card${i}`).innerText = "♠️";
            }
            enableButtons();
            createNotification('Let´s go', 'info', 3000)
        }, (seconds_show_length * 1000));
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
    // Wenn beide Karten identisch sind
    if (emoji1 === emoji2) {
        points += 5;
        combo ++;
        outputBox.innerHTML = points + " Punkte (+5 Punkte)";
        animateRightCard();
        // Combo
        if(combo == 2) {
            points += 2;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br>  +2 Zweifach Combo)";
        }else if(combo == 3) {
            points += 4;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +3 Dreifach Combo)";
        }else if (combo > 3) {
            points += 6;
            outputBox.innerHTML = points + " Punkte (+5 Punkte 🤩 <br> +5 Super Combo)";
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
            // Spiel gewonnen
            sieg = true;
            const additionalPoints = averageTime - seconds;
            points += additionalPoints;
            outputBox.innerHTML = `Gewonnen 🥳🥳🥳 \n Du hast ${points} Punkte erhalten.`
            createNotification('Gewonnen 😀😀😀 ' ,'success', 10000)
            show_confetti_modal();
            trigger_confetti();
        }
    }else {
        if(showEmojis === true){
            life--;
            timeframe();
            createNotification(`${life}/5 Leben`,'alert', 3000)
            if(life === 0) {
                createNotification('Game Over 😔','alert', 10000)
                disableButtons();
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
}

// Markiert das gefundene Pärchen grün und entfernt die Active Klasse
function animateRightCard() {
    document.getElementById(card1).classList.add("right");
    document.getElementById(card1).classList.remove('active');
    document.getElementById(card2).classList.add("right");
    document.getElementById(card2).classList.remove('active');
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
                createNotification('Game Over 😔','alert', 10000)
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
function createNotification(message, messageType, show_time) {
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
    }, show_time);
}

//* #########################################################################
//* Modal for confetti
//* #########################################################################

const canvas = document.querySelector('.confetti-modal');
let canvas_is_visible = false;
let particleArray = [];
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener('resize', ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


//* class
class Particle {
    constructor(color) {
        this.color = color;
        this.x = Math.random() * canvas.width;
        this.y =  0;
        this.size = Math.random() * 7 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 3 - 0.9;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * Math.random() * 3);
        ctx.fill();
    }
}

function show_confetti_modal() {
    if(!canvas_is_visible) {
        canvas.classList.add('active');
        canvas_is_visible = true;
    }else {
        canvas.classList.remove('active');
        canvas_is_visible = false;
    }
}

function trigger_confetti() {
    const colors = ['red', 'green', 'yellow', 'blue', 'lightgreen'];
    for(let i = 0; i < 1000; i++) {
        const randomInt = parseInt(Math.random() * colors.length);
        particleArray.push(new Particle(colors[randomInt]))
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();

function handleParticles() {
    for(let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        if(particleArray[i].y >= canvas.height || particleArray[i].y <= 0 || particleArray[i].x >= canvas.width || particleArray[i].x <= 0){
            particleArray.splice(i, 1);
            i--;
        }
    }
}

//* Test
show_confetti_modal();
trigger_confetti();