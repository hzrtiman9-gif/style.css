const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();
const user = tg.initDataUnsafe?.user;

const username = document.getElementById("username");

if(user){

    username.innerText =
        user.first_name ||
        user.username ||
        "Player";

}else{

    username.innerText = "Player";

}
let score = Number(localStorage.getItem("score")) || 0;
let energy = Number(localStorage.getItem("energy")) || 1000;

const scoreEl = document.getElementById("score");
const energyEl = document.getElementById("energy");
const coin = document.getElementById("coin");

function updateUI(){
    scoreEl.innerText = score;
    energyEl.innerText = energy;

    localStorage.setItem("score",score);
    localStorage.setItem("energy",energy);
}

updateUI();

coin.addEventListener("click",(e)=>{

    if(energy<=0) return;

    score++;
    energy--;

    updateUI();

    if(navigator.vibrate){
        navigator.vibrate(20);
    }

    tg.HapticFeedback.impactOccurred("light");

    coin.style.transform="scale(.93)";

    setTimeout(()=>{
        coin.style.transform="scale(1)";
    },80);

    const plus=document.createElement("div");
    plus.className="floating";
    plus.innerText="+1";

    plus.style.left=e.pageX+"px";
    plus.style.top=e.pageY+"px";

    document.body.appendChild(plus);

    setTimeout(()=>{
        plus.remove();
    },800);

});

setInterval(()=>{

    if(energy<1000){

        energy++;

        updateUI();

    }

},1000);
const coin = document.getElementById("coin");

coin.addEventListener("pointerdown", () => {
    coin.style.transform =
        "perspective(900px) rotateX(18deg) rotateY(-12deg) translateY(12px) scale(.96)";
});

coin.addEventListener("pointerup", () => {
    coin.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
});
