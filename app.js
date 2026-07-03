const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

// ---------------- USER ----------------

const user = tg.initDataUnsafe?.user;

const username = document.getElementById("username");
const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const energyFill = document.getElementById("energyFill");
const coin = document.getElementById("coin");

if (username) {
    username.innerText =
        user?.first_name ||
        user?.username ||
        "Player";
}

// ---------------- GAME ----------------

const MAX_ENERGY = 1000;

let score = Number(localStorage.getItem("score")) || 0;
let energy = Number(localStorage.getItem("energy")) || MAX_ENERGY;

function updateUI() {

    scoreEl.textContent = score;
    energyEl.textContent = energy;

    energyFill.style.width =
        (energy / MAX_ENERGY) * 100 + "%";

    localStorage.setItem("score", score);
    localStorage.setItem("energy", energy);

}

updateUI();

// ---------------- +1 ----------------

function showPlusOne(x, y) {

    const plus = document.createElement("div");

    plus.className = "plus-one";

    plus.innerHTML = "+1";

    plus.style.left = x + "px";
    plus.style.top = y + "px";

    document.body.appendChild(plus);

    setTimeout(() => {

        plus.remove();

    }, 800);

}

// ---------------- COIN ----------------

coin.addEventListener("pointerdown", () => {

    coin.style.transform = `
        perspective(900px)
        rotateX(15deg)
        rotateY(-15deg)
        scale(.93)
    `;

});

coin.addEventListener("pointerup", () => {

    coin.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;

});

coin.addEventListener("pointerleave", () => {

    coin.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;

});

// ---------------- CLICK ----------------

coin.addEventListener("pointerdown", (event) => {

    if (energy <= 0) return;

    score++;
    energy--;

    updateUI();

    showPlusOne(event.clientX, event.clientY);

    if (navigator.vibrate) navigator.vibrate(15);

    if (tg.HapticFeedback)
        tg.HapticFeedback.impactOccurred("light");

});

    }

    if (tg.HapticFeedback) {

        tg.HapticFeedback.impactOccurred("light");

    }

});

// ---------------- ENERGY REGEN ----------------

setInterval(() => {

    if (energy < MAX_ENERGY) {

        energy++;

        updateUI();

    }

}, 1000);
