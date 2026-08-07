// ================================
// The Bubble Companion
// The Still Becoming Village Circle
// ================================

document.addEventListener("DOMContentLoaded", () => {

    // Create the bubble
    const bubble = document.createElement("div");
    bubble.id = "bubbleCompanion";
    bubble.innerHTML = `
        <div class="bubbleText">
            🫧 It's okay to be here.
        </div>
    `;

    document.body.appendChild(bubble);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let bubbleX = mouseX;
    let bubbleY = mouseY;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX + 30;
        mouseY = event.clientY - 30;
    });

    function animateBubble() {

        bubbleX += (mouseX - bubbleX) * 0.08;
        bubbleY += (mouseY - bubbleY) * 0.08;

        bubble.style.left = bubbleX + "px";
        bubble.style.top = bubbleY + "px";

        requestAnimationFrame(animateBubble);

    }

    animateBubble();

});
