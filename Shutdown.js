(function () {
    const overlay = document.getElementById("shutdownOverlay");
    const waitScreen = document.getElementById("shutdownWaitScreen");
    const finalScreen = document.getElementById("shutdownFinalScreen");

    if (!overlay || !waitScreen || !finalScreen) return;

    const yesBtn = document.getElementById("shutdownYesBtn");
    const noBtn = document.getElementById("shutdownNoBtn");
    const helpBtn = document.getElementById("shutdownHelpBtn");
    const xBtn = document.getElementById("shutdownDialogX");

    function openDialog() {
        overlay.classList.add("shutdown-overlay-active");
    }

    function closeDialog() {
        overlay.classList.remove("shutdown-overlay-active");
    }

    function getSelectedAction() {
        const checked = overlay.querySelector('input[name="shutdownAction"]:checked');
        return checked ? checked.value : "shutdown";
    }

    function runShutdownSequence() {
        const action = getSelectedAction();
        closeDialog();

        waitScreen.classList.add("shutdown-stage-active");

        setTimeout(() => {
            if (action === "shutdown") {
                waitScreen.classList.remove("shutdown-stage-active");
                finalScreen.classList.add("shutdown-stage-active");
                // Terminal state on purpose — a real machine just sits here
                // until you physically turn it off, so nothing else runs.
            } else {
                // restart / MS-DOS mode / log on as a different user —
                // reloading replays the whole Boot.js sequence, which is
                // exactly what a restart should look like.
                location.reload();
            }
        }, 2200);
    }

    yesBtn.addEventListener("click", runShutdownSequence);
    noBtn.addEventListener("click", closeDialog);
    xBtn.addEventListener("click", closeDialog);
    helpBtn.addEventListener("click", () => {
        // Decorative, same as the real dialog having no help topic wired up.
    });

    // Exposed so window.js's "Shut Down" menu item opens this dialog
    // instead of instantly wiping the page.
    window.startShutdownSequence = openDialog;
})();