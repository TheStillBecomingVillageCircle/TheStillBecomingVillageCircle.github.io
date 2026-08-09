/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   SITE-WIDE FLOATING BUBBLE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       DO NOT ADD THE BUBBLE TWICE
       Home already has its own soundtrack bubble.
    ----------------------------------------------------- */

    if (document.getElementById("villageFloatingBubble")) {
        return;
    }


    /* -----------------------------------------------------
       CREATE THE FLOATING BUBBLE
    ----------------------------------------------------- */

    const bubble = document.createElement("div");

    bubble.id = "villageFloatingBubble";

    bubble.innerHTML = `

        <div class="village-bubble-inner">

            <div
                class="village-word"
                id="villageWord"
            >
                Becoming
            </div>

            <div class="village-small-text">
                stay curious
            </div>

        </div>

    `;


    document.body.appendChild(bubble);



    /* -----------------------------------------------------
       BUBBLE STYLES
    ----------------------------------------------------- */

    const style = document.createElement("style");

    style.textContent = `

        #villageFloatingBubble {

            position: fixed;

            right: 24px;

            bottom: 24px;

            width: 145px;

            height: 145px;

            z-index: 9998;

            border-radius:
                52% 48% 55% 45%
                /
                46% 55% 45% 54%;

            background:

                radial-gradient(
                    circle at 30% 24%,
                    rgba(255,255,255,0.98),
                    rgba(211,251,246,0.78)
                );

            border:
                2px solid
                rgba(255,255,255,0.94);

            box-shadow:

                inset
                10px 10px 25px
                rgba(255,255,255,0.90),

                inset
                -10px -10px 25px
                rgba(72,181,196,0.10),

                0 18px 45px
                rgba(40,120,125,0.15);

            backdrop-filter:
                blur(10px);

            -webkit-backdrop-filter:
                blur(10px);

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            pointer-events:
                none;

            animation:
                villageBubbleFloat 7s ease-in-out infinite;

        }


        .village-bubble-inner {

            width:
                100%;

            height:
                100%;

            display:
                flex;

            flex-direction:
                column;

            align-items:
                center;

            justify-content:
                center;

            text-align:
                center;

            padding:
                20px;

        }


        .village-word {

            color:
                #16a9ae;

            font-family:
                Georgia,
                "Times New Roman",
                serif;

            font-size:
                23px;

            font-weight:
                700;

            line-height:
                1.15;

            transition:
                opacity 0.45s ease,
                transform 0.45s ease;

        }


        .village-small-text {

            margin-top:
                8px;

            color:
                #6c9293;

            font-size:
                11px;

            letter-spacing:
                1.5px;

            text-transform:
                lowercase;

        }


        @keyframes villageBubbleFloat {

            0%,
            100% {

                transform:
                    translateY(0)
                    rotate(0deg);

            }

            50% {

                transform:
                    translateY(-9px)
                    rotate(2deg);

            }

        }


        @keyframes villageWordOut {

            from {

                opacity:
                    1;

                transform:
                    translateY(0);

            }

            to {

                opacity:
                    0;

                transform:
                    translateY(-7px);

            }

        }


        @keyframes villageWordIn {

            from {

                opacity:
                    0;

                transform:
                    translateY(7px);

            }

            to {

                opacity:
                    1;

                transform:
                    translateY(0);

            }

        }


        @media (max-width: 600px) {

            #villageFloatingBubble {

                width:
                    112px;

                height:
                    112px;

                right:
                    12px;

                bottom:
                    12px;

            }


            .village-word {

                font-size:
                    18px;

            }


            .village-small-text {

                font-size:
                    8px;

                letter-spacing:
                    1px;

            }

        }

    `;


    document.head.appendChild(style);



    /* -----------------------------------------------------
       WORDS
    ----------------------------------------------------- */

    const villageWords = [

        "Becoming",

        "Curiosity",

        "Presence",

        "Possibility",

        "Belonging",

        "Reflection",

        "Growth",

        "Authenticity",

        "Connection",

        "Permission",

        "Discovery",

        "Becoming Again",

        "Still Here",

        "Stay Curious",

        "You Belong",

        "Begin Again"

    ];


    let currentWord = 0;

    const wordElement =
        document.getElementById("villageWord");



    /* -----------------------------------------------------
       ROTATE THE WORD
    ----------------------------------------------------- */

    function changeVillageWord() {

        if (!wordElement) {
            return;
        }


        wordElement.style.animation =
            "villageWordOut 0.45s ease forwards";


        setTimeout(function () {

            currentWord =
                (currentWord + 1)
                % villageWords.length;


            wordElement.textContent =
                villageWords[currentWord];


            wordElement.style.animation =
                "villageWordIn 0.45s ease forwards";

        }, 450);

    }


    setInterval(
        changeVillageWord,
        3200
    );



    /* -----------------------------------------------------
       ACCESSIBILITY
    ----------------------------------------------------- */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reduceMotion.matches) {

        bubble.style.animation =
            "none";

    }


});
