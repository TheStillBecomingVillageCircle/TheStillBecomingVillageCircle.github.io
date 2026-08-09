/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   SITE-WIDE FLOATING MESSAGE BUBBLE
   ---------------------------------------------------------
   This controls ONLY the rotating Village message bubble.

   It does NOT control:
   - SoundCloud
   - The Village Soundtrack
   - Navigation
   - Page content
   - Buttons
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MESSAGES
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
        document.getElementById("villageFloatingMessage");


    /* =====================================================
       CREATE BUBBLE IF IT DOESN'T EXIST
    ===================================================== */

    if (!bubble) {

        bubble = document.createElement("div");

        bubble.id =
            "villageFloatingMessage";

        bubble.innerHTML = `

            <div
                class="village-message-text"
                id="villageMessageText"
            >
                Honor your pace.
            </div>

        `;

        document.body.appendChild(bubble);

    }


    /* =====================================================
       FIND / CREATE MESSAGE TEXT
    ===================================================== */

    let messageText =
        document.getElementById("villageMessageText");


    if (!messageText) {

        messageText =
            document.createElement("div");

        messageText.id =
            "villageMessageText";

        messageText.className =
            "village-message-text";

        messageText.textContent =
            "Honor your pace.";

        bubble.appendChild(messageText);

    }


    /* =====================================================
       STYLES
    ===================================================== */

    if (!document.getElementById("villageMessageBubbleStyles")) {

        const style =
            document.createElement("style");

        style.id =
            "villageMessageBubbleStyles";


        style.textContent = `

            /* =============================================
               FLOATING MESSAGE BUBBLE
            ============================================= */

            #villageFloatingMessage {

                position: fixed;

                left: 18px;

                bottom: 24px;

                z-index: 9997;

                width: auto;

                max-width: 330px;

                min-height: 58px;

                padding:
                    14px 25px;

                display: flex;

                align-items: center;

                justify-content: center;

                text-align: center;

                background:
                    rgba(255,255,255,0.94);

                border:
                    1px solid
                    rgba(255,255,255,0.98);

                border-radius:
                    50px;

                box-shadow:

                    0 18px 45px
                    rgba(40,120,125,0.16),

                    inset
                    0 1px 0
                    rgba(255,255,255,0.95);

                backdrop-filter:
                    blur(12px);

                -webkit-backdrop-filter:
                    blur(12px);

                pointer-events:
                    none;

                opacity:
                    1;

                transform:
                    translateY(0);

                transition:

                    opacity 0.55s ease,

                    transform 0.55s ease;

            }


            /* =============================================
               MESSAGE
            ============================================= */

            .village-message-text {

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

            }


            /* =============================================
               MESSAGE EXIT
            ============================================= */

            #villageFloatingMessage.message-changing {

                opacity:
                    0;

                transform:
                    translateY(8px);

            }


            /* =============================================
               MOBILE
            ============================================= */

            @media (max-width: 600px) {

                #villageFloatingMessage {

                    left:
                        12px;

                    bottom:
                        14px;

                    max-width:
                        calc(100vw - 24px);

                    min-height:
                        50px;

                    padding:
                        12px 20px;

                    border-radius:
                        40px;

                }


                .village-message-text {

                    font-size:
                        14px;

                }

            }

        `;


        document.head.appendChild(style);

    }


    /* =====================================================
       STARTING MESSAGE
    ===================================================== */

    let currentMessage =
        0;


    messageText.textContent =
        villageMessages[currentMessage];


    /* =====================================================
       CHANGE MESSAGE
       EVERY 4 SECONDS
    ===================================================== */

    setInterval(function () {

        bubble.classList.add(
            "message-changing"
        );


        setTimeout(function () {

            currentMessage =
                (currentMessage + 1)
                % villageMessages.length;


            messageText.textContent =
                villageMessages[currentMessage];


            bubble.classList.remove(
                "message-changing"
            );

        }, 550);


    }, 4000);


});
