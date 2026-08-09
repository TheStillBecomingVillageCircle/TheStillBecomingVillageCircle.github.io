/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   SITE-WIDE FLOATING BUBBLE
   =========================================================

   This script controls:
   • The clear/translucent floating bubble
   • The rotating Village messages
   • The bubble's free movement around the screen

   It does NOT control:
   • SoundCloud
   • The soundtrack record
   • Navigation
   • Page content
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       VILLAGE MESSAGES
    ===================================================== */

    const villageMessages = [

        "Honor your pace.",

        "You belong before you bloom.",

        "There is room for you here.",

        "Stay in presence.",

        "You don't have to know yet.",

        "Becoming takes time.",

        "Curiosity is allowed here.",

        "You are allowed to begin again.",

        "Let yourself be unfinished.",

        "Your becoming does not need permission.",

        "You can pause without disappearing.",

        "There is wisdom in wondering.",

        "You are still becoming.",

        "Make room for what is becoming.",

        "You don't have to rush the answer.",

        "Keep becoming.",

        "Come as you are.",

        "Your questions belong here.",

        "Growth does not always look loud.",

        "There is no deadline on becoming."

    ];


    /* =====================================================
       FIND EXISTING BUBBLE
    ===================================================== */

    let bubble =
        document.getElementById(
            "villageFloatingMessage"
        );


    /* =====================================================
       CREATE THE BUBBLE IF IT DOES NOT EXIST
    ===================================================== */

    if (!bubble) {

        bubble =
            document.createElement("div");

        bubble.id =
            "villageFloatingMessage";

        bubble.innerHTML = `

            <div
                id="villageMessageText"
                class="village-message-text"
            >
                Honor your pace.
            </div>

        `;

        document.body.appendChild(bubble);

    }


    /* =====================================================
       FIND MESSAGE TEXT
    ===================================================== */

    let messageText =
        document.getElementById(
            "villageMessageText"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!messageText) {

        messageText =
            document.createElement("div");

        messageText.id =
            "villageMessageText";

        messageText.className =
            "village-message-text";

        messageText.textContent =
            "Honor your pace.";

        bubble.appendChild(
            messageText
        );

    }


    /* =====================================================
       CREATE STYLES
    ===================================================== */

    if (
        !document.getElementById(
            "villageFloatingBubbleStyles"
        )
    ) {

        const style =
            document.createElement("style");

        style.id =
            "villageFloatingBubbleStyles";


        style.textContent = `

            /* =============================================
               TRUE FLOATING BUBBLE
            ============================================= */

            #villageFloatingMessage {

                position: fixed;

                left: 0;

                top: 0;

                width: max-content;

                max-width: 300px;

                min-height: 58px;

                padding:
                    15px 26px;

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                text-align:
                    center;


                /* -----------------------------------------
                   CLEAR / TRANSLUCENT BUBBLE
                ----------------------------------------- */

                background:

                    radial-gradient(
                        circle at 27% 21%,

                        rgba(
                            255,
                            255,
                            255,
                            0.58
                        )
                        0%,

                        rgba(
                            255,
                            255,
                            255,
                            0.20
                        )
                        22%,

                        rgba(
                            198,
                            250,
                            246,
                            0.10
                        )
                        55%,

                        rgba(
                            255,
                            255,
                            255,
                            0.025
                        )
                        100%
                    );


                /* -----------------------------------------
                   IRIDESCENT EDGE
                ----------------------------------------- */

                border:
                    1.5px solid
                    rgba(
                        255,
                        255,
                        255,
                        0.75
                    );


                border-radius:
                    50%;


                /* -----------------------------------------
                   REAL BUBBLE DEPTH
                ----------------------------------------- */

                box-shadow:

                    inset
                    6px 6px 13px
                    rgba(
                        255,
                        255,
                        255,
                        0.60
                    ),

                    inset
                    -7px -8px 16px
                    rgba(
                        71,
                        183,
                        199,
                        0.10
                    ),

                    0 10px 28px
                    rgba(
                        55,
                        145,
                        153,
                        0.12
                    );


                /* -----------------------------------------
                   LET THE PAGE SHOW THROUGH
                ----------------------------------------- */

                backdrop-filter:
                    blur(2px);

                -webkit-backdrop-filter:
                    blur(2px);


                /* -----------------------------------------
                   POSITION / LAYER
                ----------------------------------------- */

                z-index:
                    9997;

                pointer-events:
                    none;


                /* -----------------------------------------
                   START HIDDEN
                ----------------------------------------- */

                opacity:
                    0;


                transform:
                    translate3d(
                        0,
                        0,
                        0
                    );


                transition:
                    opacity 0.8s ease;


                will-change:
                    transform;

            }


            /* =============================================
               NATURAL BUBBLE HIGHLIGHT
            ============================================= */

            #villageFloatingMessage::before {

                content:
                    "";

                position:
                    absolute;

                width:
                    16px;

                height:
                    16px;

                top:
                    9px;

                left:
                    17px;


                border-radius:
                    50%;


                background:
                    rgba(
                        255,
                        255,
                        255,
                        0.76
                    );


                filter:
                    blur(1px);


                opacity:
                    0.78;

            }


            /* =============================================
               SECONDARY IRIDESCENT REFLECTION
            ============================================= */

            #villageFloatingMessage::after {

                content:
                    "";

                position:
                    absolute;

                width:
                    7px;

                height:
                    7px;

                right:
                    18px;

                bottom:
                    12px;


                border-radius:
                    50%;


                background:
                    rgba(
                        169,
                        235,
                        239,
                        0.28
                    );


                filter:
                    blur(1px);

            }


            /* =============================================
               MESSAGE TEXT
            ============================================= */

            .village-message-text {

                position:
                    relative;

                z-index:
                    2;


                color:
                    #16a9ae;


                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;


                font-size:
                    16px;


                font-weight:
                    600;


                line-height:
                    1.35;


                white-space:
                    normal;


                text-shadow:
                    0 1px 3px
                    rgba(
                        255,
                        255,
                        255,
                        0.85
                    );


                transition:
                    opacity 0.5s ease;

            }


            /* =============================================
               MOBILE BUBBLE
            ============================================= */

            @media (max-width: 600px) {

                #villageFloatingMessage {

                    max-width:
                        250px;

                    min-height:
                        50px;

                    padding:
                        12px 20px;

                }


                .village-message-text {

                    font-size:
                        14px;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       MOVEMENT VARIABLES
    ===================================================== */

    let bubbleX =
        80;

    let bubbleY =
        180;


    let targetX =
        80;

    let targetY =
        180;


    let pauseUntil =
        0;


    /* =====================================================
       FIND SAFE SCREEN AREA
    ===================================================== */

    function getSafeArea() {

        const width =
            bubble.offsetWidth ||
            220;


        const height =
            bubble.offsetHeight ||
            60;


        const padding =
            14;


        const maxX =
            Math.max(
                padding,
                window.innerWidth -
                width -
                padding
            );


        const maxY =
            Math.max(
                padding,
                window.innerHeight -
                height -
                padding
            );


        return {

            maxX:
                maxX,

            maxY:
                maxY

        };

    }


    /* =====================================================
       CHOOSE A NEW LOCATION
    ===================================================== */

    function chooseNewDestination() {

        const safe =
            getSafeArea();


        targetX =
            Math.random()
            * safe.maxX;


        targetY =
            Math.random()
            * safe.maxY;


        pauseUntil =
            Date.now()
            +
            (
                800
                +
                Math.random()
                * 1800
            );

    }


    /* =====================================================
       MOVE BUBBLE SMOOTHLY
    ===================================================== */

    function moveBubble() {

        const now =
            Date.now();


        if (
            now >= pauseUntil
        ) {

            chooseNewDestination();

        }


        const differenceX =
            targetX -
            bubbleX;


        const differenceY =
            targetY -
            bubbleY;


        bubbleX +=
            differenceX *
            0.008;


        bubbleY +=
            differenceY *
            0.008;


        bubble.style.transform =
            `translate3d(
                ${bubbleX}px,
                ${bubbleY}px,
                0
            )`;


        requestAnimationFrame(
            moveBubble
        );

    }


    /* =====================================================
       START FLOATING
    ===================================================== */

    setTimeout(
        function () {

            chooseNewDestination();


            bubble.style.opacity =
                "1";


            moveBubble();

        },
        400
    );


    /* =====================================================
       ROTATE MESSAGE
    ===================================================== */

    let currentMessage =
        0;


    function changeMessage() {

        messageText.style.opacity =
            "0";


        setTimeout(
            function () {

                currentMessage =
                    (
                        currentMessage
                        +
                        1
                    )
                    %
                    villageMessages.length;


                messageText.textContent =
                    villageMessages[
                        currentMessage
                    ];


                messageText.style.opacity =
                    "1";

            },
            500
        );

    }


    /* =====================================================
       CHANGE EVERY FOUR SECONDS
    ===================================================== */

    setInterval(
        changeMessage,
        4000
    );


    /* =====================================================
       KEEP BUBBLE ON SCREEN
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            const safe =
                getSafeArea();


            bubbleX =
                Math.min(
                    bubbleX,
                    safe.maxX
                );


            bubbleY =
                Math.min(
                    bubbleY,
                    safe.maxY
                );


            targetX =
                Math.min(
                    targetX,
                    safe.maxX
                );


            targetY =
                Math.min(
                    targetY,
                    safe.maxY
                );

        }
    );


    /* =====================================================
       ACCESSIBILITY
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        reducedMotion.matches
    ) {

        bubble.style.transition =
            "opacity 0.8s ease";

    }

});
