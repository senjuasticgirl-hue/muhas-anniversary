/* =========================================================
   MUAHS ANNIVERSARY WEBSITE
   COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE ELEMENTS
     ======================================================= */

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");

  const kissButton = document.getElementById("kissButton");
  const sendKissButton = document.getElementById("sendKissButton");

  const kissScene = document.getElementById("kissScene");
  const questionScene = document.getElementById("questionScene");
  const keyScene = document.getElementById("keyScene");
  const doorScene = document.getElementById("doorScene");

  const questionNumber = document.getElementById("questionNumber");
  const questionText = document.getElementById("questionText");
  const answerInput = document.getElementById("answerInput");
  const answerButton = document.getElementById("answerButton");
  const answerMessage = document.getElementById("answerMessage");

  const magicKey = document.getElementById("magicKey");

  const redScene = document.getElementById("redScene");
  const purpleScene = document.getElementById("purpleScene");
  const goldScene = document.getElementById("goldScene");

  const doors = document.querySelectorAll(".door");


  /* =======================================================
     QUESTIONS
     ======================================================= */

  const questions = [
    {
      question: "The game that bought us together",
      answers: [
        "truth or dare",
        "t and d",
        "t nd d",
        "t&d"
      ]
    },

    {
      question: "The month we met",
      answers: [
        "september"
      ]
    },

    {
      question: "The day we first dated",
      answers: [
        "8 october",
        "8th october",
        "8 oct",
        "8th oct",
        "october 8",
        "october 8th"
      ]
    }
  ];


  let currentQuestion = 0;


  /* =======================================================
     HELPER: SHOW ONLY ONE PAGE-2 SCENE
     ======================================================= */

  function showScene(scene) {

    const allScenes = [
      kissScene,
      questionScene,
      keyScene,
      doorScene
    ];

    allScenes.forEach((item) => {
      item.classList.remove("active-scene");
    });

    scene.classList.add("active-scene");
  }


  /* =======================================================
     HELPER: NORMALIZE ANSWERS
     ======================================================= */

  function normalizeAnswer(answer) {

    return answer
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  }


  /* =======================================================
     PAGE 1 → PAGE 2
     ======================================================= */

  kissButton.addEventListener("click", () => {

    if (kissButton.disabled) return;

    kissButton.disabled = true;

    /* Magical glow */

    page1.classList.add("magic-start");

    /* Wait before disappearing */

    setTimeout(() => {

      page1.classList.add("page-fade-out");

    }, 900);


    /* Page 2 appears slightly later */

    setTimeout(() => {

      page1.style.display = "none";

      page2.classList.add("page-visible");

      page2.style.zIndex = "20";

    }, 2300);

  });


  /* =======================================================
     SEND A KISS → QUESTION 1
     ======================================================= */

  sendKissButton.addEventListener("click", () => {

    currentQuestion = 0;

    showQuestion();

  });


  /* =======================================================
     SHOW QUESTION
     ======================================================= */

  function showQuestion() {

    const question = questions[currentQuestion];

    questionNumber.textContent =
      `Question ${currentQuestion + 1}`;

    questionText.textContent =
      question.question;

    answerInput.value = "";

    answerMessage.textContent = "";

    showScene(questionScene);

    setTimeout(() => {
      answerInput.focus();
    }, 500);

  }


  /* =======================================================
     CHECK ANSWER
     ======================================================= */

  function checkAnswer() {

    const typedAnswer =
      normalizeAnswer(answerInput.value);

    const correctAnswers =
      questions[currentQuestion].answers;

    if (typedAnswer === "") {

      answerMessage.textContent =
        "Type your answer first...";

      return;

    }


    if (correctAnswers.includes(typedAnswer)) {

      answerMessage.textContent =
        "Correct.";

      answerMessage.style.color =
        "#baffca";


      /* Small pause before next question */

      setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {

          showQuestion();

        } else {

          showKey();

        }

      }, 900);

    } else {

      answerMessage.textContent =
        "Not quite... try again.";

      answerMessage.style.color =
        "#ffb0c9";

      answerInput.classList.add("wrong-answer");

      setTimeout(() => {

        answerInput.classList.remove("wrong-answer");

      }, 500);

    }

  }


  answerButton.addEventListener("click", checkAnswer);


  /* =======================================================
     ENTER KEY ALSO SUBMITS ANSWER
     ======================================================= */

  answerInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

      checkAnswer();

    }

  });


  /* =======================================================
     SHOW MAGIC KEY
     ======================================================= */

  function showKey() {

    showScene(keyScene);

  }


  /* =======================================================
     KEY → DOORS
     ======================================================= */

  magicKey.addEventListener("click", () => {

    magicKey.disabled = true;

    magicKey.style.transition =
      "1s ease";

    magicKey.style.transform =
      "scale(1.5) rotate(20deg)";

    magicKey.style.filter =
      "drop-shadow(0 0 60px rgba(190,255,205,1))";

    setTimeout(() => {

      showScene(doorScene);

      magicKey.disabled = false;

      magicKey.style.transform =
        "";

    }, 900);

  });


  /* =======================================================
     DOOR OPENING
     ======================================================= */

  doors.forEach((door) => {

    door.addEventListener("click", () => {

      const selectedDoor =
        door.dataset.door;


      /* Door opening animation */

      door.style.transform =
        "perspective(700px) rotateY(-105deg)";


      setTimeout(() => {

        if (selectedDoor === "red") {

          openDoorScene(redScene);

        }

        if (selectedDoor === "purple") {

          openDoorScene(purpleScene);

        }

        if (selectedDoor === "gold") {

          openDoorScene(goldScene);

        }

      }, 850);

    });

  });


  /* =======================================================
     OPEN DOOR CONTENT
     ======================================================= */

  function openDoorScene(scene) {

    /* Hide door selection */

    doorScene.classList.remove("active-scene");

    /* Hide other door scenes */

    redScene.classList.remove("active-scene");
    purpleScene.classList.remove("active-scene");
    goldScene.classList.remove("active-scene");

    /* Show selected scene */

    scene.classList.add("active-scene");

  }


  /* =======================================================
     RESET DOOR
     ======================================================= */

  function resetDoors() {

    doors.forEach((door) => {

      door.style.transition =
        "transform 1s ease";

      door.style.transform =
        "";

    });

  }


  /* =======================================================
     AUTOMATICALLY RETURN TO DOORS
     ======================================================= */

  function returnToDoors(scene, delay) {

    setTimeout(() => {

      scene.classList.remove("active-scene");

      resetDoors();

      doorScene.classList.add("active-scene");

    }, delay);

  }


  /* =======================================================
     RED DOOR TIMELINE
     ======================================================= */

  doors.forEach((door) => {

    if (door.dataset.door === "red") {

      door.addEventListener("click", () => {

        setTimeout(() => {

          returnToDoors(redScene, 7000);

        }, 1000);

      });

    }

  });


  /* =======================================================
     PURPLE DOOR TIMELINE
     ======================================================= */

  doors.forEach((door) => {

    if (door.dataset.door === "purple") {

      door.addEventListener("click", () => {

        setTimeout(() => {

          returnToDoors(purpleScene, 8500);

        }, 1000);

      });

    }

  });


  /* =======================================================
     GOLDEN DOOR TIMELINE
     ======================================================= */

  doors.forEach((door) => {

    if (door.dataset.door === "gold") {

      door.addEventListener("click", () => {

        setTimeout(() => {

          returnToDoors(goldScene, 14500);

        }, 1000);

      });

    }

  });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  page2.classList.remove("page-visible");

  kissScene.classList.add("active-scene");

  questionScene.classList.remove("active-scene");

  keyScene.classList.remove("active-scene");

  doorScene.classList.remove("active-scene");

  redScene.classList.remove("active-scene");

  purpleScene.classList.remove("active-scene");

  goldScene.classList.remove("active-scene");


  /* =======================================================
     DONE
     ======================================================= */

  console.log("MUAHS website loaded successfully.");

});
