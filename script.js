/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   Shared Site Script
========================================================= */


/* =========================================================
   FLOATING BECOMING MESSAGES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const bubble =
            document.getElementById(
                "floatingMessageBubble"
            );

        const messageText =
            document.getElementById(
                "floatingMessageText"
            );


        /*
            If this particular page doesn't contain
            the floating bubble, simply do nothing.
        */

        if (
            !bubble ||
            !messageText
        ) {
            return;
        }


        const messages = [

            "🫧 You belong before you bloom.",

            "🫧 Healing isn't linear.",

            "🫧 Rest is productive.",

            "🫧 Curiosity creates connection.",

            "🫧 Becoming takes courage.",

            "🫧 It's okay to begin again.",

            "🫧 You are allowed to change.",

            "🫧 You don't have to rush becoming.",

            "🫧 Your next step is enough.",

            "🫧 Curiosity can lead somewhere beautiful.",

            "🫧 You are allowed to learn yourself again.",

            "🫧 There is room for who you're becoming."

        ];


        let messageIndex = 0;


        let x = 12;
        let y = 62;


        let targetX = 12;
        let targetY = 62;


        let nextMoveTime =
            Date.now() + 3500;



        /* =====================================================
           FIRST APPEARANCE
        ===================================================== */

        setTimeout(
            function () {

                bubble.classList.add(
                    "visible"
                );

            },
            1200
        );



        /* =====================================================
           CHANGE MESSAGE
           
           Slowly.
           No frantic motivational-speaker behavior. 😂
        ===================================================== */

        setInterval(
            function () {

                bubble.classList.remove(
                    "visible"
                );


                setTimeout(
                    function () {

                        messageIndex =
                            (
                                messageIndex + 1
                            )
                            %
                            messages.length;


                        messageText.textContent =
                            messages[
                                messageIndex
                            ];


                        bubble.classList.add(
                            "visible"
                        );

                    },
                    1800
                );

            },
            9000
        );



        /* =====================================================
           CHOOSE NEW LOCATION
        ===================================================== */

        function chooseNewPosition() {

            const bubbleWidth =
                bubble.offsetWidth ||
                180;


            const bubbleHeight =
                bubble.offsetHeight ||
                55;


            const widthPercent =
                (
                    bubbleWidth /
                    window.innerWidth
                )
                *
                100;


            const heightPercent =
                (
                    bubbleHeight /
                    window.innerHeight
                )
                *
                100;


            const maxX =
                Math.max(
                    20,
                    92 - widthPercent
                );


            const maxY =
                Math.max(
                    25,
                    88 - heightPercent
                );


            targetX =
                8 +
                Math.random()
                *
                (
                    maxX - 8
                );


            targetY =
                18 +
                Math.random()
                *
                (
                    maxY - 18
                );

        }



        /* =====================================================
           SLOW FLOATING MOVEMENT
        ===================================================== */

        function animate() {

            const ease =
                0.0045;


            x +=
                (
                    targetX - x
                )
                *
                ease;


            y +=
                (
                    targetY - y
                )
                *
                ease;


            bubble.style.left =
                x + "%";


            bubble.style.top =
                y + "%";


            if (
                Date.now() >
                nextMoveTime
            ) {

                chooseNewPosition();


                nextMoveTime =
                    Date.now()
                    +
                    9000
                    +
                    Math.random()
                    *
                    5000;

            }


            requestAnimationFrame(
                animate
            );

        }



        chooseNewPosition();

        animate();

    }
);



/* =========================================================
   GENERAL MUSIC BUBBLE SUPPORT
========================================================= */

function openMusic() {

    const bubble =
        document.getElementById(
            "musicBubble"
        );


    if (!bubble) {
        return;
    }


    bubble.classList.add(
        "music-open"
    );

}



function closeMusic() {

    const bubble =
        document.getElementById(
            "musicBubble"
        );


    if (!bubble) {
        return;
    }


    bubble.classList.remove(
        "music-open"
    );

}



/* =========================================================
   OPTIONAL: CLOSE MUSIC WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeMusic();

        }

    }
);



/* =========================================================
   OPTIONAL: GENTLE PAGE FADE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        document.body.classList.add(
            "page-ready"
        );

    }
);
