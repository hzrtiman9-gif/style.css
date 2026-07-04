// ==============================
// CoinTC Mini App
// app.js
// ==============================

// Telegram WebApp
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();

    const user = tg.initDataUnsafe?.user;

    if (user) {
        document.getElementById("username").innerHTML =
            user.first_name + (user.last_name ? " " + user.last_name : "");
    } else {
        document.getElementById("username").innerHTML = "Guest";
    }
}

// ==============================

let balance = 0;

let energy = 100;

const MAX_ENERGY = 100;

const balanceText = document.getElementById("balance");

const energyText = document.getElementById("energyValue");

const energyBar = document.getElementById("energyBar");

const coin = document.getElementById("coin");

// ==============================

function updateUI() {

    balanceText.innerHTML = balance.toLocaleString();

    energyText.innerHTML =
        energy + " / " + MAX_ENERGY;

    energyBar.style.width =
        energy + "%";

}

updateUI();

// ==============================

coin.onclick = () => {

    if (energy <= 0)
        return;

    balance++;

    energy--;

    updateUI();

    // انیمیشن ضربه

    coin.style.transform =
        "scale(.88) rotate(-8deg)";

    setTimeout(() => {

        coin.style.transform =
            "scale(1)";

    },120);

    // ویبره تلگرام

    if (tg) {

        tg.HapticFeedback.impactOccurred("light");

    }

};

// ==============================

// بازیابی انرژی

setInterval(()=>{

    if(energy<MAX_ENERGY){

        energy++;

        updateUI();

    }

},2000);

// ==============================

// ذخیره محلی

function saveGame(){

    localStorage.setItem("coin_balance",balance);

    localStorage.setItem("coin_energy",energy);

}

// ==============================

function loadGame(){

    let b=localStorage.getItem("coin_balance");

    let e=localStorage.getItem("coin_energy");

    if(b){

        balance=parseInt(b);

    }

    if(e){

        energy=parseInt(e);

    }

    updateUI();

}

loadGame();

// ==============================

setInterval(saveGame,1000);

// ==============================

// نمایش پیام خوش‌آمدگویی

setTimeout(()=>{

    console.log("Welcome to CoinTC");

},500);

// ==============================

// صفحات منو (فعلاً نمونه)

document.querySelectorAll(".card").forEach(card=>{

    card.onclick=()=>{

        alert(card.innerText);

    }

});

// ==============================

// ناوبری پایین

document.querySelectorAll(".nav").forEach(btn=>{

    btn.onclick=()=>{

        document
        .querySelectorAll(".nav")
        .forEach(n=>n.classList.remove("active"));

        btn.classList.add("active");

    }

});

// ==============================

console.log("CoinTC Loaded");
