/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   SOFT FLOATING VILLAGE MESSAGE
   =========================================================

   PURPOSE:
   • A clear, translucent bubble
   • Very slow, gentle movement
   • Soft message changes
   • No sudden popping onto the screen
   • No sharp jumps
   • Works across every page that loads script.js

   DOES NOT CONTROL:
   • SoundCloud
   • Record player
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
       FIND THE BUBBLE
    ===================================================== */

    let bubble =
        document.getElementById(
            "villageFloatingMessage"
        );


    /* =====================================================
       CREATE BUBBLE
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

        document.body.appendChild(
            bubble
        );

    }


    /* =====================================================
       MESSAGE ELEMENT
    ===================================================== */

    let messageText =
        document.getElementById(
            "villageMessageText"
        );


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
       STYLES
    ===================================================== */

    if (
        !document.getElementById(
            "villageSoftBubbleStyles"
        )
    ) {

        const style =
            document.createElement("style");

        style.id =
            "villageSoftBubbleStyles";


        style.textContent = `

            /* =============================================
               THE SOFT BUBBLE
            ============================================= */

            #villageFloatingMessage {

                position: fixed;

                left: 0;
                top: 0;

                width: max-content;

                max-width: 270px;

                min-height: 56px;

                padding:
                    15px 25px;


                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;


                text-align:
                    center;


                /* -----------------------------------------
                   CLEAR SOAP-BUBBLE EFFECT
                ----------------------------------------- */

                background:

                    radial-gradient(
                        circle at 28% 22%,

                        rgba(
                            255,
                            255,
                            255,
                            0.34
                        ) 0%,

                        rgba(
                            255,
                            255,
                            255,
                            0.10
                        ) 25%,

                        rgba(
                            195,
                            250,
                            245,
                            0.055
                        ) 58%,

                        rgba(
                            255,
                            255,
                            255,
                            0.015
                        ) 100%
                    );


                border:
                    1.5px solid
                    rgba(
                        255,
                        255,
                        255,
                        0.60
                    );


                border-radius:
                    50%;


                /* -----------------------------------------
                   VERY SOFT DEPTH
                ----------------------------------------- */

                box-shadow:

                    inset
                    5px 5px 12px
                    rgba(
                        255,
                        255,
                        255,
                        0.45
                    ),

                    inset
                    -5px -5px 12px
                    rgba(
                        92,
                        196,
                        205,
                        0.07
                    ),

                    0 8px 22px
                    rgba(
                        60,
                        150,
                        158,
                        0.07
                    );


                backdrop-filter:
                    blur(1.5px);

                -webkit-backdrop-filter:
                    blur(1.5px);


                z-index:
                    9997;


                pointer-events:
                    none;


                /* -----------------------------------------
                   IMPORTANT:
                   START INVISIBLE AND FADE IN SLOWLY
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
                    opacity 2.5s ease;


                will-change:
                    transform;

            }


            /* =============================================
               SOFT HIGHLIGHT
            ============================================= */

            #villageFloatingMessage::before {

                content:
                    "";

                position:
                    absolute;


                width:
                    13px;

                height:
                    13px;


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
                        0.55
                    );


                filter:
                    blur(1.5px);


                opacity:
                    0.65;

            }


            /* =============================================
               SECOND SOFT REFLECTION
            ============================================= */

            #villageFloatingMessage::after {

                content:
                    "";

                position:
                    absolute;


                width:
                    6px;

                height:
                    6px;


                right:
                    16px;

                bottom:
                    12px;


                border-radius:
                    50%;


                background:
                    rgba(
                        180,
                        235,
                        238,
                        0.20
                    );


                filter:
                    blur(1px);

            }


            /* =============================================
               MESSAGE
            ============================================= */

            .village-message-text {

                position:
                    relative;

                z-index:
                    2;


                color:
                    rgba(
                        22,
                        150,
                        154,
                        0.88
                    );


                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;


                font-size:
                    15px;


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
                        0.70
                    );


                opacity:
                    1;


                transition:
                    opacity 1.8s ease;

            }


            /* =============================================
               MOBILE
            ============================================= */

            @media (max-width: 600px) {

                #villageFloatingMessage {

                    max-width:
                        235px;

                    min-height:
                        50px;

                    padding:
                        12px 19px;

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
       MOVEMENT SETTINGS
    ===================================================== */

    let bubbleX =
        Math.max(
            20,
            window.innerWidth * 0.20
        );


    let bubbleY =
        Math.max(
            100,
            window.innerHeight * 0.30
        );


    let targetX =
        bubbleX;


    let targetY =
        bubbleY;


    let nextMoveTime =
        Date.now() +
        5000;


    /* =====================================================
       GET SAFE SCREEN AREA
    ===================================================== */

    function getSafeArea() {

        const width =
            bubble.offsetWidth ||
            210;


        const height =
            bubble.offsetHeight ||
            56;


        const margin =
            22;


        return {

            maxX:
                Math.max(
                    margin,
                    window.innerWidth -
                    width -
                    margin
                ),


            maxY:
                Math.max(
                    margin,
                    window.innerHeight -
                    height -
                    margin
                )

        };

    }


    /* =====================================================
       PICK A GENTLE NEW DESTINATION
    ===================================================== */

    function chooseNewDestination() {

        const safe =
            getSafeArea();


        targetX =
            marginBetween(
                25,
                safe.maxX
            );


        targetY =
            marginBetween(
                70,
                safe.maxY
            );


        /* -----------------------------------------------
           Stay in this location for a while before
           choosing another one.
        ------------------------------------------------ */

        nextMoveTime =
            Date.now() +
            (
                9000 +
                Math.random() * 6000
            );

    }


    /* =====================================================
       RANDOM NUMBER BETWEEN TWO VALUES
    ===================================================== */

    function marginBetween(
        minimum,
        maximum
    ) {

        if (
            maximum <= minimum
        ) {

            return minimum;

        }


        return (
            minimum +
            Math.random()
            *
            (
                maximum -
                minimum
            )
        );

    }


    /* =====================================================
       VERY SLOW MOVEMENT
    ===================================================== */

    function floatBubble() {

        const now =
            Date.now();


        /* -----------------------------------------------
           Only choose a new destination occasionally.
        ------------------------------------------------ */

        if (
            now >= nextMoveTime
        ) {

            chooseNewDestination();

        }


        /* -----------------------------------------------
           Distance to destination
        ------------------------------------------------ */

        const distanceX =
            targetX -
            bubbleX;


        const distanceY =
            targetY -
            bubbleY;


        /* -----------------------------------------------
           VERY SLOW DRIFT

           This is intentionally tiny.

           The bubble should feel like it is floating,
           not flying.
        ------------------------------------------------ */

        bubbleX +=
            distanceX *
            0.0018;


        bubbleY +=
            distanceY *
            0.0018;


        bubble.style.transform =
            `translate3d(
                ${bubbleX}px,
                ${bubbleY}px,
                0
            )`;


        requestAnimationFrame(
            floatBubble
        );

    }


    /* =====================================================
       FIRST DESTINATION
    ===================================================== */

    chooseNewDestination();


    /* =====================================================
       SOFT ENTRANCE
    ===================================================== */

    setTimeout(
        function () {

            bubble.style.opacity =
                "1";

        },
        1200
    );


    /* =====================================================
       START MOVEMENT
    ===================================================== */

    requestAnimationFrame(
        floatBubble
    );


    /* =====================================================
       ROTATING MESSAGES
    ===================================================== */

    let currentMessage =
        0;


    function changeMessage() {

        /* -----------------------------------------------
           Fade words gently.
        ------------------------------------------------ */

        messageText.style.opacity =
            "0";


        setTimeout(
            function () {

                currentMessage =
                    (
                        currentMessage +
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
            1800
        );

    }


    /* =====================================================
       MESSAGE CHANGES EVERY 8 SECONDS
       Not every 4.
    ===================================================== */

    setInterval(
        changeMessage,
        8000
    );


    /* =====================================================
       RESIZE SAFETY
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


});
