const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe?.user;
const username = document.getElementById("username");

if (user) {
    username.innerText = user.first_name || user.username || "Player";
} else {
    username.innerText = "Player";
}

let score = Number(localStorage.getItem("score")) || 0;
let energy = Number(localStorage.getItem("energy")) || 1000;

const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const coin = document.getElementById("coin");

function updateUI() {
    scoreEl.innerText = score;
    energyEl.innerText = energy;

    localStorage.setItem("score", score);
    localStorage.setItem("energy", energy);
}

updateUI();

// کلیک روی سکه
coin.addEventListener("click", () => {

    if (energy <= 0) return;

    score++;
    energy--;

    updateUI();

    if (navigator.vibrate) {
        navigator.vibrate(20);
    }

    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred("light");
    }

});

// انیمیشن فشرده شدن
coin.addEventListener("pointerdown", () => {

    coin.style.transform =
        "perspective(900px) rotateX(18deg) rotateY(-18deg) scale(0.94)";

});

// برگشت به حالت عادی
coin.addEventListener("pointerup", () => {

    coin.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";

});

// شارژ انرژی
setInterval(() => {

    if (energy < 1000) {
        energy++;
        updateUI();
    }

}, 1000);
