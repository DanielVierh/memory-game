
function chooseTheme1() {
    save_ThemePackage("pack1");
    colorizeButton("btn1");    
}

function chooseTheme2() {
    save_ThemePackage("pack2");
    colorizeButton("btn2");    
}

function chooseTheme3() {
    save_ThemePackage("pack3");
    colorizeButton("btn3");    
}

function chooseTheme4() {
    save_ThemePackage("pack4");
    colorizeButton("btn4");    
}

function chooseTheme5() {
    save_ThemePackage("pack5");
    colorizeButton("btn5");    
}

function colorizeButton(btn){
    for (var i = 1; i < 6 ; i++) {
        document.getElementById("btn" + i).style.backgroundColor = "rgba(0, 0, 0, 0.582)";
    }
    document.getElementById(btn).style.backgroundColor = "green";
}


// GOTO
function gotoVeryEasy() {
    save_Mode("veryEasy");
    window.location = "veryEasy.html"
}


function gotoEasy() {
    save_Mode("easy");
    window.location = "easy.html"
}


function gotoMMedium() {
    save_Mode("medium");
    window.location = "medium.html"
}


function gotoHard() {
    save_Mode("hard");
    window.location = "hard.html"
}


function gotoVeryHard() {
    save_Mode("veryHard");
    window.location = "veryHard.html"
}


function gotoSettings() {
    window.location = "settings.html"
}


// Speichere Werte
// Theme
function save_ThemePackage(theme) {
    localStorage.setItem("storedEmojiPack", JSON.stringify(theme));
    console.log("Package gespeichert", theme);
}

function save_Mode(mode) {
    localStorage.setItem("storedMode", JSON.stringify(mode));
    console.log("Mode gespeichert", mode);
}


// Zurück zum Menü
function backToManue() {
    window.location = "index.html"
}

