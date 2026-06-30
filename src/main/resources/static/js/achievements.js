const ACHIEVEMENT_API = "/api/achievements";

/* ===========================================
   ELEMENTS
=========================================== */

const unlockedCount =
    document.getElementById("unlockedCount");

const totalCount =
    document.getElementById("totalCount");

const completionPercentage =
    document.getElementById("completionPercentage");

const achievementContainer =
    document.getElementById("achievementContainer");

const emptyState =
    document.getElementById("emptyState");

/* ===========================================
   LOAD ACHIEVEMENTS
=========================================== */

async function loadAchievements() {

    try {

        const response =
            await fetch(ACHIEVEMENT_API);

        const summary =
            await response.json();

        renderSummary(summary);

        renderAchievements(summary.achievements);

    }

    catch (error) {

        console.error(error);

    }

}

/* ===========================================
   SUMMARY
=========================================== */

function renderSummary(summary) {

    unlockedCount.textContent =
        summary.unlocked;

    totalCount.textContent =
        summary.total;

    completionPercentage.textContent =
        summary.completionPercentage + "%";

}

/* ===========================================
   ACHIEVEMENT CARDS
=========================================== */

function renderAchievements(achievements) {

    achievementContainer.innerHTML = "";

    if (!achievements || achievements.length === 0) {

        achievementContainer.style.display = "none";

        emptyState.style.display = "block";

        return;

    }

    achievementContainer.style.display = "grid";

    emptyState.style.display = "none";
        achievements.forEach(achievement => {

            const card =
                document.createElement("article");

            card.className =
                achievement.unlocked
                    ? "achievement-card"
                    : "achievement-card locked";

            card.innerHTML = `

                <div class="achievement-icon">

                    <i class="fa-solid ${achievement.icon}"></i>

                </div>

                <div class="achievement-info">

                    <div class="badge ${achievement.unlocked ? "unlocked" : "locked"}">

                        ${achievement.unlocked ? "Unlocked" : "In Progress"}

                    </div>

                    <h3>

                        ${achievement.title}

                    </h3>

                    <p>

                        ${achievement.description}

                    </p>

                    <div class="progress">

                        <div class="progress-fill"

                             style="width:${achievement.progress}%">

                        </div>

                    </div>

                    <div class="progress-text">

                        ${achievement.progress}% Complete

                    </div>

                </div>

            `;

            achievementContainer.appendChild(card);

        });

    }

    /* ===========================================
       INITIALIZE
    =========================================== */

    document.addEventListener(

        "DOMContentLoaded",

        () => {

            loadAchievements();

        }

    );
    /* ===========================
       LOGOUT
    =========================== */

    const logoutButton = document.querySelector(".logout");

    if (logoutButton) {

        logoutButton.addEventListener("click", function (e) {

            e.preventDefault();

            localStorage.clear();
            sessionStorage.clear();

            window.location.href = "index.html";

        });

    }