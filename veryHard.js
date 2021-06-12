

var emojiArray = ["🐠","🐠","🐙","🐙","🐢","🐢","🐳","🐳","🦈","🦈","🐬","🐬","🐚","🐚","🐡","🐡","🐊","🐊","🐋","🐋","🐟","🐟","🐸","🐸"];
var toggleAmount = 0;
const valuePairs = 12;
var totalDiscovered = 0;
var cards = [];
var card1 = "";
var card2 = "";
var emoji1 = "";
var emoji2 = "";

class Card{
    constructor(cardID, emoji) {
        this.cardID = cardID;
        this.emoji = emoji;
    }
}

assignValues();

// Den Karten einen Wert zuweisen
function assignValues() {
    shuffle(emojiArray);
    for (var i = 0; i < emojiArray.length; i++) {
        let crdID = "card" + i;
        let emj = emojiArray[i];
        cards.push(new Card(crdID,emj));
    }
}


//Shuffle
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// Aufdecken
function toggleCard(id) {
    toggleAmount ++;
    if(toggleAmount < 2) {
        card1 = id;
        // Hole Wert aus Array Cards
        let currentEmoji = searchCard(id);
        emoji1 = currentEmoji;
        document.getElementById(id).innerText = currentEmoji;
    }else if(toggleAmount < 3) {
        card2 = id;
        // Hole Wert aus Array Cards
        let currentEmoji = searchCard(id);
        document.getElementById(id).innerText = currentEmoji;
        emoji2 = currentEmoji;
        checkMatch();
    }else{
        // Cover Cards
        coverCards();
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
        document.getElementById("output").innerHTML = "Super 😃";
        document.getElementById(card1).disabled = true;
        document.getElementById(card2).disabled = true;
        totalDiscovered ++
        toggleAmount = 0;
        card1 = "";
        card2 = "";
        emoji1 = "";
        emoji2 = "";
        if(totalDiscovered == valuePairs) {
            document.getElementById("output").innerHTML = "Gewonnen 🥳🥳🥳";
        }
    }else {
        document.getElementById("output").innerHTML = "Schade 🙁";
    }
}

// Verdecke Karten
function coverCards() {
    document.getElementById(card1).innerText = "?";
    document.getElementById(card2).innerText = "?";
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