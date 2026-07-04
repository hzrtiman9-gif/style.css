// ===============================
// CoinTC v1.0
// ===============================

const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// ---------- USER ----------

const user = tg.initDataUnsafe?.user;

const username = document.getElementById("username");
const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const energyFill = document.getElementById("energyFill");
const coin = document.getElementById("coin");

if (username) {
    username.textContent =
        user?.first_name ||
        user?.username ||
        "Player";
}

// ---------- DATA ----------

const MAX_ENERGY = 1000;

let score = Number(localStorage.getItem("score")) || 0;
let energy = Number(localStorage.getItem("energy")) || MAX_ENERGY;

// ---------- UI ----------

function updateUI() {

    scoreEl.textContent = score;

    energyEl.textContent =
        `${energy} / ${MAX_ENERGY}`;

    energyFill.style.width =
        `${(energy / MAX_ENERGY) * 100}%`;

    localStorage.setItem("score", score);
    localStorage.setItem("energy", energy);

}

updateUI();

// ---------- FLOATING +1 ----------

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

// ---------- COIN ANIMATION ----------

function pressCoin() {

    coin.style.transform = `
        perspective(900px)
        rotateX(15deg)
        rotateY(-15deg)
        scale(.93)
    `;

}

function releaseCoin() {

    coin.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;

}

coin.addEventListener("pointerdown", pressCoin);

coin.addEventListener("pointerup", releaseCoin);

coin.addEventListener("pointerleave", releaseCoin);

// ---------- TAP ----------

coin.addEventListener("click", (event) => {

    if (energy <= 0) return;

    score++;

    energy--;

    updateUI();

    showPlusOne(event.clientX, event.clientY);

    if (navigator.vibrate) {

        navigator.vibrate(15);

    }

    if (tg.HapticFeedback) {

        tg.HapticFeedback.impactOccurred("light");

    }

});

// ---------- ENERGY ----------

setInterval(() => {

    if (energy < MAX_ENERGY) {

        energy++;

        updateUI();

    }

}, 1000);

// ---------- MENU ----------

document.getElementById("homeBtn").onclick = () => {

    tg.showAlert("🏠 Home");

};

document.getElementById("boostBtn").onclick = () => {

    tg.showAlert("🚀 Boost Coming Soon");

};

document.getElementById("earnBtn").onclick = () => {

    tg.showAlert("💰 Earn Coming Soon");

};

document.getElementById("friendsBtn").onclick = () => {

    tg.showAlert("👥 Friends Coming Soon");

};

document.getElementById("taskBtn").onclick = () => {

    tg.showAlert("📋 Tasks Coming Soon");

};
