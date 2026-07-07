(function () {
    const screen = document.getElementById("bootScreen");
    if (!screen) return;

    const stage3 = document.getElementById("bootStage3");
    const stage4 = document.getElementById("bootStage4");
    const logText = document.getElementById("bootLogText");
    const sound = document.getElementById("bootSound");

    const LOG_LINES = [
        "",
        "This driver is provided by Oak Technology, Inc..",
        "OTI-91X ATAPI CD-ROM device driver, Rev D91XV352",
        "(C)Copyright Oak Technology Inc. 1987-1997",
        "  Device Name     : MSCD0001",
        "  Transfer Mode   : Programmed I/O",
        "  Number of drives : 1",
        "",
        "MODE prepare code page function completed",
        "",
        "MODE select code page function completed"
    ];

    function showStage(stage) {
        [stage3, stage4].forEach(s => s.classList.remove("boot-stage-active"));
        stage.classList.add("boot-stage-active");
    }

    function playBootSound() {
        if (!sound) return;
        sound.currentTime = 0;
        const attempt = sound.play();
        if (attempt && attempt.catch) {
            attempt.catch(() => {
            });
        }
    }

    function stopBootSound() {
        if (!sound) return;
        sound.pause();
        sound.currentTime = 0;
    }

    function typeLogLines(onDone) {
        let i = 0;
        function next() {
            if (i >= LOG_LINES.length) {
                setTimeout(onDone, 500);
                return;
            }
            const line = document.createElement("span");
            line.className = "boot-log-line";
            line.textContent = LOG_LINES[i] || "\u00A0";
            logText.appendChild(line);
            i++;
            setTimeout(next, 180);
        }
        next();
    }

    function finishBoot() {
        stopBootSound();
        screen.classList.add("boot-hidden");
        screen.addEventListener("animationend", () => {
            screen.remove();
        }, { once: true });
    }

    // ---- run the sequence ----
    showStage(stage4);
    typeLogLines(() => {
        showStage(stage3);
        playBootSound();
        setTimeout(finishBoot, 2200);
    });
})();