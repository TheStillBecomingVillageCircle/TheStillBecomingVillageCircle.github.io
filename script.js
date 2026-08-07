// ======================================
// The Bubble Companion
// The Still Becoming Village Circle
// ======================================

document.addEventListener("DOMContentLoaded", () => {

const bubble = document.createElement("div");
bubble.id = "bubbleCompanion";

const messages = [
"🫧 It's okay to be here.",
"🌱 Honor your pace.",
"💚 There is room for you here.",
"🧭 Curiosity is welcome.",
"✨ You belong before you bloom.",
"🌊 Move at the speed of trust."
];

let current = 0;

bubble.innerHTML = `
<div class="bubbleText">${messages[current]}</div>
`;

document.body.appendChild(bubble);

const bubbleText = bubble.querySelector(".bubbleText");

// Change message every 8 seconds
setInterval(() => {
    current++;
    if(current >= messages.length){
        current = 0;
    }
    bubbleText.innerHTML = messages[current];
},8000);

// Tap / Click Bubble
bubble.addEventListener("click", () => {

    bubbleText.style.transform = "scale(.92)";

    setTimeout(() => {
        bubbleText.style.transform = "scale(1)";
    },150);

    alert(
`🫧 Today's Becoming Message

You don't have to have it all together to belong here.

Take what you need.
Leave what you don't.
Come back whenever you need to.`
    );

});

// Desktop
if(window.matchMedia("(pointer:fine)").matches){

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let bubbleX = mouseX;
let bubbleY = mouseY;

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX+25;
mouseY=e.clientY-25;

});

function animate(){

bubbleX+=(mouseX-bubbleX)*0.08;
bubbleY+=(mouseY-bubbleY)*0.08;

bubble.style.left=bubbleX+"px";
bubble.style.top=bubbleY+"px";

requestAnimationFrame(animate);

}

animate();

}

// iPad / Phone
else{

let x = 40;
let y = 160;

let dx = 1;
let dy = .7;

function floatBubble(){

x += dx;
y += dy;

if(x > window.innerWidth-240 || x < 20){
dx *= -1;
}

if(y > window.innerHeight-140 || y < 90){
dy *= -1;
}

bubble.style.left = x + "px";
bubble.style.top = y + "px";

requestAnimationFrame(floatBubble);

}

floatBubble();

}

});
