const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const user = tg.initDataUnsafe?.user;

const username = document.getElementById("username");
const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const coin = document.getElementById("coin");

if (username) {
    username.innerText = user?.first_name || user?.username || "Player";
}

let score = Number(localStorage.getItem("score")) || 0;
let energy = Number(localStorage.getItem("energy")) || 1000;

const MAX_ENERGY = 1000;

function updateUI() {
    if (scoreEl) scoreEl.innerText = score;
    if (energyEl) energyEl.innerText = energy;

    localStorage.setItem("score", score);
    localStorage.setItem("energy", energy);
}

updateUI();

function showPlusOne(x, y) {

    const plus = document.createElement("div");

    plus.className = "plus-one";
    plus.innerText = "+1";

    plus.style.left = x + "px";
    plus.style.top = y + "px";

    document.body.appendChild(plus);

    setTimeout(() => {
        plus.remove();
    }, 800);

}

coin.addEventListener("pointerdown", () => {

    coin.style.transition = "transform .08s";

    coin.style.transform = `
        perspective(900px)
        rotateX
